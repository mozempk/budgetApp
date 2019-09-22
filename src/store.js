import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    incomes: [],
    expenses: [],
    balance: 0,
    selectedCurrency: 'CHF',
    currencies: ['CHF', 'EUR', 'USD'],
  },

  mutations: {
    COMPUTE_BALANCE: state => state.balance = state.incomes.reduce((acc,curr) => {
      return acc+curr.amount
    },0) - state.expenses.reduce((acc,curr) => {
      return acc+curr.amount
    },0),
    ADD_INCOME: (state, payload) => state.incomes.push(payload),
    ADD_EXPENSE: (state, payload) => state.expenses.push(payload),
    EDIT_INCOME: (state, payload) => {
      let to_edit = state.incomes.find((element) => {
        return element.id === payload.id
      }); // Retrieve previous element
      to_edit.title = payload.title; // Modify its title
      to_edit.amount = payload.amount; // Modify its amount
    },
    EDIT_EXPENSE: (state, payload) => {
      let to_edit = state.expenses.find((element) => {
        return element.id === payload.id
      }); // Retrieve previous element
      to_edit.title = payload.title;
      to_edit.amount = payload.amount;
    },
    CHANGE_CURRENCY: (state, payload) => state.selectedCurrency = payload,
    DELETE_INCOME: (state, payload) => state.incomes = state.incomes.filter((element) => {
      return element.id !== payload.id
    }),
    DELETE_EXPENSE: (state, payload) => state.expenses = state.expenses.filter((element) => {
      return element.id !== payload.id
    }),
  },

  actions: {
    addIncome({commit},payload){
      commit('ADD_INCOME',payload);
      commit('COMPUTE_BALANCE');
    },
    addExpense({commit},payload){
      commit('ADD_EXPENSE',payload);
      commit('COMPUTE_BALANCE');
    },
    editIncome({commit},payload){
      commit('EDIT_INCOME',payload);
      commit('COMPUTE_BALANCE');
    },
    editExpense({commit},payload){
      commit('EDIT_EXPENSE',payload);
      commit('COMPUTE_BALANCE');
    },
    deleteIncome({commit},payload){
      commit('DELETE_INCOME',payload);
      commit('COMPUTE_BALANCE');
    },
    deleteExpense({commit},payload){
      commit('DELETE_EXPENSE',payload);
      commit('COMPUTE_BALANCE');
    },
    changeCurrency({commit},payload){
      commit('CHANGE_CURRENCY',payload);
    },

  },

  getters: {
    incomes: state => state.incomes,
    expenses: state => state.expenses,
    balance: state => state.balance.toString(),
    selectedCurrency: state => state.selectedCurrency,
  }

})
