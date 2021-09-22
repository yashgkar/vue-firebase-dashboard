<template>
  <header>
    <nav>
      <div class="home">
        <router-link to='/dashboard'>
          <h3>{{ fullName }}</h3>
        </router-link>
      </div>
      <ul v-if="isLoggedIn">
        <li><base-button type="button" @click="logout">Logout</base-button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    fullName: String
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5rem;
  transition: 0.3s all ease-in-out;
  border-bottom: 1px solid #ccc;

  nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home {
      margin-left: 2rem;

      a {
        color: black;
      }
    }

    a {
      text-decoration: none;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      margin: 0 10px;
    }
  }
}
</style>
