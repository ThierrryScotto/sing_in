const User = require("../models/user")
const utils = require("../utils/utils")

module.exports = {
  async createUser(req, res) {
    let { name, password, email } = req.body.user;

    await User.create({
      name,
      password: utils.encrypt(password),
      email,
    }).then(() => {
      res.send({ success: true })
    }).catch(err => {
      res.send({ success: true, error: "Erro ao cadastrar usuário" })
      console.log(err)
    })
  },

  validEmail(email) {
    User.findOne({
      where: {email: email},
    }).then(success => {
      if (success) return false
      else return true;
    })
    .catch(err => {
      console.log(err);
    })
  }
}