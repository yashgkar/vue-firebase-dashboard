import axios from 'axios'
import getErrorMessage from './getErrorMessage'

let timer
export default {
  async auth (ctx, data) {
    const { email, password, type, firstName, lastName, phoneNumber } = data
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${process.env.VUE_APP_FIREBASEAPIKEY}`
    let response, userRes
    try {
      response = await axios({
        url: url,
        method: 'POST',
        data: {
          email,
          password,
          returnSecureToken: true
        }
      })
      if (type === 'signUp') {
        try {
          userRes = await ctx.dispatch('createUser', {
            firstName,
            lastName,
            phoneNumber,
            userId: response.data.localId
          })
        } catch (err) {
          ctx.dispatch('error', err)
          ctx.dispatch('deleteUser', { idToken: response.data.idToken })
          return
        }
      } else {
        try {
          userRes = await ctx.dispatch('getUser', {
            userId: response.data.localId
          })
        } catch (err) {
          ctx.dispatch('error', err)
          return
        }
      }
      const expiresIn = +response.data.expiresIn * 1000
      const expirationDate = new Date().getTime() + expiresIn

      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('userId', response.data.localId)
      localStorage.setItem('tokenExpiration', expirationDate)

      timer = setTimeout(function () {
        ctx.dispatch('autoLogout')
      }, expiresIn)
      ctx.commit('setCurrentUser', {
        token: response.data.idToken,
        userId: response.data.localId,
        firstName: userRes.firstName,
        lastName: userRes.lastName,
        phoneNumber: userRes.phoneNumber
      })
    } catch (err) {
      ctx.dispatch('error', getErrorMessage(err.response.data.error.message))
    }
  },
  async deleteUser (ctx, payload) {
    return await axios({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_FIREBASEAPIKEY}`,
      method: 'POST',
      data: {
        idToken: payload.idToken
      }
    })
  },
  async getUser (ctx, payload) {
    let response
    try {
      response = await axios.get(`https://dashboard-assign-1-default-rtdb.firebaseio.com/admin/${payload.userId}.json`)
      return response.data
    } catch (err) {
      const error = new Error(err.toJSON().message || 'Error during getting users')
      throw error
    }
  },
  async createUser (ctx, payload) {
    const { firstName, lastName, phoneNumber, userId } = payload
    let response
    try {
      response = await axios(
        {
          url: `https://dashboard-assign-1-default-rtdb.firebaseio.com/admin/${userId}.json`,
          method: 'PUT',
          data: {
            firstName,
            lastName,
            phoneNumber
          }
        }
      )

      ctx.commit('setUserData', {
        ...response.data
      })
      return response.data
    } catch (err) {
      const error = new Error(
        err.toJSON().message || 'Failed to create user'
      )
      throw error
    }
  },
  logout (ctx) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    ctx.commit('setCurrentUser', {
      token: null,
      userId: null,
      firstName: null,
      lastName: null,
      phoneNumber: null
    })
  },
  autoLogout (ctx) {
    ctx.dispatch('logout')
    ctx.commit('setAutoLogout')
  },
  async tryLogin (ctx) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')
    ctx.commit('setCurrentUser', {
      token: token,
      userId: userId
    })

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(function () {
      ctx.dispatch('autoLogout')
    }, expiresIn)

    let userRes
    if (token && userId) {
      try {
        userRes = await ctx.dispatch('getUser', { userId })
        ctx.commit('setCurrentUser', {
          token: token,
          userId: userId,
          ...userRes
        })
      } catch (err) {
        ctx.dispatch('logout')
      }
    }
  },
  error (ctx, payload) {
    ctx.commit('setError', payload)
  }
}
