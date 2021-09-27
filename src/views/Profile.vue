<template>
  <div class="profile-container">
    <base-card>
      <h2>Profile</h2>
      <vue-feather
        v-if="isSubmitting"
        type="loader"
        animation="spin"
        animation-speed="fast"
        class="icon-container"
      />
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            v-model.trim="firstName.val"
            placeholder="Please enter you first name"
            @blur="clearValidity('firstName')"
          />
          <p v-if="!firstName.isValid">{{ firstName.error }}</p>
        </div>
        <div class="form-control">
          <label for="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            v-model.trim="lastName.val"
            placeholder="Please enter you last name"
            @blur="clearValidity('lastName')"
          />
          <p v-if="!lastName.isValid">{{ lastName.error }}</p>
        </div>
        <div class="form-control">
          <label for="phoneNumber">Phone:</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            v-model.trim="phoneNumber.val"
            placeholder="eg: 7897897896"
            @blur="clearValidity('phoneNumber')"
          />
          <p v-if="!phoneNumber.isValid">{{ phoneNumber.error }}</p>
        </div>
        <base-button type="submit">
          Update
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: {
        val: this.$store.getters.firstName,
        isValid: true,
        error: null
      },
      lastName: {
        val: this.$store.getters.lastName,
        isValid: true,
        error: null
      },
      phoneNumber: {
        val: this.$store.getters.phoneNumber,
        isValid: true,
        error: null
      },
      isSubmitting: false,
      formIsValid: true
    }
  },
  methods: {
    async submitForm () {
      this.validateForm()
      if (this.formIsValid) {
        this.isSubmitting = true
        const userId = this.$store.getters.userId
        await this.$store.dispatch('createUser', {
          firstName: this.firstName.val,
          lastName: this.lastName.val,
          phoneNumber: this.phoneNumber.val,
          userId
        })
        this.isSubmitting = false
      }
    },
    clearValidity (field) {
      this[field].isValid = true
      this[field].error = null
    },
    validateForm () {
      this.formIsValid = true
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
        this.phoneNumber.error = "Phone can't be empty"
        this.formIsValid = false
      }
    },
    getStoreValues () {
      this.firstName.val = this.$store.getters.firstName
      this.lastName.val = this.$store.getters.lastName
      this.phoneNumber.val = this.$store.getters.phoneNumber
    }
  },
  computed: {
    firstNameVal () {
      return this.$store.getters.firstName
    }
  },
  watch: {
    firstNameVal (curVal, oldVal) {
      if (curVal !== oldVal) {
        this.getStoreValues()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  height: 100%;
}
</style>
