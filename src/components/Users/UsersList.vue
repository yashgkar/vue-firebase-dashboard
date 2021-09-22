<template>
  <base-card>
  <div class="list-container">
    <h2>Users List</h2>
    <vue-feather
      v-if="isLoading"
      type="loader"
      animation="spin"
      animation-speed="fast"
      class="icon-container"
    />
    <ul v-if="!isLoading && allUsers && allUsers.length > 0">
      <user-item
        v-for="user in allUsers"
        :key="user.fullName"
        :email="user.email"
        :fullName="user.fullName"
      />
    </ul>
  </div>
  </base-card>
</template>

<script>
import UserItem from './UserItem.vue'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    UserItem
  },
  computed: {
    allUsers () {
      const users = this.$store.getters['users/getUsers']
      const userId = this.$store.getters.userId
      users.filter(item => {
        return item.userId === userId
      })
      return users
    }
  },
  methods: {
    async getUsers () {
      this.isLoading = true
      await this.$store.dispatch('users/getUsers')
      this.isLoading = false
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style lang="scss">
.list-container {
  width: 40rem;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
}
</style>
