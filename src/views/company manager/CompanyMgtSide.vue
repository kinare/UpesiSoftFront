<template>
    <div>
        <router-link to="/" class="btn btn-block btn-primary side-home" style="padding: 20px 25px;">
            <i class="fa fa-arrow-left"></i> &nbsp;&nbsp;{{appName}}
        </router-link>

        <ul class="nav metismenu" id="side-menu" style="">
            <side-header/>
        <li ><!--  todo enable company permission v-if="can('view', 'users')" -->
                <router-link to="/dashboard/company-management/companies"><i class="fa fa-building"></i> <span class="nav-label">Companies</span></router-link>
        </li>
        </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    import permissions from "../../modules/mixins/Permissions";
    export default {
        name: "CompanyMgt",
        mixins : [permissions],
        components: {SideHeader}
    }
</script>

<style scoped>

</style>
