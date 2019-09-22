<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="menu=!menu"></v-app-bar-nav-icon>
      <v-toolbar-title class=text-uppercase>Budget App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer clipped mobile-break-point="0" app v-model="menu">

      <v-list-item>
        <v-list-item-avatar>
          <v-img src="./assets/wallet.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-col>
            Select master currency
            <v-select 
            :items="currencies"
            return-object
            hint="Select master currency"
            persistent-hint
            prepend-icon="mdi-cash-multiple"
            v-model="selectedMasterCurency"
            @input="setMasterCurrency"
            />
          </v-col>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="pa-10">
        <v-row>
          <v-col cols="12" md="6">
            <Form inbound/>
          </v-col>
          <v-col cols="12" md="6">
            <Form v-bind:inbound="false"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
                <ListElement inbound v-for="income in incomes" v-bind:key="income.id" :item="income">
                  <template v-slot:sign>
                    <v-icon class="green-text">mdi-plus</v-icon>
                  </template>
                  <template v-slot:title>
                    {{income.title}}
                  </template>
                  <template v-slot:amount>
                    {{income.amount}}
                  </template>
                  <template v-slot:currency>
                    {{income.currency}}
                  </template>
                  <template v-slot:edit="{item,modify}">
                    <v-icon class="blue--text" @click="modify">mdi-pencil-outline</v-icon>
                  </template>
                  <template v-slot:delete="{item,erase}">
                    <v-icon class="red--text text--darken-2" @click="erase">mdi-delete</v-icon>
                  </template>
                </ListElement>
          </v-col>
          <v-col cols="12" md="6">
                <ListElement v-bind:inbound="false" v-for="expense in expenses" v-bind:key="expense.id">
                  <template v-slot:sign>
                    <v-icon class="red-text">mdi-minus</v-icon>
                  </template>
                  <template v-slot:title>
                    {{expense.title}}
                  </template>
                  <template v-slot:amount>
                    {{expense.amount}}
                  </template>
                  <template v-slot:currency>
                    {{expense.currency}}
                  </template>
                  <template v-slot:edit>
                    <v-icon class="blue--text">mdi-pencil-outline</v-icon>
                  </template>
                  <template v-slot:delete>
                    <v-icon class="red--text text--darken-2">mdi-delete</v-icon>
                  </template>
                </ListElement>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Form from './components/Form';
import ListElement from './components/ListElement';
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    Form,
    ListElement
  },
  data: () => ({
    menu:false,
    selectedMasterCurency: undefined
  }),
  computed: {
    ...mapGetters([
      'incomes',
      'expenses',
      'currencies',
      'selectedCurrency',
      'masterCurrency'
    ])
  },
  methods: {
    setMasterCurrency(){
      this.$store.dispatch('setMasterCurrency', this.currencies.indexOf(this.selectedMasterCurency))
    }
  },
  created() {
    this.selectedMasterCurency = this.currencies[this.masterCurrency]
  }
};

</script>

<style scoped>
.green-text {
  color: #317b22;
}
.red-text {
  color: #b80c09;
}
</style>
