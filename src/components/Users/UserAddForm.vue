<template>
  <base-card>
    <div class="form-container">
      <h2>User Data</h2>
      <vue-feather
        class="icon-container"
        v-if="isSubmitting"
        type="loader"
        animation="spin"
        animation-speed="fast"
      />
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Should include '@'"
            :class="{ error: !email.isValid }"
            v-model="email.val"
            @blur="clearValidity('email')"
          />
          <p v-if="!this.email.isValid">{{ this.email.error }}</p>
        </div>
        <div class="form-control">
          <label for="fullName">Name:</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter full name"
            v-model="name.val"
            @blur="clearValidity('name')"
          />
          <p v-if="!this.name.isValid">{{ this.name.error }}</p>
        </div>
        <base-button type="submit">Add User</base-button>
      </form>
    </div>
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
      name: {
        isValid: true,
        error: null,
        val: ''
      },
      isSubmitting: false,
      error: null,
      formIsValid: true
    }
  },
  methods: {
    async submitForm () {
      this.validateForm()
      if (this.formIsValid) {
        try {
          this.isSubmitting = true
          await this.$store.dispatch('users/registerUser', {
            email: this.email.val,
            name: this.name.val
          })
          this.name.val = ''
          this.email.val = ''
          this.isSubmitting = false
        } catch (err) {
          this.error = err
        }
      }
    },
    clearValidity (field) {
      this[field].isValid = true
      this[field].error = null
    },
    validateForm () {
      const emailCheck = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
      this.formIsValid = true
      if (this.email.val === '') {
        this.email.isValid = false
        this.email.error = "Email can't be empty"
        this.formIsValid = false
      } else if (
        !emailCheck.test(this.email.val)
      ) {
        this.email.isValid = false
        this.email.error = 'Email is invalid, Please try again with a valid email'
        this.formIsValid = false
      }

      if (this.name.val === '') {
        this.name.isValid = false
        this.name.error = "Name can't be empty"
        this.formIsValid = false
      }

      if (this.name.val !== '' && this.name.val.length < 8) {
        this.name.isValid = false
        this.name.error = 'Name should be longer than 8 characters'
        this.formIsValid = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 20rem;

  @media screen and (max-width: 900px) {
    width: 85vw;
  }
}
</style>
