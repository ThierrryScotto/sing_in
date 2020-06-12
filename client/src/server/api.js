import {api} from "./config"

export default {
  regiterUser(user) {
    return api.post('createUser', { user })
  },
  checkLogin(user) {
    return api.get('login', { user })
  }
}