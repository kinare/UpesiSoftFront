<template>
    <ul class="nav metismenu" id="side-menu" style="">
        <side-header/>
        <li>
            <a href="layouts.html"><i class="fa fa-users"></i> <span class="nav-label">Users</span></a>
        </li>
        <li>
            <a href="layouts.html"><i class="fa fa-group"></i> <span class="nav-label">User Groups</span></a>
        </li>
        <li>
            <a href="layouts.html"><i class="fa fa-unlock"></i> <span class="nav-label">Roles</span></a>
        </li>
    </ul>
</template>

<script>
    import SideHeader from "../SideHeader";
    export default {
        name: "SupplierMgtSide",
        components: {SideHeader}
    }
</script>

<style scoped>

</style>