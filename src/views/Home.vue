<template>
  <div class="home">
    <h2>Create users</h2>
    <div class="main-container">
      <user-add-form />
      <user-list />
    </div>
  </div>
</template>

<script>
import UserAddForm from '@/components/Users/UserAddForm.vue'
import UserList from '@/components/Users/UsersList.vue'

export default {
  components: {
    UserAddForm,
    UserList
  },
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  justify-content: space-evenly;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
}
</style>
