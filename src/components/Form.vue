<template>
  <div  v-bind:class="{ 'income': inbound, 'expense': !inbound }">
    <h2 class="text-capitalize mb-5">{{inbound ? "income" : "expense"}}</h2>

    <v-text-field
      outlined
      clearable
      :placeholder="placeholder"
      color="#05668d"
      hide-details
      type="text"
      class="mb-3"
      v-model="title"
    ></v-text-field>

    <v-text-field
      outlined
      clearable
      placeholder="Enter amount"
      color="#05668d"
      hide-details
      :suffix="suffix"
      type="number"
      v-model="amount"
      prepend-inner-icon="mdi-cash-multiple"
      @click:prepend-inner="changeCurrency"
    ></v-text-field>

    <v-btn class="mt-5" outlined :color="color" block @click="submit">{{editing ? "Edit" : "Submit"}}</v-btn>
  </div>  
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    props: {
        inbound: Boolean
    },
    data() {
        return {
            title: '',
            amount: undefined,
            id: 0,
            error: {
                amount: false,
                title: false
            },
            editing: false,
            currency: undefined,
            currencyIndex: 0
        }
    },
    computed: {
        ...mapGetters([
            'currencies',
            'toEdit',
            'masterCurrency'
        ]),
        suffix() {
            return this.currencies[this.currencyIndex]
        },
        placeholder() {
            if (this.inbound) return "Enter income"
            else return "Enter expense"
        },
        color() {
            if (this.inbound) return "#317b22"
            else return "#b80c09"
        }

    },
    methods: {
        submit() {
            if (!this.editing){
                if (this.title !== "" && this.amount > 0) {
                    let payload = {
                        id: this.id,
                        title: this.title,
                        amount: this.amount,
                        currency: this.currency
                    }
                    this.inbound ? this.$store.dispatch("addIncome", payload) : this.$store.dispatch("addExpense", payload);
                    this.id++;
                    this.title = ""
                    this.amount = undefined
                } else {
                    if (this.amount <= 0) this.error.amount = true;
                    if (this.title === "") this.error.title = true;
                }
            } else {
                let payload = {
                    id: this.toEdit.item.id,
                    title: this.title,
                    amount: this.amount,
                    currency: this.currency
                }
                this.inbound ? this.$store.dispatch('editIncome',payload) : this.$store.dispatch('editExpense',payload)
                this.$store.dispatch('setToEdit',undefined)
            }
        },
        changeCurrency() {
            this.currencyIndex = (this.currencyIndex+1)%(this.currencies.length)
            this.currency = this.currencies[this.currencyIndex]
        },
    },
    watch: {
        toEdit() {
            if (this.toEdit !== undefined){
                if (this.toEdit.inbound == this.inbound) {
                    this.editing = true
                    this.title = this.toEdit.item.title
                    this.amount = this.toEdit.item.amount
                    this.currency = this.toEdit.item.currency
//                    this.$store.dispatch('changeCurrency', this.currencies.indexOf(this.toEdit.item.currency))
                }
            } else {
                this.editing=false;
                this.title = "";
                this.amount = undefined
            }
        },
        masterCurrency() {
            this.currency = this.currencies[this.masterCurrency]
            this.currencyIndex = this.masterCurrency
        }
    },
    created() {
        this.currencyIndex = this.masterCurrency
        this.currency = this.currencies[this.currencyIndex]
    }
}
</script>

<style>
.expense {
  border: 0.15rem solid #b80c09;
  padding: 1rem;
  border-radius: 0.25rem;
}
.income {
  border: 0.15rem solid #317b22;
  padding: 1rem;
  border-radius: 0.25rem;
}
</style>