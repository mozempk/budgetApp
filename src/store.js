import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    incomes: [],
    expenses: [],
    balance: 0
  },
  mutations: {
    COMPUTE_BALANCE: state => state.balance = state.incomes.reduce((acc,curr) => {
      return acc+curr.amount
    },0) - state.expenses.reduce((acc,curr) => {
      return acc+curr.amount
    },0),
    ADD_INCOME: (state, payload) => state.incomes.push(payload),
    ADD_EXPENSE: (state, payload) => state.expenses.push(payload)
  },
  actions: {
    /*updateBalance: ({commit}) => {
      commit('COMPUTE_BALANCE')
    },*/
    addIncome({commit},payload){
      commit('ADD_INCOME',payload);
      commit('COMPUTE_BALANCE');
    },
    addExpense({commit},payload){
      commit('ADD_EXPENSE',payload)
      commit('COMPUTE_BALANCE');
    }

  },
  getters: {
    incomes: state => state.incomes,
    expenses: state => state.expenses,
    balance: state => state.balance.toString(),
  }
})
