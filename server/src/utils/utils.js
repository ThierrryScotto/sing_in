var md5 = require('md5');

module.exports = {
  verifyToken(res, req, next) {
    //verifica se as informações estão vindo do front end que eu quero
  },
  decrypt(res, req, next) {
    //verifica decript as informações encripitadass
  },
  encrypt(text) {
    return md5(text);
  },

}