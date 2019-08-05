<template>
    <Page></Page>
</template>

<script>
    import accounting from '../../modules/store/accounting/store';
    import Page from "../layout/Page";
    export default {
        name: "AccountingManager",
        components: {Page},
        created() {
            if(!this.$store._modules.root._children[`accounting`]) {
                this.$store.registerModule('accounting', accounting)
            }
        }
    }
</script>

<style scoped>

</style>