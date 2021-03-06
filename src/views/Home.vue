<template lang="pug">
  #calendar.flex-center-center
    table.calendar-container
      tr
        td.no-data
        td.months-header(v-for="(days, year_month_index) in date_info" :colspan="days") {{ getMonth(year_month_index) }}

      tr
        td.no-data
        td(v-for="day in calendar_data" :key="day.fecha" :class="getColor(day)") {{ getDay(day.fecha) }}

      .employee-header
        .header-box.flex-center-space-between
          .flex-center
            img.add-employee(src="@/icons/plus.png" width="20" @click="addNewEmployee()")
            .title EMPLEADOS
          .flex-center-space-between
            img.edit-employee(v-if="!actions" src="@/icons/settings.png" width="20" @click="switchEmployeesActions()")
            img.edit-employee(v-else src="@/icons/check.png" width="20" @click="switchEmployeesActions()")


      tr(v-for="(employee, index) in employees")
        td
          Employee(
            :employee="employee"
            :index_array="index"
            :max_free_days="max_free_days"
            :show_actions="actions"
            @saveEmployee="updateEmployeesOnLocalStore"
            @removeEmployee="removeEmployee")

        td(v-for="day in employee.fechas" :key="day.fecha")
          Day(v-model="day.tipoId" :day="day" :canSelectDay="canSelectDay(employee)" @input="changeVacationDaysSelected(employee)")
</template>

<script>
// Al ser un ejemplo, los datos json están guardados en '/data/calendario'
import CalendarData from '@/data/calendario'
import Day from '@/components/Day.vue'
import Employee from '@/components/Employee.vue'

export default {
  name: 'Home',
  created() {
    const local_storage_employees_data = this.$store.getters.getEmployeesList
    if (!local_storage_employees_data.length) {
      this.employees = this.employees.map(employee => {
        return {
          ...employee,
          fechas: JSON.parse(JSON.stringify(CalendarData.datos)),
          diasVacacionesSeleccionados: 0,
          editName: false
        }
      })
    } else this.employees = local_storage_employees_data

    this.getDateInfo()
  },
  components: {
    Day,
    Employee
  },
  data() {
    return {
      calendar_data: CalendarData.datos,
      date_info: [],
      max_free_days: 22,
      actions: false,
      employees: [
        { name: 'Antonio Gálvez Ruz' },
        { name: 'Alfonso Pérez Guzmán' }
      ]
    }
  },
  methods: {
    updateEmployeesOnLocalStore() {
      // Esto guarda el listado de empleados en el store de Vuex
      this.$store.dispatch('StoreEmployees', this.employees)
    },
    changeVacationDaysSelected(employee_data) {
      const vacation_days = employee_data.fechas.filter(fecha => fecha.tipoId === 'V').length
      employee_data.diasVacacionesSeleccionados = vacation_days

      this.updateEmployeesOnLocalStore()
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
    getDateInfo() {
      // Esta función cuenta los días por meses y los agrupa por años ya que el mes de febrero puede ser variable
      // y también contemplando la posibilidad de que no se pase un año completo, sino unos meses y fechas específicas

      // Array de fechas sin el día. Ej: [202101, 202102]
      const arr_year_months = this.calendar_data.map( ({ fecha }) => parseInt(fecha / 100) )

      // Agrupa por apariciones de cada mes pertenecientes a un año
      this.date_info = arr_year_months.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
    },
    getMonth(year_month_index) {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      return months[(year_month_index - 1) % 100]
    },
    getDay(date) {
      return (date % 100)
    },
    addNewEmployee() {
      const new_employee = {
        name: null,
        fechas: JSON.parse(JSON.stringify(CalendarData.datos)),
        diasVacacionesSeleccionados: 0,
        editName: true
      }
      // Comprueba que no haya algún empleado sin guardar antes de insertar uno más
      const editing_employees = this.employees.filter(employee => employee.editName)
      if (!editing_employees.length) this.employees.unshift(JSON.parse(JSON.stringify(new_employee)))
    },
    removeEmployee(index) {
      this.employees.splice(index, 1)
      this.updateEmployeesOnLocalStore()
    },
    switchEmployeesActions() {
      this.actions = !this.actions
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
      .header-box
        padding: 0 10px
        width: 350px
        .add-employee,.edit-employee
          width: 18px
          margin: 0 10px 0 0
          cursor: pointer
          transition: .3s
          &:hover
            opacity: 0.8
            transform: scale(1.2)
        .edit-employee
          margin: 6px

</style>