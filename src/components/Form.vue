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
      :prefix="currPrefix"
      type="number"
      v-model="amount"
    ></v-text-field>

    <v-btn class="mt-5" outlined :color="color" block @click="submit">Submit</v-btn>
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
            }
        }
    },
    computed: {
        ...mapGetters([
            'currencies',
            'selectedCurrency'
        ]),
        currPrefix() {
            switch (this.selectedCurrency) {
                case "EUR":
                    return "€";
                case "CHF":
                    return "CHF";
                case "USD":
                    return "$";
                default:
                    return "€";
            }
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
            if (this.title !== "" && this.amount > 0) {
                let payload = {
                    id: this.id,
                    title: this.title,
                    amount: this.amount
                }
                this.inbound ? this.$store.dispatch("addIncome", payload) : this.$store.dispatch("addExpense", payload);
                this.id++;
                this.title = ""
                this.amount = undefined
            } else {
                if (this.amount <= 0) this.error.amount = true;
                if (this.title === "") this.error.title = true;
            }
        }
  },
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