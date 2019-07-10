<template>
    <router-view></router-view>
</template>

<script>
    import userMgt from '../../modules/store/user/store';
    export default {
        name : "UserManager",
        created (){
            if (!(this.$store && this.$store.state && this.$store.state["inventory"])) {
                this.$store.registerModule('userMgt', userMgt);
            }
        },

    }
</script>

<style scoped>

</style>