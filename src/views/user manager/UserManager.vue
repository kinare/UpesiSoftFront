<template>
    <router-view></router-view>
</template>

<script>
    import userMgt from '../../modules/store/user manager/store'
    export default {
        name : "UserManager",
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.registerModule('userMgt', userMgt)
            })
        },
    }
</script>

<style scoped>

</style>