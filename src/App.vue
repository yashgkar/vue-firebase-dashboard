<template>
  <the-sider v-if="isLoggedIn" />
  <main>
    <the-header v-if="isLoggedIn && !!adminName" :fullName="adminName" />
    <div>
      <router-view />
    </div>
  </main>
  <popup :show="isError" title="Error occurred!" @close="closePopup">
    {{errorMessage}}
  </popup>
</template>

<script>
export default {
  computed: {
    didAutoLogout () {
      return this.$store.getters.didAutoLogout
    },
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    },
    adminName () {
      return this.$store.getters.fullName
    },
    isError () {
      return this.$store.getters.isError
    },
    errorMessage () {
      return this.$store.getters.error
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('tryLogin')
  },
  watch: {
    didAutoLogout (curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/login')
      }
    }
  },
  methods: {
    closePopup () {
      this.$store.dispatch('error', '')
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap');

html {
  font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

.form-control {
  margin: 2.5rem 1rem 0 1rem;
  align-items: flex-start;

  // &:focus-within label {
  //   transform: translateY(-2.5rem);
  // }

  label {
    margin: 1rem 1rem 1rem 0;
    text-align: start;
    width: 6rem;
    position: absolute;
    transform: translateY(-2.5rem);
    color: black;
  }

  input {
    height: 3.5rem;
    box-sizing: border-box;
    font-size: 1rem;
    padding: 0.3rem;
    width: 100%;
    min-width: 16rem;
    border: 1px solid black;
    outline: none;

    &:focus-within {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
  }

  .error {
    border-color: red;
  }

  p {
    display: inline-block;
    grid-column-start: 2;
    grid-column-end: 3;
    margin: 0 0 4px 0;
    text-align: start;
    color: red;
    font-weight: 700;
    font-size: 14px;
  }
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}
</style>
