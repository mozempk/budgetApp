<template>
  <div class="budget-form">
    <h2 class="text-capitalize mb-5">income</h2>

    <v-text-field
      outlined
      clearable
      placeholder="Enter income source"
      color="#05668d"
      hide-details
      type="text"
      class="mb-3"
      v-model="incomeTitle"
    ></v-text-field>

    <v-text-field
      outlined
      clearable
      placeholder="Enter amount"
      color="#05668d"
      hide-details
      :prefix="currPrefix"
      type="number"
      class="mb-3"
      v-model="incomeAmount"
    ></v-text-field>

    <v-btn class="mt-5" outlined color="#317b22" block @click="submit">Submit</v-btn>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      selectedCurrency: "CHF",
      errors: {
        incomeTitle: false,
        incomeAmount: false
      },
      currencies: ["EUR", "CHF", "USD"],
      incomeTitle: "",
      incomeAmount: undefined,
      id:0,
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
      if (this.incomeTitle !== "" && this.incomeAmount > 0) {
        this.$store.dispatch("addIncome", {
          id: this.id,
          title: this.incomeTitle,
          amount: this.incomeAmount
        });
      this.id++;
      this.incomeTitle = ""
      this.incomeAmount = undefined
      } else {
        if (this.incomeAmount <= 0) this.error.incomeAmount = true;
        if (this.incomeTitle === "") this.error.incomeTitle = true;
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
  border: 0.15rem solid #317b22;
  padding: 1rem;
  border-radius: 0.25rem;
}
</style>