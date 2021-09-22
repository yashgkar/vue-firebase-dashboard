export default {
  setCurrentUser (state, payload) {
    state.currentUser = payload
    state.didAutoLogout = false
  },
  setAutoLogout (state) {
    state.didAutoLogout = true
  },
  setError (state, payload) {
    state.error = payload
  },
  setUserData (state, payload) {
    state.currentUser.firstName = payload.firstName
    state.currentUser.lastName = payload.lastName
    state.currentUser.phoneNumber = payload.phoneNumber
  }
}
