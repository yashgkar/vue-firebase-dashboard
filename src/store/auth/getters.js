export default {
  userId (state) {
    return state.currentUser.userId
  },
  isAuthenticated (state) {
    return !!state.currentUser.token
  },
  token (state) {
    return state.currentUser.token
  },
  fullName (state) {
    return state.currentUser.firstName + ' ' + state.currentUser.lastName
  },
  firstName (state) {
    return state.currentUser.firstName
  },
  lastName (state) {
    return state.currentUser.lastName
  },
  phoneNumber (state) {
    return state.currentUser.phoneNumber
  },
  didAutoLogout (state) {
    return state.didAutoLogout
  },
  error (state) {
    return state.error
  },
  isError (state) {
    return !!state.error
  },
  user (state) {
    return state.currentUser
  }
}
