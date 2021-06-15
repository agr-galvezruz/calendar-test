<template lang="pug">
  #calendar.flex-center-center
    table.calendar-container
      tr
        td.big-column EMPLEADOS
        td(v-for="day in calendar_data" :key="day.fecha" :class="getColor(day)") {{ day.fecha.toString().substr(day.fecha.toString().length - 2) }}

      tr
        td.no-data
        td(v-for="day in calendar_data" :key="day.fecha" :class="getColor(day)") {{ getDay(day.fecha) }}

      .employee-header EMPLEADOS

      tr(v-for="employee in employees")
        td.flex-center-space-between
          .flex-center
            .employee-name {{ employee.name }}
          .remaining-vacation-days {{ getRemainingDays(employee) }}

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
    },
    getDay(date) {
      return (date % 100)
    }
  }
}
</script>

<style lang="sass">

#calendar
  .calendar-container
    overflow: auto
    display: block

  table, td, tr
    border: 1px solid #eeeeee
    border-spacing: 0px

    tr
      min-width: 25px
      text-align: center
      margin-bottom: 2px
      .blue-day
        color: #ffffff
        background-color: #4473e2
      .red-day
        color: #ffffff
        background-color: #8e3430
      .yellow-day
        background-color: yellow
      .white-day
        background-color: #ffffff
      .months-header
        background-color: #eeeeee
        border: 1px solid #cccccc
        height: 30px
        padding: 0 10px

    td
      min-width: 25px
      height: 30px
      text-align: center
      &:nth-child(1)
        background-color: #ffffff
        min-width: 350px
        max-width: 350px
        position: sticky
        left: 0
        text-align: left
        padding: 0 10px
        border-color: #cccccc
        .remaining-vacation-days
          background-color: #69ac5b
          padding: 2px 4px
          color: #ffffff
        &::after
          content: ''
          position: absolute
          right: 0
          bottom: 0
          background-color: #444
          height: 30px
          padding: 0 1px

    td.no-data
      background-color: #ffffff
      border: 0px

    .employee-header
      background-color: #eeeeee
      border: 1px solid #cccccc
      width: 100%
      height: 30px
      position: sticky
      bottom: 0
      left: 0
      display: flex
      align-items: center
      padding: 0 10px

</style>