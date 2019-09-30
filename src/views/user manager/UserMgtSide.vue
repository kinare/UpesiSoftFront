<template>
    <div>
        <side-link-back-action/>
        <ul class="nav metismenu" id="side-menu" style="">
            <side-header/>
            <li v-if="can('view', 'users')">
                <router-link to="/dashboard/user-management/users"><i class="fa fa-users"></i> <span class="nav-label">Users</span></router-link>
            </li>
<!--            <li>-->
<!--                <router-link to="/dashboard/user-management/groups"><i class="fa fa-users"></i> <span class="nav-label">Groups</span></router-link>-->
<!--            </li>-->
            <li v-if="can('view', 'roles')">
                <router-link to="/dashboard/user-management/roles"><i class="fa fa-users-cog"></i> <span class="nav-label">Roles</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    import permissions from "../../modules/mixins/Permissions";
    import SideLinkBackAction from "../../components/SideLinkBackAction";
    export default {
        name: "UserMgt",
        mixins : [permissions],
        components: {SideLinkBackAction, SideHeader}
    }
</script>

<style scoped>

</style>
