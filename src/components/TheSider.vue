<template>
  <nav @mouseenter="hover(true)" @mouseleave="hover(false)">
    <ul v-if="hovering">
      <router-link to="/profile">
        <li>
          <vue-feather
            type="user"
          />
        </li>
      </router-link>
      <router-link to="/dashboard">
        <li>
          <vue-feather
            type="home"
          />
        </li>
      </router-link>
      <!-- <li>
        <a href="https://github.com/yashgkar/vue-learning" target="_blank">
          <vue-feather
            type="github"
          />
        </a>
      </li> -->
      <li @click="logout">
        <vue-feather
          type="log-out"
        />
      </li>
    </ul>
    <ul v-else>
      <li>
        <vue-feather
          type="menu"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      hovering: false
    }
  },
  methods: {
    hover (val) {
      this.hovering = val
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  height: max-content;
  position:absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  width: 5rem;
  background-color: rgb(228, 228, 228);
  border-radius: 0 10px 10px 0;
  box-shadow: 0px 0px 13px 7px rgba(206, 206, 206, 0.42);

  @media screen and (max-width: 900px) {
    top: 85px;
    bottom: auto;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      margin: 1.5rem 1rem;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      cursor: pointer;
      transition: 0.2s all ease-in-out;

      &:hover {
        color: rgb(255, 255, 255);
        background-color: rgb(153, 153, 153);
      }
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
