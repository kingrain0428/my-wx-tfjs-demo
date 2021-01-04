/*
 * @Author: your name
 * @Date: 2020-09-22 17:47:51
 * @LastEditTime: 2020-12-09 10:20:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-wx-tfjs-demo/pages/index/index.js
 */

import { rs, sd, se, ad, ae, ss, sse } from '../../utils/util';
import {Base64} from '../../utils/b4';
import base64Fun from '../../utils/base64';
import wsgsig from '@didi/wsgsig';
import wxRequest from '../../utils/request';
// import { openUserMonitoring, wsgTouchMove, wsgTap } from '../../utils/userAction';
import pako from '../../utils/pako.min2';
// import pako from 'pako';
const polyfill = require('../../utils/base64')
const {atob, btoa} = polyfill;
import { openUserMonitoring, closeUserMonitoring, wsgTouchMove, wsgTap } from '../../utils/wsgsig';
Page({
  touchmove(e) {
    // console.log(JSON.stringify(e))
    wsgTouchMove(e)
  },
  touchtag(e) {
    wsgTap(e)
  },
  onUnload() {
    closeUserMonitoring();
  },
  onLoad() {

// const test = '{\"config_id\":\"\",\"event_type\":\"\",\"time\":\"\",\"app_id\":\"\",\"group_100\":{\"100\":\"\",\"101\":\"\",\"102\":\"\",\"103\":\"\",\"104\":\"\",\"105\":\"\",\"106\":\"\",\"107\":\"\",\"108\":\"\",\"109\":\"\",\"110\":\"\",\"111\":\"\",\"112\":\"\",\"113\":\"\",\"114\":\"\",\"115\":\"\",\"116\":\"\",\"117\":\"\",\"118\":\"\",\"119\":\"\",\"120\":\"\",\"121\":\"\",\"122\":\"\",\"123\":\"\",\"124\":\"\",\"125\":\"\",\"126\":{\"1260\":\"\",\"1261\":\"\",\"1262\":\"\",\"1263\":\"\",\"1264\":\"\",\"1265\":\"\"},\"127\":\"\",\"128\":\"\"},\"group_200\":{\"200\":\"\",\"201\":\"\",\"202\":\"\",\"203\":\"\",\"204\":\"\",\"205\":\"\",\"206\":\"\"},\"group_300\":{\"328\":\"\",\"329\":\"\",\"330\":\"\",\"310\":{\"314\":\"\",\"315\":\"\",\"316\":\"\",\"317\":\"\",\"318\":\"\"}},\"group_600\":{\"600\":\"\",\"601\":\"\",\"602\":\"\",\"603\":\"\",\"604\":\"\"}}';
// let decodeStr = ss(test);
// console.log('=== decode', decodeStr)
// let encodeStr = sse('Q2FyWTNrbk03bEp0Mjh4dWVMNWxEbjZPMUROcUsyenVvQTFwVGovZk1XL1dzcVhhZHdvbFJOQlBKUHVhZnl6YThLZ2RYNld3RWdRMTFhSEFFOTNCNlBiOHJHUVQ4ZGtyY0x4cm52Y3NTcmxTYk9RaFl2ZVNLUnlHbjNTMXFqZE5GNWpFVGZrT2JHVWtBM3MrQ3BxUkptOTR1ZmxEd21HY0NZclB0NStSQis4PTE2ZWU3MjQ5N2RiNzBkNzlkMTk5MmVkNzA4YWEyMTYxMmI3YzZhOGU2NDkyNjY2ODE0YTg0NjNlN2M4OWFlYmJlNzljYjAxNDgyM2I0MjdiNjVkMzhkOTY3NTQ0ODkxMDUwMGQ0YzUwYjJjZGJlN2Q2MzIwMzIzZWZiMWI0NjRhMjIzNjE5NjYyMDFiNWZjZjgzZDQzZmUyNTNjMjVkMzViMDJmNGMzOTczOTk0OTY4ZWVhZjM4MTJhMzU0OGUwZjVlZDk4MDA0ODEyYTA0ZDViODJkMjM3YjE4MmNkMjI1MmNmZTg5M2NmNjc1MTQ4NjAzMmFmNzgzZjA2MjQ0MGIzZTc2YTcyN2NjNjY3ZDE2YmE4MjQyZTQwOTUyY2YwYTEyMzFjNDE2NjJhNDY1OTY4ZDJhMzJiMTEwNzEyNTg2YjIwNjgyMjI0ZjMyYmQyMDg0OGEwYzcxODY5MDk4YzFlOWVhNzRmOGUyYTg3NjMyMWNkODUwZjA4ZTU3OGQ4YjM3MGNmOTA3YWFiZDAwNzAyNTU0ZDU4OThjMDE5MDQxYTg5NDNjMmUzMjdkZjcyNTBmMmM5NzFjNWM0ZTFlOGFjNWQxYTM5NTQ4MTk3NDg1Yjc0MWMxZDQ1ZGMwZjA5YTFiNzE1MTI0MmNhOGJhYWNkZDkxNDc1N2MxZmQ3ZDk3MmU2NmYyODY2MGUzZjg0MWZlZWMxNDNlY2MwY2U3N2YyNjQzNWZjODJkOTk5OWZhNDNlMjYwN2RhNDA5N2ZmMDkzNmM5MTQ5MGE3NmMwNmZlMGVlMTJlOWY0NzM0NzMw');
// console.log('===1', encodeStr)
// const compressed = pako.gzip(test, {to: 'string'});
// console.log(compressed);
// let res = btoa(compressed);
// console.log(res)
// let base64 = Base64.encode(compressed);
// console.log(base64)
// let base65 = base64Fun(compressed);
// console.log(base65)
// const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
// console.log(restored)
  let z = pako.deflate(JSON.stringify({a: 1, b: 2}), {to: 'string'});
  console.log('====', z)
  console.log((pako.inflate(z, {to: 'string'})));


    // let str = 'Rk9nMTRySUllZmVSbEZIbDdIZzdnUWgxWitGR29PQ1hPZXU4VmEwa3ZqdjM4QWM0dFdEaXBTaUF3V2ppK0Y3N2VkRUJsZjNYMFA5OUxndjhLbUMyMjc0NmFXcWtHRjRIZ21FdDZra1hWWG9FdUdBenErWGU2SFNVNFFYZVhqSG4wcUdDNmxpYnI3b2ptNjdPVzRzMDRaQzdpK1BiK2ZUYmgzNkVoR3BHZ1BVPTk1N2MwNmQxOGM1ZDU1MjczODI2ZGIyMmVlZGM1ODQ5NzUxNGQwYzY3NmQyZDJmMzkzZDA2MDdlOGZjOGQzMjg2YjgzNzIyN2I5MjY0MjBiZjg5YTgxNmQ3ZGMxZDI5NDJkYzE2NDI4YWIyM2UyZDEzMjBjN2Y1YzRhNTA0Nzc4YmZiYWM1YWY3ZmFlMzFlNTcwMDI2ODU1ZWUyODNjMzEwNmM2OGVjMWMyNDcxMTE1M2JkZTRkY2E2YzgyMjYwYzAzZjNkZWJlODhlYzNjZjNiNzUwYjU3YmM0Mzg5MjE5ZDI4YTY0Mzk1OGFkMGYyNzE2OTBmMWQwMTlmNzhjMWE2NjQ4MzJhMzAxYTYxMzYyNzU4MWE5OGMwODI5NWYzODBmNzA3ZmM3ZDQyMTNiYjY0ZjM5MDg0NzVjYWFlNzA2YTQ0OTgzMDA3YWM4MGNkMGUyNzc2YzcyODY5NGVlZmJiNjMzY2I5ZjRjYTMxNmJkMTVmMWNjYTQ1ZDhjNTM4Mjk0ZTFhZDVkYjlmYWFjZTk4NDY1NGVjNWNkYjM0NDZhMGRhOTM2Yjk4NTc2MjFmMTBmNmVlOWNhZDBlYjhkODM4OWRkZTExY2Y3OThjNjI1ZjlhMjQ3ZDc3MzFlMDhmZDBmMGZiYTVmNzJlNzE2YWQ0ZjI1ZTg4NjcxNzYyOWM1NDI2MzQ1YjUxNWRjY2UyODNlMWMxMTU2MmU1Y2I2ZmQxZDAyNTVjNDliMDA3ZTJmYWU3ZDYwZWYwMzRhOWVjMmExYTYyMWExMGM3YmRhNjBmNjg2N2ZlMTA4OGRlYmZjMDFkYWNlYTRkNzNiODIwZDc1YmU2NDdiZWNhYWJiNzA1NDk4ZTBiZTAyY2Y3N2E0Y2JmZDMxNWVjNGQ0NDdjMTI4ZDA3MWM0ODFmNjdlYzM2MmM1MzA0ZDEzNWRjZTlhNTI1ZDI2NmZmY2ZmZTFlNTgxNzdmNzY1M2RkZDM4ZDM5OGNiMmVmOWNjZmExNDJlYTMyNGFkMDBiMGE4NzFmZjlkYmNlN2EwNDczYWQyNzYwMjExZjU0NDIxNjdjOTI4ZjYxZjMyYmIzYWFhYzM4NjM4MzBlZWQxNTdlOGNiZGVmN2JmMWRlNWVkMzdkZjE1ZTcwNjUwMmYwNTQyNzA3NTdiNzJmNDE4Zjc2Nzk2NDNlYzdjM2Y4ZWY3NzM0ODUzMDM0ZWM2MTIzMTQzMzE0MjE3ZTA0OGI4MzUwMjgyOTJlZDllMWZhMzc2NjQzZWE5ZDVhYzIxOTU4NWYyM2FiZjU2M2UyMDQyZjgxMjQxNGNhMGM5OGUwZGViMWE1YmU2NzdlODlmMTM2MTdiZWRiODZkMTk2NjZkYTQzN2JlYmMxNjQ3MDVjODlkMzgzYjI3MDQxYzUyMDIxNGYyMjIwM2YzZWY3MzBmOGY4ZmZkMTNlYjZiYjIyNjRkNjNhZTUwMWYzMWMwZjJlNzQ0MGJkZjQ1ODE2YWE4NTA2NWQxNzc2MWI2NjY5YWE2ZDEwMmYwZWExYmYwNmVjNzkzMDM0Yw';
    // // let str = 'X3KDGPaAGx0KeabKfqA5FWtgI2RHjy_ecPj-ZdaeYkXmrFFhNyfnzfNCDCNWT8dx5L7_NEa56ewJogC9kYYLAOQb1NirZURo17X5LOXLlPxM8mQ858y6Y7bFpnbJf7de9COJG36MrVjsgLzNfXG3k9bLiNb9x2fpo8lckVRMHYigmLsknwkSRjGmFHgDzvG3U5pNv0uZkO30tiupc7tea4fqCDgG48qkMr73QtMgPIavKVmzllmX0gRrZE_WB2zzWdp7KupMXkglVhbpZcQRKhjwGZrG5hACaSIh8KVB4O77yjJwyyze2IEUT9g6r4Qos-E0tjEiQO8my-L4wyXgHSs_lZnCPwokyjOhwzZrBOSXoIyhxOfpm5skibRsNaQsMHPfLvmInuQQp0xFRau4wy1TlfTcSY_9mPZquyTTErA2QnGuo2PZiXGGdqAQC2ttSGJ66s3Z8KbAO4L4Pz7QCqSZzlm9mizmNUgCptlIQsx1bWGJOl0-jwh-uhmP-jrkRigPYhWqIrDziYprVyn8Z-c1Cv3jzPJOsgkZ40WaXqDJ9F5LNrzFGXoVvdydK9FF0HLq1c3uDJIvcXjrf26kPpqrYLd6h_-1-cwAvtrrg19f4luq49aegwMCSCN5-upADHoK9-p1196JYuWNiVMaGCd7a5KstDa5mwxKjFqHfvD22yoUcMc_PNVqmRfvMGXVVo40Ez0DV3yf-g1nKMKj6ZIYrZ4bvLoDrCmiCzM0uQavfsrncL3OLbHR7F5GrKJU-5noowxfhL2XuAM09TptSvNHzkG-B4RhAYKJ2Z4xHKSiSkVVax89PnwSmqFPMgbt0bgix-DZpalUXHWl1HzDtByDmgWIP0hvA6v5jiA-pE42MIwz4SPWbxF1s_HbQOAe5iPmpHZRk0viWiOuoBc3kdV2W1dDwdPYHlF2at4jK1g';
    // let base64 = Base64.decode(str);
    // console.log(base64);
    // let a = base64.slice(0, 171);
    // let b = base64.slice(172);
    // let s = ad(a);
    // let d = sd(b, s);
    // console.log(s, d)
    openUserMonitoring()
    console.log(123)
    wxRequest({
      url: 'http://10.179.147.105:8000/sec/risk-gateway/common/risk_newton_sdk_web_config_get?apiVersion=1.0.0',
      method: 'post',
      data: {
        appid: '211',
        version: 1607413223837,
        configId: '37'
      }
    }).then(res => {
      console.log(res.data);
      let base64 = Base64.decode(res.data);
      // let ungzipStr = pako.inflate(base64)
      // console.log(ungzipStr);
      console.log(base64)
      let a = base64.slice(0, 171);
      let b = base64.slice(172);
      let s = ad(a);
      let d = sd(b, s);
      console.log(s, d)
    }).catch(err => {
      console.log(err);
    })
  }
})
