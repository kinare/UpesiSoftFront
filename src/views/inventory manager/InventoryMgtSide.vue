<template>
    <div>
        <side-link-back-action/>
        <ul class="nav metismenu" id="side-menu" style="">
            <side-header/>
            <li v-if="can('view', 'products')">
                <router-link to="/dashboard/inventory-management/products"><i class="fa fa-list"></i> <span class="nav-label">Products</span></router-link>
            </li>
            <li v-if="can('view', 'categories')">
                <router-link to="/dashboard/inventory-management/categories"><i class="fa fa-tags"></i> <span class="nav-label">Categories</span></router-link>
            </li>
            <li v-if="can('create', 'products')">
                <router-link to="/dashboard/inventory-management/import"><i class="fa fa-file-import"></i> <span class="nav-label">Import</span></router-link>
            </li>
            <li v-if="can('view', 'products')">
                <router-link to="/dashboard/inventory-management/reports"><i class="fa fa-chart-line"></i> <span class="nav-label">Reports</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    import permissions from "../../modules/mixins/Permissions";
    import SideLinkBackAction from "../../components/SideLinkBackAction";
    export default {
        name: "InventoryMgtSide",
        components: {SideLinkBackAction, SideHeader},
        mixins : [permissions],
    }
</script>

<style scoped>

</style>
