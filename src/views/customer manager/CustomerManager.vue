<template>
    <Page></Page>
</template>

<script>
    import customer from '../../modules/store/customer/store';
    import Page from "../layout/Page";
    export default {
        name: "CustomerManager",
        components: {Page},
        created() {
            if(!this.$store._modules.root._children[`customer`]) {
                this.$store.registerModule('customer', customer)
            }
        }
    }
</script>

<style scoped>

</style>