<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class=text-uppercase>Budget App</v-toolbar-title>
    </v-app-bar>

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
                <ListElement inbound v-for="income in incomes" v-bind:key="income.id">
                  <template v-slot:sign>
                    <v-icon class="green-text">mdi-plus</v-icon>
                  </template>
                  <template v-slot:title>
                    {{income.title}}
                  </template>
                  <template v-slot:amount>
                    {{income.amount}}
                  </template>
                  <template v-slot:edit>
                    <v-icon class="blue--text">mdi-pencil-outline</v-icon>
                  </template>
                  <template v-slot:delete>
                    <v-icon class="red--text text--darken-2">mdi-delete</v-icon>
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
    //
  }),
  computed: {
    ...mapGetters([
      'incomes',
      'expenses'
    ])
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
