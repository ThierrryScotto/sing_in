const User = require("../models/user");
const utils = require("../utils/utils");

module.exports = {
  checkLogin(req, res) {
  let { password, email } = req.body.login;

  let passwordEncrypt = utils.encrypt(password);

  User.findOne({
    where: {email: email, password: passwordEncrypt},
  }).then(success => {
    if (success)
      res.send({ success: true})
    else 
      res.send({ success: flase, error: "Usuário não tem cadastro"})
  })
  .catch(err => {
    console.log(err);
  })
  }
}