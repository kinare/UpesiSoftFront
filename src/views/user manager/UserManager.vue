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
            if(!this.$store._modules.root._children[`userMgt`]) {
                this.$store.registerModule('userMgt', userMgt);
            }
        },

    }
</script>

<style scoped>

</style>