<template>
    <div class="title-action">
        <div v-if="can('create', 'products')" class="btn-group">
            <router-link to="new" class="btn btn-primary btn-sm" ><i class="fa fa-plus-circle"></i> New product</router-link>
        </div>
    </div>
</template>

<script>
    import permissions from "../../modules/mixins/Permissions";
    export default {
        name: "Actions",
        mixins : [permissions]
    }
</script>

<style scoped>

</style>