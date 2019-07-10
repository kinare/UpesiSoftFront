<template>
    <router-view/>
</template>

<script>
    import inventory from '../../modules/store/inventory/store';
    export default {
        name: "InventoryManager",
        created() {
            if (!(this.$store && this.$store.state && this.$store.state["inventory"])) {
                    this.$store.registerModule('inventory', inventory)
            }
        }
    }
</script>

<style scoped>

</style>