<template>
    <div>
        <router-link to="/" class="btn btn-block btn-primary side-home" style="padding: 20px 25px;">
            <i class="fa fa-arrow-left"></i> &nbsp;&nbsp;{{appName}}</router-link>

        <ul class="nav metismenu" id="side-menu" style="">
        <side-header/>
        <li>
            <a ><i class="fa fa-users"></i> <span class="nav-label">Users</span></a>
        </li>
        <li>
            <a ><i class="fa fa-group"></i> <span class="nav-label">User Groups</span></a>
        </li>
        <li v-if="can('view', 'roles')">
            <a><i class="fa fa-unlock"></i> <span class="nav-label">Roles</span></a>
        </li>
    </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    import permissions from "../../modules/mixins/Permissions";
    export default {
        name: "IntegrationMgtSide",
        components: {SideHeader},
        mixins : [permissions],
        data : function () {
            return {
                scope : 'users'
            }
        }
    }
</script>

<style scoped>

</style>
