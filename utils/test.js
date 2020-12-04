// const pako = require('./pako.min');
import pako from 'pako';


export default function () {
  return 'export default'
}

export const randomString = function (len){
	//默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var chars = 'abcdefghijklmnprstuvwxyz012345678';
	// var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var tempLen = chars.length, tempStr='';
	for(var i=0; i<len; ++i){
		tempStr += chars.charAt(Math.floor(Math.random() * tempLen ));
	}
	return tempStr;
}
export const unzip = function (key) {
	console.log(key)
	var charData = [];
        var keyArray = key.split('');
        for(var i = 0; i < keyArray.length; i++){
					var item = keyArray[i];
					console.log(item.charCodeAt(0))
            charData.push(item.charCodeAt(0));
        }

        var binData = new Uint8Array(charData);
        console.log('Uint8Array:' + binData);
        // 解压
        var data = pako.inflate(binData);
        // var data = pako.inflate(charData);

        // 将GunZip ByTAREAR转换回ASCII字符串
        // key = String.fromCharCode.apply(null, new Uint16Array(data));

        key = String.fromCharCode.apply(null, data);

        return decodeURIComponent(Base64.decode(key));
}