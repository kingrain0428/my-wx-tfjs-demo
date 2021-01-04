//app.js
import { sdkInit } from './utils/wsgsig';
var fetchWechat = require('fetch-wechat');
App({
  onLaunch: function () {
    
  },
  onShow: function () {
    sdkInit('123123')
  }
})