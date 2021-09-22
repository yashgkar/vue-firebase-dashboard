import { createStore } from 'vuex'
import userModule from './users'
import authModule from './auth'

export default createStore({
  modules: {
    users: userModule,
    auth: authModule
  },
  state () {
    return {
      userId: 'c3'
    }
  }
})
