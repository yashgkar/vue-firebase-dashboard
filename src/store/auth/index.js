import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  state () {
    return {
      currentUser: {
        userId: 'c3'
      },
      disAutoLogout: false,
      error: null
    }
  },
  actions: actions,
  mutations: mutations,
  getters: getters
}
