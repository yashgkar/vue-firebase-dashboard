import axios from 'axios'
import { v4 } from 'uuid'

export default {
  async registerUser (ctx, data) {
    const userId = ctx.rootGetters.userId
    const userData = {
      email: data.email,
      name: data.name,
      isSelected: false,
      userId
    }
    let response
    try {
      response = await axios(
        {
          url: `https://dashboard-assign-1-default-rtdb.firebaseio.com/users/${v4()}.json`,
          method: 'PUT',
          data: userData
        }
      )
    } catch (err) {
      const error = new Error(err.toJSON().message || 'There was an issue creating this user')
      throw error
    }

    ctx.commit('registerUser', {
      ...response.data,
      fullName: response.data.name
    })
  },
  async getUsers (ctx) {
    let response
    let users = []

    try {
      response = await axios.get('https://dashboard-assign-1-default-rtdb.firebaseio.com/users.json')
    } catch (err) {
      const error = new Error(err.toJSON().message || 'Error during getting users')
      ctx.commit('setError', error, { root: true })
      return
    }
    for (const key in response.data) {
      const user = {
        fullName: response.data[key].name,
        isSelected: response.data[key].isSelected,
        userId: response.data[key].userId,
        email: response.data[key].email
      }
      users.push(user)
    }
    const userId = ctx.rootGetters.userId
    users = users.filter(user => user.userId === userId)
    ctx.commit('setUsers', users)
  }
}
