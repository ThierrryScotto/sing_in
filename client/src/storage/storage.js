module.exports = {
  setUser(user) {
    let storage = window.localStorage;
    storage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    let storage = window.localStorage;
    return JSON.parse(storage.getItem('user'));
  }
}