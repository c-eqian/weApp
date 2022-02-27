var crypto = require("../crypto/crypto")
const cryptoConfig= {
     //配置sm4参数
    key: "JeF38U9wT9wldfdf",//这里这个key值是跟后端要的，必须与之一致
    mode: "ecb", // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    cipherType: "base64" //采用base64编码
}
//ECB模式加密字符串
export function SM4EnCrypto_ECB(EnString) {
  return crypto.encrypt_ecb(EnString,cryptoConfig.key);
}

//ECB模式解密字符串
export function SM4DeCrypto_ECB(DeString) {
  return crypto.decrypt_ecb(DeString,cryptoConfig.key);
}

//CBC模式加密字符串
export function SM4EnCrypto_CBC(EnString) {
  return crypto.encrypt_ecb(EnString,cryptoConfig.key);
}

//CBC模式解密字符串
export function SM4DeCrypto_CBC(DeString) {
  return crypto.decrypt_cbc(DeString,cryptoConfig.key);
}

