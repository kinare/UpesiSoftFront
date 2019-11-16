<template>
    <div class="title-action">
        <div v-if="can('create', 'customers')" class="btn-group">
            <router-link to="customer/card" class="btn btn-primary btn-sm" ><i class="fa fa-plus-circle"></i> New Customer</router-link>
        </div>
    </div>
</template>

<script>
    import permissions from "../../modules/mixins/Permissions";

    export default {
        name: "Menu",
        mixins : [permissions]
    }
</script>

<style scoped>

</style>