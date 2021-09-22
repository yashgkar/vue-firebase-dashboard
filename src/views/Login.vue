<template>
  <base-card>
    <h2>{{ submitButtonText }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-control" v-if="type === 'signUp'">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          v-model.trim="firstName.val"
          placeholder="Please enter you first name"
          @blur="clearValidity('firstName')"
        />
        <p v-if="!this.firstName.isValid">{{ this.firstName.error }}</p>
      </div>
      <div class="form-control" v-if="type === 'signUp'">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          v-model.trim="lastName.val"
          placeholder="Please enter you last name"
          @blur="clearValidity('lastName')"
        />
        <p v-if="!this.lastName.isValid">{{ this.lastName.error }}</p>
      </div>
      <div class="form-control" v-if="type === 'signUp'">
        <label for="phoneNumber">Phone:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          v-model.trim="phoneNumber.val"
          placeholder="eg: 7899876453"
          @blur="clearValidity('phoneNumber')"
        />
        <p v-if="!this.phoneNumber.isValid">{{ this.phoneNumber.error }}</p>
      </div>
      <div class="form-control">
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Should include '@'"
          :class="{ error: !email.isValid }"
          v-model.trim="email.val"
          @blur="clearValidity('email')"
        />
        <p v-if="!this.email.isValid">{{ this.email.error }}</p>
      </div>
      <div class="form-control">
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Should be longer than 6 characters"
          v-model.trim="password.val"
          @blur="clearValidity('password')"
        />
        <p v-if="!this.password.isValid">{{ this.password.error }}</p>
      </div>
      <div class="buttons-container">
        <base-button type="submit">{{ submitButtonText }}
          <div class="loader">
            <vue-feather
              v-if="isSubmitting"
              type="loader"
              animation="spin"
              animation-speed="slow"
            />
          </div>
        </base-button>
        or
        <base-button type="button" @click="changeType" mode="outline">Signup</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data () {
    return {
      email: {
        isValid: true,
        error: null,
        val: ''
      },
      password: {
        isValid: true,
        error: null,
        val: ''
      },
      firstName: {
        isValid: true,
        error: null,
        val: ''
      },
      lastName: {
        isValid: true,
        error: null,
        val: ''
      },
      phoneNumber: {
        isValid: true,
        error: null,
        val: ''
      },
      isSubmitting: false,
      formIsValid: true,
      type: 'signInWithPassword'
    }
  },
  computed: {
    submitButtonText () {
      if (!this.isSubmitting) {
        return this.type === 'signInWithPassword' ? 'Login' : 'Sign Up'
      }
      return ''
    }
  },
  methods: {
    changeType () {
      this.type = this.type === 'signInWithPassword' ? 'signUp' : 'signInWithPassword'
    },
    async submitForm () {
      this.validateForm()
      if (this.formIsValid) {
        try {
          this.isSubmitting = true
          const payload = {
            email: this.email.val,
            password: this.password.val,
            type: this.type,
            firstName: this.firstName.val,
            lastName: this.lastName.val,
            phoneNumber: this.phoneNumber.val
          }
          await this.$store.dispatch('auth', payload)
          this.isSubmitting = false
          this.$router.replace('/dashboard')
        } catch (err) {
          this.isSubmitting = false
          this.email.val = ''
          this.password.val = ''
          this.firstName.val = ''
          this.lastName.val = ''
          this.phoneNumber.val = ''
        }
      }
    },
    clearValidity (field) {
      this[field].isValid = true
      this[field].error = null
    },
    validateForm () {
      this.formIsValid = true
      if (this.email.val === '') {
        this.email.isValid = false
        this.email.error = "Email can't be empty"
        this.formIsValid = false
      }

      if (this.password.val === '') {
        this.password.isValid = false
        this.password.error = "Password can't be empty"
        this.formIsValid = false
      }

      if (this.password.val !== '' && this.password.val.length < 6) {
        this.password.isValid = false
        this.password.error = 'Password should be longer than 6 characters'
        this.formIsValid = false
      }

      if (this.type === 'signUp') {
        if (this.firstName.val === '') {
          this.firstName.isValid = false
          this.firstName.error = "First name can't be empty"
          this.formIsValid = false
        }

        if (this.lastName.val === '') {
          this.lastName.isValid = false
          this.lastName.error = "Last name can't be empty"
          this.formIsValid = false
        }

        if (this.phoneNumber.val === '') {
          this.phoneNumber.isValid = false
          this.phoneNumber.error = "Phone number can't be empty"
          this.formIsValid = false
        }
      }
    }
  }
}
</script>

<style lang="scss">
h2 {
  text-align: center;
}

.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
