<template>
    <h1>{{users}}</h1>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Users",
        computed : {
            ...mapState({
                users : state => state.userMgt.users
            }),
        }
    }
</script>

<style scoped>

</style>