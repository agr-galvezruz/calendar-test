<template lang="pug">
  .employee-info.flex-center-space-between
    .flex-center
      img.user-img(src="@/icons/user.png")
      .employee-name {{ employee.name }}
    .remaining-vacation-days {{ getRemainingDays() }}

</template>

<script>
export default {
  name: 'EmployeeInfo',
  props: {
    employee: {
      type: Object,
      default: null
    },
    max_free_days: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getRemainingDays() {
      const vacation_days = this.employee.fechas.filter(fecha => fecha.tipoId === 'V').length
      return `${this.max_free_days - vacation_days} / ${this.max_free_days}`
    }
  }
}
</script>

<style lang="sass">
.employee-info
  .user-img
    width: 18px
    margin: 0 10px 0 0
  .remaining-vacation-days
    background-color: #69ac5b
    padding: 2px 4px
    color: #ffffff
</style>