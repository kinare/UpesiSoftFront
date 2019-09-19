<template>
    <page></page>
</template>

<script>
    import CompanyMgt from '../../modules/store/company/store';
    import Page from "../layout/Page";
    export default {
        name : "CompanyManager",
        components: {Page},
        created (){
            if(!this.$store._modules.root._children[`companyMgt`]) {
                this.$store.registerModule('companyMgt', CompanyMgt);
            }
        },

    }
</script>

<style scoped>

</style>
