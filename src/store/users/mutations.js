export default {
  registerUser (state, payload) {
    state.users.push(payload)
  },
  setUsers (state, payload) {
    state.users = payload
  }
}
