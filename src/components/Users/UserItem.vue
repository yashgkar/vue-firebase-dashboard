<template>
  <li @click="handleOpen">
    <main><h4>{{fullName}}</h4> <vue-feather class="icon-container" :type="iconStatus"></vue-feather></main>
    <div v-show="isOpen">
      <h5>Email: <a :href="userEmail">{{email}}</a></h5>
    </div>
  </li>
</template>

<script>
export default {
  props: ['fullName', 'email', 'userId', 'isSelected'],
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    userEmail () {
      return 'mailto:' + this.email
    },
    iconStatus () {
      return this.isOpen ? 'chevron-down' : 'chevron-right'
    }
  },
  methods: {
    handleOpen () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  text-align: start;
  padding-left: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;

  &:hover {
    background-color: whitesmoke;
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h5 {
    a {
      text-decoration: none;
      color: #000;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
