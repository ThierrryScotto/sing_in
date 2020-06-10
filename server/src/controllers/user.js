const User = require("../models/user")

module.exports = {
  async createUser(req, res) {
    
    //chamar a função que vai decripitar as informarções 

    let { name, password, email } = req.body.user;

    await User.create({
      name,
      password,
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