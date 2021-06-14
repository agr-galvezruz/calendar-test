<template lang="pug">
  #calendar
    table.calendar-container
      tr
        td.big-column EMPLEADOS
        td(v-for="day in calendar_data" :key="day.fecha" :class="getColor(day)") {{ day.fecha.toString().substr(day.fecha.toString().length - 2) }}

      tr(v-for="employee in employees")
        td.big-column {{ employee.name }} ({{ getRemainingDays(employee) }})


        td(v-for="day in employee.fechas" :key="day.fecha")
          Day(v-model="day.tipoId" :day="day" :canSelectDay="canSelectDay(employee)" @input="changeVacationDaysSelected(employee)")
</template>

<script>
// Al ser un ejemplo, los datos json están guardados en '/data/calendario'
import CalendarData from '@/data/calendario'
import Day from '@/components/Day.vue'

export default {
  name: 'Home',
  created() {
    this.employees = this.employees.map(employee => {
      return {
        ...employee,
        fechas: JSON.parse(JSON.stringify(CalendarData.datos)),
        diasVacacionesSeleccionados: 0
      }
    })
  },
  components: {
    Day
  },
  data() {
    return {
      calendar_data: CalendarData.datos,
      max_free_days: 22,
      employees: [
        { name: 'Antonio Gálvez Ruz' },
        { name: 'Alfonso Pérez Guzmán' }
      ]
    }
  },
  methods: {
    getRemainingDays(employee_data) {
      const vacation_days = employee_data.fechas.filter(fecha => fecha.tipoId === 'V').length
      return `${this.max_free_days - vacation_days} / ${this.max_free_days}`
    },
    changeVacationDaysSelected(employee_data) {
      const vacation_days = employee_data.fechas.filter(fecha => fecha.tipoId === 'V').length
      employee_data.diasVacacionesSeleccionados = vacation_days

      // Esto guarda el listado de empleados en el store de Vuex
      this.$store.dispatch('StoreEmployees', this.employees)
    },
    canSelectDay(employee_data) {
      return (employee_data.diasVacacionesSeleccionados < this.max_free_days)
    },
    getColor(day) {
      let color_class = 'white-day'

      switch (day.tipoId) {
        case 'F':
          color_class = 'blue-day'
          break
        case 'S':
          color_class = 'red-day'
          break
        case 'L':
          color_class = 'yellow-day'
          break
      }

      // Devolvemos el nombre de la clase para los estilos
      return color_class
    }
  }
}
</script>

<style lang="sass">

#calendar
  display: flex
  align-items: center
  justify-content: center
  .calendar-container
    overflow: auto
    display: block
    table, td, th
      border: 2px solid #dfdfdf
    table
      border-collapse: collapse !important
    td.blue-day
      color: #ffffff
      background-color: #4473e2
    td.red-day
      color: #ffffff
      background-color: #8e3430
    td.yellow-day
      color: #ffffff
      background-color: yellow
    td.white-day
      background-color: #ffffff

  .big-column
    min-width: 300px
    max-width: 300px
  td
    min-width: 30px
    text-align: center
    &:nth-child(1)
      text-align: left

</style>