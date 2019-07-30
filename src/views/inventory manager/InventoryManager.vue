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
           if(!this.$store._modules.root._children[`inventory`]) {
              this.$store.registerModule('inventory', inventory)
           }
        }
    }
</script>

<style scoped>

</style>