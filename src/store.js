import Vue from 'vue'
import Vuex from 'vuex'
import CurrencyConversion from './services/currencyConversion'
const convert = new CurrencyConversion()
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    incomes: [],
    expenses: [],
    balance: 0,
    currencies: ['CHF', 'EUR', 'USD'],
//    selectedCurrency: 0,
    masterCurrency: 0,
    toEdit: undefined,
    exchangeRates: undefined,
    exchangeBaseCurrency: undefined
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
      }); // Retrieve original element
      to_edit.title = payload.title; // Modify its title
      to_edit.amount = payload.amount; // Modify its amount
      to_edit.currency = payload.currency; // Modify its currency
    },
    EDIT_EXPENSE: (state, payload) => {
      let to_edit = state.expenses.find((element) => {
        return element.id === payload.id
      }); // Retrieve original element
      to_edit.title = payload.title;
      to_edit.amount = payload.amount;
      to_edit.currency = payload.currency;
    },
//    CHANGE_CURRENCY: (state, payload) => state.selectedCurrency = payload,
    DELETE_INCOME: (state, payload) => state.incomes = state.incomes.filter((element) => {
      return element.id !== payload.id
    }),
    DELETE_EXPENSE: (state, payload) => state.expenses = state.expenses.filter((element) => {
      return element.id !== payload.id
    }),
    SET_MASTER_CURRENCY: (state,payload) => state.masterCurrency = payload,
    SET_TO_EDIT: (state,payload) => state.toEdit = payload,
    SET_EXCHANGE_RATES: (state, payload) => state.exchangeRates = payload,
    SET_EXCHANGE_BASE_CURRENCY: (state, payload) => state.exchangeBaseCurrency = payload
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
//    changeCurrency({commit},payload){
//      commit('CHANGE_CURRENCY',payload);
//    },
    setMasterCurrency({commit},payload){
      commit('SET_MASTER_CURRENCY',payload)
//      commit('CHANGE_CURRENCY',payload)
    },
    setToEdit({commit},payload){
      commit('SET_TO_EDIT',payload)
    },
    setExchangeRates({commit}){
      fetch('https://api.exchangeratesapi.io/latest')
        .then(data => {
          return data.json()
        })
        .then(json => {
          let payload = json.rates
          let base = json.base
          convert.setRates(payload)
          convert.setBase(payload)
          commit('SET_EXCHANGE_RATES',payload)
          commit('SET_EXCHANGE_BASE_CURRENCY',base)
        })
    },
  },

  getters: {
    incomes: state => state.incomes,
    expenses: state => state.expenses,
    balance: state => state.balance.toString(),
//    selectedCurrency: state => state.selectedCurrency,
    currencies: state => state.currencies,
    masterCurrency: state => state.masterCurrency,
    toEdit: state=>state.toEdit
  }

})
