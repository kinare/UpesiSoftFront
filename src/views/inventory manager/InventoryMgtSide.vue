<template>
    <ul class="nav metismenu" id="side-menu" style="">
        <side-header/>
        <li>
            <router-link to="/dashboard/inventory-management/products"><i class="fa fa-list"></i> <span class="nav-label">Product</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/inventory-management/categories"><i class="fa fa-tags"></i> <span class="nav-label">Categories</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/inventory-management/import"><i class="fa fa-file-import"></i> <span class="nav-label">Import</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/inventory-management/reports"><i class="fa fa-chart-line"></i> <span class="nav-label">Reports</span></router-link>
        </li>
    </ul>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    export default {
        name: "InventoryMgtSide",
        components: {SideHeader}
    }
</script>

<style scoped>

</style>