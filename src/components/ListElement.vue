<template>
<!-- v-bind:class="{green: inbound, red: !inbound}" -->
    <div>
        <v-row>
            <v-col cols="1">
                <slot name="sign"></slot>
            </v-col>
            <v-col cols="4">
                <slot name="title"></slot>
            </v-col>
            <v-col cols="3">
                <slot name="amount"></slot>
            </v-col>
            <v-col cols="2">
                <slot name="currency"></slot>
            </v-col>
            <v-col cols="1">
                <slot name="edit" :modify="modify"></slot>
            </v-col>
            <v-col cols="1">
                <slot name="delete" :erase="erase"></slot>
            </v-col>
        </v-row>       
    </div>
</template>

<script>
    export default {
        props: {
            inbound: Boolean,
            item: Object
        },
        data() {
            return {}
        },
        methods: {
            modify() {
                let payload = {
                    inbound: this.inbound,
                    item: this.item
                }
                this.$store.dispatch('setToEdit',payload)
            },
            erase() {
                if (this.inbound) {
                    this.$store.dispatch('deleteIncome',this.item)
                } else {
                    this.$store.dispatch('deleteExpense',this.item)
                }
            },
        }
    }
</script>

<style scoped>

.green {
  border: 0.15rem solid #317b22;
  padding: 1rem;
  border-radius: 0.25rem;
}

.red {
  border: 0.15rem solid #b80c09;
  padding: 1rem;
  border-radius: 0.25rem;
}

</style>