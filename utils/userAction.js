/*
 * @Author: your name
 * @Date: 2020-12-07 18:58:12
 * @LastEditTime: 2020-12-09 18:25:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-wx-tfjs-demo/utils/userAction.js
 */
import wxRequest from './request';
import {ss} from './util';

let timer = null, 
  timerWx = null, 
  userMoveObjQueue = [],
  userTapObjQueue = [],
  userGPSQueue = [],
  userEquipDirectionQueue = [],
  userGyroQueue = [];

export function wsgTouchMove (e, time = 50) {
  if(typeof e !== 'object'|| e === null) {
    return
  }
  setTimeout(() => {
    if (userMoveObjQueue.length >= 20) {
      userMoveObjQueue.shift();
    }
    userMoveObjQueue.push(e);
  }, time)
}
export function wsgTap (e) {
  if(typeof e !== 'object'|| e === null) {
    return
  }
  if (userTapObjQueue.length >= 20) {
    userTapObjQueue.shift();
  }
  userTapObjQueue.push(e);
}

export function openUserMonitoring () {
  //开启循环
  startInterval();
  // collectWxData();
}
export function closeUserMonitoring () {
  endInterval();
}

function collectWxData (delay = 1000) {
  timerWx = setInterval(function () {
    //获取传感器数据  GPS 设备方向 陀螺仪
    userGPSQueue = [],
    userEquipDirectionQueue = [],
    userGyroQueue = [];
  }, delay)
}

function startInterval (delay = 500000000) {
  const data = {
    appId: 'appid', 
    group_600: {
      600: userGPSQueue, //GPSList
      601: userEquipDirectionQueue, //陀螺仪
      603: userGyroQueue, //设备方向
    },
    group_10: {
      '10': userMoveObjQueue,
      '11': userTapObjQueue
    }
  };
  wxRequest({
    url: 'http://10.179.147.105:8000/sec/risk-gateway/common/risk_newton_sdk_web_decode?apiVersion=1.0.0',
    method: 'post',
    data: {wsgenv: ss(data)}
    // data: {wsgenv: 'dYDxsVVlXoa5otQnSdfou5AA8z5CR_HRzVnxQKe_9nQgufVVQI4joC3Fp2kSac2GSP-Xq0o91tbRWogTHzxSd98HEVE_VRpsgEC13SOSAxC7x_83LEVbWygas5jLS18BsGnuC1xXip2nINuPh1G7WOP9FACBa08HlqD1FiCqM5uvPm-q-86YJU2ckR04Vtbu8hHgvl0PHRXC8k8-4LLzbgmugoitf82lXHgixwtLQFj5prsrqxt59oXcqg1KbrjtKqFOOEAHKC7gk-WthK45KE-bz6rhmvLsAljW8_TQ_L-Qi5FFcM4LFRHjgwl-sC1k0SSHDxeZcYGxh9cRW7e4Abs00W_0YidfLoaQfOOFafpIO9emoMO0psHDw-5k_X0QJohsLxf05-ngQmavVtFxMYzaDXZ_91hYq_BzfBN8ZdY'}
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err);
  })
  timer = setInterval(function () {
  }, delay)
}


function endInterval () {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (timerWx) {
    clearInterval(timerWx);
    timerWx = null;
  }
}

