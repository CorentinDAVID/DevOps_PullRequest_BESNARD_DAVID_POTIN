const crypto = require('crypto');
const aes256 = require('aes256');

const serverCurve = crypto.createECDH('secp521r1');
serverCurve.generateKeys();

const serverPublicKeyBase64 = serverCurve.getPublicKey().toString('base64');

const serverSharedKey = serverCurve.computeSecret(serverPublicKeyBase64,'base64','hex');

const getSharedKey = ()=>{return serverSharedKey;}

const encryptMessage = (message)=>{return aes256.encrypt(serverSharedKey,message);}

const decryptMessage = (key,encryptedMessage)=>{return aes256.decrypt(key,encryptedMessage);}

exports.getSharedKey = getSharedKey;
exports.encryptMessage = encryptMessage;
exports.decryptMessage = decryptMessage;