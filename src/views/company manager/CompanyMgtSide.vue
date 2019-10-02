<template>
    <div>
       <side-link-back-action/>
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
    import SideLinkBackAction from "../../components/SideLinkBackAction";
    export default {
        name: "CompanyMgt",
        mixins : [permissions],
        components: {SideLinkBackAction, SideHeader}
    }
</script>

<style scoped>

</style>
