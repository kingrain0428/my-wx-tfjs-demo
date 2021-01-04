/*
 * @Author: your name
 * @Date: 2020-09-22 17:47:51
 * @LastEditTime: 2020-12-09 15:12:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-wx-tfjs-demo/utils/util.js
 */
import { sm4 } from 'miniprogram-sm-crypto';
import { JSEncrypt } from './jsencrypt';
import { Base64 } from './b4';
import pako from './pako.min';
const polyfill = require('./base64')
const {atob, btoa} = polyfill;
export const ss = function (t) {
  // console.log(t)
  let z = btoa(pako.gzip(t, {to: 'string'}));
  console.log('btoa', z);
  let s = rs();
  // console.log(s, s.length)
  let b = ae(s);
  let e = se(z, s);
  // console.log(`${b}${e}`, b, b.length, e, e.length)
  // let base64 = Base64.encode(`${b}${e}`);
  // console.log(btoa(e))
  // let base64 = btoa(`${b}${e}`);
  // console.log(base64)
  return btoa(`${b}${e}`);
}
export const sse = function (str) {
  // let base64 = Base64.decode(str);
  let base64 = atob(str);
  // // let base64 = str;
  // console.log('base64', base64)
  let a = base64.slice(0, 171);
  // console.log('a', a)
  let b = base64.slice(172);
  // console.log('b', b)
  let s = ad(a);
  // console.log('s', s)
  let d = sd(b, s);
  // console.log('d', d)
  // console.log('atob d', atob(d))
  return unzip(atob(d))
}
function unzip(strData){
  // let strData = atob(b64Data),
  let charData = strData.split('').map(function(x){return x.charCodeAt(0);});
  let binData = new Uint8Array(charData);
  let data = pako.inflate(binData);
  // strData = String.fromCharCode.apply(null, new Uint16Array(data));
  strData = handleCodePoints(data);
  return strData
  // return decodeURIComponent(strData)
}
function handleCodePoints(array) {
  var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
  var index = 0;
  var length = array.length;
  var result = '';
  var slice;
  var arr = [];
  for (var i = 0, _i = array.length; i < _i; i++) {
    arr[i] = array[i];
  }
  while (index < length) {
    slice = arr.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return result;
}
//对称加密 秘钥生成方法
export const rs = function (ln = 32){
	let s = 'abcdef0123456789';
	let l = s.length, ts='';
	for(let i=0; i<ln; ++i) {
		ts += s.charAt(Math.floor(Math.random() * l ));
	}
	return ts;
}
//sm4 对称加密
export const se = function (t, y) {
  if (!t|| !y) {
    return '';
  }
  if (typeof t !== 'string') {
    //序列化判断
    t = JSON.stringify(t);
  }
  let e = sm4.encrypt(t, y);
  return e;
}
//sm4 对称解密
export const sd = function(s, e) {
  if (!s|| !e) {
    return '';
  }
  let d = sm4.decrypt(s, e);
  return d
}
//非对称加密
export const ae = function (t) {
  if (!t) {
    return ''
  }
  if (typeof t !== 'string') {
    t = JSON.stringify(t);
  }
  //本地
  // let a = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8HMr2CBpoZPm3t9tCVlrKtTmI4jNJc7/HhxjIEiDjC8czP4PV+44LjXvLYcSV0fwi6nE4LH2c5PBPEnPfqp0g8TZeX+bYGvd70cXee9d8wHgBqi4k0J0X33c0ZnW7JruftPyvJo9OelYSofBXQTcwI+3uIl/YvrgQRv6A5mW01QIDAQAB';
  let a = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGvHhEcAlCb+4ofIZ3Wo4DeyJRzHqp+kgykJIFNKoMh9T8qXln8h26du453V7ld/lmGxW6i0mS8n4j9d1H4PLNNMwP2oqaxI4iH1KzsPN/bK8Htlb2p22lzamR8iXlYBg+2sjRQB/eloKO3cK/CoXKR/9DuXkV/n09xu6hnbXmJQIDAQAB';
  let b = new JSEncrypt();
  b.setPublicKey(a);
  let c = b.encrypt(t);
  return c;
}
//非对称解密
export const ad = function(r) {
  if (!r) {
    return ''
  }
  //本地
  // let a = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALwcyvYIGmhk+be320JWWsq1OYjiM0lzv8eHGMgSIOMLxzM/g9X7jguNe8thxJXR/CLqcTgsfZzk8E8Sc9+qnSDxNl5f5tga93vRxd5713zAeAGqLiTQnRffdzRmdbsmu5+0/K8mj056VhKh8FdBNzAj7e4iX9i+uBBG/oDmZbTVAgMBAAECgYEAmgNU5NTDkj9B+Pnt6UU8doSjw3+3j+bV2K2yS3QUOvAUus/Ax7x6ktjWxzCXvDY9IfUil2RNv9vtKEAqYLCWjc+lf8PV/yH1b7NEgyeAPBXtAJRoOnmYL2bdPW92kP9KgxJruF6Dz/C5AmMOncsvq8ABD+9Darn4p8dwj2ZC4O0CQQDf/AHmZsQokEItfCy4mHS9UbxbfIhEUv1ApPh/+Sr7NkJkHWYCtBQo+8jKO6zurAZQgWBPD1XX2UE4R+VIiZazAkEA1wAqtMvGhccyRZr+6kpkpDIa8+9jOE+nGUzqTDvgCID6as8AzOONFVVK6m/UUqkhcJ8Qu1pF36BGojy5BX2KVwJBAJSFpbji0hXXupowqfLp3RcgmNbNWAp+QUJZYhJx5cdYbmO2fssyH+AhPT6knYJR/YnqkDM8hv6vKCkqu2YDHjMCQAOA8TE5EOclM+CGghj3VWSHnIDVKdzFD4gOBNNxNlltIKeU8AJmwunSFgJ0CBXAw9a+ANvMwM7AIeaK7sj0HskCQAvxfDCq7gaNx+pfu0FHG8Gix08A/A6foggBl1fVu+L9sr9ZuOQ3HbXnl28F9ewuB9xdjnLUDjp7W7U0pB+vKoQ=';
  let a = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMa8eERwCUJv7ih8hndajgN7IlHMeqn6SDKQkgU0qgyH1PypeWfyHbp27jndXuV3+WYbFbqLSZLyfiP13Ufg8s00zA/aiprEjiIfUrOw839srwe2VvanbaXNqZHyJeVgGD7ayNFAH96Wgo7dwr8KhcpH/0O5eRX+fT3G7qGdteYlAgMBAAECgYB4zL7d+qvmMls1SNwDWIvSGdq2lfBJudSAx9e6SlTC4R3ZprohMM5ZNUmA6spv+Qkjw3rltRy3saZy/VPQCTAL8ERzCfT8C9jPbXC1o2RP3rGZqYGPSt6b/xm9lH3IqMN03z0NE3M+ZoQByjlj5QMgKtZACtkH2Qa4ZRc6fYcBgQJBAPpUMJ7nN9yjqJJuPhm1CCMMbfu60NHk7AryHi4CxmN4ruau7uixRyWBbCsmx58Xd8iMvWijkS0o70DgMs9sAjkCQQDLPRABnvpUvz41Nd/OCQ4OX/Gy04MXLGYub86Rp+hfR6OtjZuY2aSDoBiBB2At7Jry3+8cDdJvTFQ0rO9ahxNNAkEAxWRpyoOM2yD6Ji1kLqU/u1NrzporW7dmIeN1xNZPVdSuJh0/KqHP9lUt1IEJ2/uHas7/9Gk2ayPiNYgUyNbkkQJATbei+Eu3xFKBUk2wsJQL2PldbpmtRl5HELjWkCJaHJ1DfOlqt696Vo8Q775HTChvNDLnt52de8v/Y0lCGicO/QJATekBVDeEM//if1JwQ3aXgZSkRyIZJxUNFhmCZnxGqS37DAz8ucELUzBOSeMRxQABtDqOyUt4/mpDgzRTAmGbcg==';
  let b = new JSEncrypt();
  b.setPrivateKey(a)
  let c = b.decrypt(r);
  return c;
}