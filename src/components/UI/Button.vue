<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/dashboard'
    }
  }
}
</script>

<style scoped lang="scss">
button,
a {
  margin: 1rem;
  background-color: rgb(81, 171, 255);
  transition: 0.1s all ease-in-out;
  border: 1px solid rgb(81, 171, 255);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;

  &:hover {
    background-color: rgb(88, 174, 255);
    border: 1px solid rgb(81, 171, 255);
    box-shadow: 5px 5px 0px 1px rgb(167, 212, 255);
  }

  &.outline {
    background-color: white;
    color: black;

    &:hover {
      box-shadow: 5px 5px 0px 1px rgb(167, 212, 255);
    }
  }
}
</style>
