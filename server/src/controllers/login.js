const User = require("../models/user")

module.exports = {
  checkLogin(req, res) {

  //check user and password

  let { password, email } = req.body.login;

  User.findOne({
    where: {email: email, password: password},
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