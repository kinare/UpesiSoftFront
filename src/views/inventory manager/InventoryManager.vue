<template>
   <page></page>
</template>

<script>
    import inventory from '../../modules/store/inventory/store';
    import Page from "../layout/Page";
    export default {
        name: "InventoryManager",
        components: {Page},
        created() {
            if (!(this.$store && this.$store.state && this.$store.state["inventory"])) {
                    this.$store.registerModule('inventory', inventory)
            }
        }
    }
</script>

<style scoped>

</style>