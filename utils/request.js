/*
 * @Author: your name
 * @Date: 2020-12-07 19:38:24
 * @LastEditTime: 2020-12-09 10:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-wx-tfjs-demo/utils/request.js
 */
function wxRequest (opt) {
    return new Promise((resolve, reject) => {
        wx.request({
            ...opt,
            success(res) {
                const { data, statusCode, errMsg } = res;
                switch (statusCode) {
                    case 200:
                        resolve(data)
                        break;
                    default:
                        reject({...opt, msg: errMsg});
                        break;
                }
            },
            fail(err) {
                reject({...opt, msg: '请求异常'});
            }
        })
    })
}

export default function (params) {
    //微信端
    if (wx) {
        return wxRequest({...params});
    }
}
