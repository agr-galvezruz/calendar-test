import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function updateLocalStorage(employee_data) {
  localStorage.setItem('employees', JSON.stringify(employee_data))
}

export default new Vuex.Store({
  state: {
    employees: []
  },
  mutations: {
    SET_EMPLOYEES: (state, employees_data) => {
      state.employees = employees_data
      updateLocalStorage(state.employees)
    },
    UPDATE_EMPLOYEES_FROM_LOCAL_STORAGE: (state) => {
      const employees_data = localStorage.getItem('employees')
      if (employees_data) state.employees = JSON.parse(employees_data)
    }
  },
  actions: {
    StoreEmployees({ commit }, employees_data) {
      commit('SET_EMPLOYEES', employees_data)
    },
    UpdateEmployees({ commit }) {
      commit('UPDATE_EMPLOYEES_FROM_LOCAL_STORAGE')
    }
  },
  getters: {
    getEmployeesList(state) {
      return state.employees
    }
  }
})
