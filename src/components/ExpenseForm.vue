<template>
  <div class="budget-form">
    <h2 class="text-capitalize mb-5">expense</h2>

    <v-text-field
      outlined
      clearable
      placeholder="Enter expense"
      color="#05668d"
      hide-details
      type="text"
      class="mb-3"
      v-model="expenseTitle"
    ></v-text-field>

    <v-text-field
      outlined
      clearable
      placeholder="Enter amount"
      color="#05668d"
      hide-details
      :prefix="currPrefix"
      type="number"
      v-model="expenseAmount"
    ></v-text-field>

    <v-btn class="mt-5" outlined color="#b80c09" block @click="submit">Submit</v-btn>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      selectedCurrency: "CHF",
      errors: {
        expenseTitle: false,
        expenseAmount: false
      },
      currencies: ["EUR", "CHF", "USD"],
      expenseTitle: "",
      expenseAmount: undefined,
      id: 0
    };
  },
  computed: {
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
  },
  methods: {
    submit() {
      if (this.expenseTitle !== "" && this.expenseAmount > 0) {
        this.$store.dispatch("addExpense", {
          id: this.id,
          title: this.expenseTitle,
          amount: this.expenseAmount
        });
        this.id++;
        this.expenseTitle = ""
        this.expenseAmount = undefined
      } else {
        if (this.expenseAmount <= 0) this.error.expenseAmount = true;
        if (this.expenseTitle === "") this.error.expenseTitle = true;
      }
    }
  },

};
</script>

<style scoped>
:root {
  --mainWhite: #f5f5f5f5;
  --mainDark: #333333;
  --mainGreen: #317b22;
  --mainRed: #b80c09;
  --mainBlue: #05668d;
}
.budget-form {
  border: 0.15rem solid #b80c09;
  padding: 1rem;
  border-radius: 0.25rem;
}
</style>