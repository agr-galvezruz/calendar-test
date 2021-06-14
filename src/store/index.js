import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: []
  },
  mutations: {
    SET_EMPLOYEES: (state, employees_data) => {
      state.employees = employees_data
    }
  },
  actions: {
    StoreEmployees({ commit }, employees_data) {
      commit('SET_EMPLOYEES', employees_data)
    }
  },
  getters: {
    employeesList(state) {
      return state.employees
    },
  }
})
