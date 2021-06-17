<template lang="pug">
  .create-employee.flex-center-space-between
    .flex-center
      img.user-img(src="@/icons/user.png")
      input.custom-input(v-model="name")

    .flex-center-space-between
      img.save-employee(src="@/icons/diskette.png" width="20" @click="addEmployee()")
      img.save-employee(src="@/icons/remove.png" width="20" @click="removeEmployee()")

</template>

<script>
export default {
  name: 'CreateEmployee',
  props: {
    employee: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      name: null
    }
  },
  methods: {
    removeEmployee() {
      this.$emit('removeEmployee')
    },
    addEmployee() {
      this.employee.name = this.name
      this.$emit('saveEmployee')
    }
  }
}
</script>

<style lang="sass">
.create-employee
  .user-img
    width: 18px
    margin: 0 10px 0 0
  .save-employee
    margin: 2px 4px
    width: 18px
    cursor: pointer
    transition: .3s
    &:hover
      opacity: 0.8
      transform: scale(1.2)

  .custom-input
    width: 230px
    height: 22px
    font-size: 14px
    border-color: #4473e2
    &:focus
      outline: none !important
      border: 2px solid #4473e2
</style>