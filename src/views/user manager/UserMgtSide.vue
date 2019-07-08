<template>
    <ul class="nav metismenu" id="side-menu" style="">
        <side-header/>
        <li>
            <router-link to="/dashboard/user-management/users"><i class="fa fa-users"></i> <span class="nav-label">Users</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/user-management/groups"><i class="fa fa-users"></i> <span class="nav-label">Groups</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/user-management/roles"><i class="fa fa-users"></i> <span class="nav-label">Roles</span></router-link>
        </li>
    </ul>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    export default {
        name: "UserMgt",
        components: {SideHeader}
    }
</script>

<style scoped>

</style>