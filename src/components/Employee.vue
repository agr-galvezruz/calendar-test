<template lang="pug">
  .employee
    .show-data.flex-center-space-between(v-if="!show_actions && !employee.editName")
      .flex-center
        img.user-img(src="@/icons/user.png")
        .employee-name {{ employee.name }}
      .remaining-vacation-days {{ getRemainingDays() }}

    .show-data.flex-center-space-between(v-else)
      .flex-center
        img.user-img(src="@/icons/user.png")
        .employee-name(v-if="!employee.editName") {{ employee.name }}
        input.custom-input(v-else v-model="employee_name" placeholder="Nombre del empleado" ref="inputName")
      .actions
        .flex-center-space-between(v-if="!employee.editName")
          img.save-employee(src="@/icons/text.png" width="20" @click="editName()")
          img.save-employee(src="@/icons/delete.png" width="20" @click="removeEmployee()")
        .flex-center-space-between(v-else)
          img.save-employee(src="@/icons/save.png" width="20" @click="saveEmployee()")
          img.save-employee(src="@/icons/remove.png" width="20" @click="!employee.name ? removeEmployee() : cancelEditName()")

</template>

<script>
export default {
  name: 'Employee',
  props: {
    employee: {
      type: Object,
      default: null
    },
    max_free_days: {
      type: Number,
      default: 0
    },
    index_array: {
      type: Number,
      default: 0
    },
    show_actions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      employee_name: null
    }
  },
  methods: {
    getRemainingDays() {
      const vacation_days = this.employee.fechas.filter(fecha => fecha.tipoId === 'V').length
      return `${this.max_free_days - vacation_days} / ${this.max_free_days}`
    },
    removeEmployee() {
      this.employee_name = null
      this.$emit('removeEmployee', this.index_array)
    },
    editName() {
      this.employee_name = this.employee.name
      this.employee.editName = true
    },
    cancelEditName() {
      this.employee_name = null
      this.employee.editName = false
    },
    saveEmployee() {
      if (this.checkEmployeeName()) {
        this.employee.name = this.employee_name
        this.employee_name = null
        this.employee.editName = false
        this.$emit('saveEmployee')
      }
    },
    checkEmployeeName() {
      if (!this.employee_name) {
        this.$refs.inputName.classList.add('required')
        this.$refs.inputName.placeholder = 'Nombre empleado obligatorio'
        return false
      }

      if (this.$refs.inputName.classList.contains('required')) this.$refs.inputName.classList.remove('required')
      return true
    }
  }
}
</script>

<style lang="sass">
.employee
  .user-img
    width: 18px
    margin: 0 10px 0 0
  .remaining-vacation-days
    background-color: #69ac5b
    padding: 2px 4px
    color: #ffffff

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
    padding: 0 5px
    &:focus
      outline: none !important
      border: 2px solid #4473e2

  .required
    border-color: red !important
    &::placeholder
      color: #fd9696
      opacity: 1

</style>