//index.js
const tf = require('@tensorflow/tfjs-core');
const posenet = require('@tensorflow-models/posenet');
Page({
  async onReady () {
    const camera = wx.createCameraContext(this);
    this.canvas = wx.createCanvasContext('pose', this)
    this.syncPosenet();
    let count = 0;
    const listener = camera.onCameraFrame(frame => {
      count++
      if (count === 20) {
        if (this.net) {
          this.pose = this.detectPose(frame, this.net);
          this.drawPose(this);
        }
        count = 0;
      }
    })
    // listener.start();
  },
  async syncPosenet () {
    const _this = this;
    await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 193,
      multiplier: 0.50
    }).then(function (net) {
      _this.net = net;
    })
  },
  async detectPose(frame, net) {
    const imgSlice = tf.tidy(() => {
      const imgData = {data: new Uint8Array(frame.data), width: frame.width, height: frame.height};
      const imgTensor = tf.browser.fromPixels(imgData, 4);
      return imgTensor.slice([0,0,0], [-1,-1,3]);
    })
    let pose;
    await net.estimateSinglePose(imgSlice, {flipHorizantal: false}).then(res => {
      pose = res;
    });
    imgSlice.dispose();
    return pose;
  },
  drawPose(page) {
    const { canvas, pose } = page;
    if (pose == null || canvas == null) {
      return
    }
    pose.then(({score, keypoints}) => {
      if (score >= 0.3) {
        // draw circles
        for (let item of keypoints) {
          if (item.score >= 0.5) {
            const { y, x } = item.position;
            this.drawCircle(canvas, x, y)
          }
        }
        //draw lines
        const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);
        for (let item of adjacentKeyPoints) {
          this.drawLine(canvas, item[0].position, item[1].position)
        }
        canvas.draw();
      }
    })
  },
  drawLine(canvas, p0, p1) {
    canvas.beginPath();
    canvas.moveTo(p0.x * 0.8, p0.y * 0.92);
    canvas.lineTo(p1.x * 0.8, p1.y * 0.92);
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'aqua';
    canvas.stroke();
  },
  drawCircle(canvas, x, y) {
    canvas.beginPath();
    canvas.arc(x * 0.8, y * 0.92, 3, 0, 2 * Math.PI);
    canvas.fillStyle = 'aqua';
    canvas.fill()
  }
})
