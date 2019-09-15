<template>
<!-- v-bind:class="{green: inbound, red: !inbound}" -->
    <div>
        <v-row>
            <v-col cols="1">
                <slot name="sign"></slot>
            </v-col>
            <v-col cols="5">
                <slot name="title"></slot>
            </v-col>
            <v-col cols="50">
                <slot name="amount"></slot>
            </v-col>
            <v-col cols="1">
                <slot name="edit"></slot>
            </v-col>
            <v-col cols="1">
                <slot name="delete"></slot>
            </v-col>
        </v-row>       
    </div>
</template>

<script>
    export default {
        props: {
            inbound: Boolean
        },
        data() {
            return {}
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