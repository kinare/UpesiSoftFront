<template>
    <page></page>
</template>

<script>
    import userMgt from '../../modules/store/user/store';
    import Page from "../layout/Page";
    export default {
        name : "UserManager",
        components: {Page},
        created (){
            if (!(this.$store && this.$store.state && this.$store.state["inventory"])) {
                this.$store.registerModule('userMgt', userMgt);
            }
        },

    }
</script>

<style scoped>

</style>