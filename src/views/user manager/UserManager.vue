<template>
    <router-view></router-view>
</template>

<script>
    import userMgt from '../../modules/store/user/store';
    export default {
        name : "UserManager",
        created (){
            this.$store.registerModule('userMgt', userMgt)
        },

    }
</script>

<style scoped>

</style>