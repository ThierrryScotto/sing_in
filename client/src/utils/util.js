module.exports = {
  validUser(name, password, check) {
    if (name == "lee" && password == "lee") {
      check ? module.exports.setUserPerm(name, password, check) : module.exports.setUserTemp(name, password, check)
      return true;
    } else 
      return false

  },

  setUserTemp(name, password, check) {
    let storage = window.sessionStorage;
    let user = {
      name,
      password,
      check
    }
    storage.setItem("login", JSON.stringify(user))
  },

  setUserPerm(name, password, check) {
    let storage = window.localStorage;
    let user = {
      name,
      password,
      check
    }
    storage.setItem("login", JSON.stringify(user))
  },

  checkUser() {
    let local = window.localStorage;
    let session = window.sessionStorage;

    let a = local.getItem("login")
    let b = session.getItem("login")

    if (a)
      return JSON.parse(a)
    else if (b)
      return JSON.parse(b)
    else 
      return false

  }
}