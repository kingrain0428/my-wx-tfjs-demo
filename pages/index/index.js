

// const pako = require('../../utils/pako.min');
import pako from 'pako';
import { sm2, sm4 } from 'miniprogram-sm-crypto';
import test, { randomString, unzip } from '../../utils/test';
import wsgsig from '@didi/wsgsig';
import { JSEncrypt } from '../../utils/jsencrypt';
import { gzip } from 'pako';
Page({
  touchmove(e) {
    console.log(JSON.stringify(e))
  },
  onLoad() {
    console.log(test(), randomString(32));
    let key = 'cc9368581322479ebf3e79348a2757d9';
    let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCG77PYUAcCpANyUmsHJfuDIia9FcITsuu9lnfbE2BbEwd4SOxPBFTwEWTZ9/e+mtjP97KFEBohGkwy+VHE5KocypBv0O7YgEevwMgpvxyYY0v104CB/k0yjCFV7lc7FxY5VgEKrMiXTIkMr1ukCnWVvapvRCS6IFcsT/kkjPgfDQIDAQAB'
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);  
    var encrypted = encrypt.encrypt(key);
    console.log('rsa + '+ encrypted+ '\n' + publicKey)
    // let str = {"name":"color","sex":"man"}
    // //gzip 压缩
    // let gzipStr = pako.gzip(JSON.stringify(str), {to: 'string'});
    // console.log('gzipStr', gzipStr, str);
    // //sm4 加解密
    // let sm4Key = 'cc9368581322479ebf3e79348a2757d9';
    // let encryptData = sm4.encrypt(gzipStr, sm4Key);
    // console.log('sm4 encrypt', encryptData);
    // let decryptData = sm4.decrypt('7c13527fe688fc2f070aa9a4aec363d5f29226061eb8990faf110063ece220fc38ee88941308392be77d9615e76e2b07', sm4Key);
    // console.log('sm4 decrypt', decryptData);
    // let unGzipStr = unzip(decryptData);
    // console.log('unGzipStr', unGzipStr)
  
    //sm2 加解密
    // let keypair = sm2.generateKeyPairHex();

    // let publicKey = keypair.publicKey; // 公钥
    // let privateKey = keypair.privateKey; // 私钥
    // let publicKey = "NWM1Yzc2ZmQyNmM2YWQ0OTE2NTM4M2ZiYzdjNDY2M2JlMWRhZjQ1NjJkZmYwOTIyMGM5MTU2MTkyZmZhNGQxNiA="; // 公钥
    // let privateKey = "MDQwMjAxMzJkZjFlMmQ4NDhiMTZkM2JhZGI1OTNjNTkxNjU2OWU2OWJiZTI3ZTE0OTFkMmE0OTFjZDI0NTJkM2U3NGRkNmYxNTZjM2E4YjU2MWU4MTEzY2VkMGQzNjczMDQxYWJmN2FlMDRkYWViMzMxYWZhZmI0OTVlZDMwNDM4ZQ=="; // 私钥
    // console.log('keypair', keypair)
    // const cipherMode = 1; // 1 - C1C3C2，0 - C1C2C3，默认为1
    // let encryptData = sm2.doEncrypt('313233313233', publicKey, cipherMode);
    // console.log('encryptData', encryptData);
    // let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode);
    // console.log('decryptData', decryptData);
  }
})
