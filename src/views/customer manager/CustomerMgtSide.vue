<template>
    <div>
        <side-link-back-action/>
        <ul class="nav metismenu" id="side-menu" style="">
            <side-header/>
            <li>
                <router-link  to="/dashboard/customer-management/customer"><i class="fa fa-users"></i> <span class="nav-label">customer</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    import SideLinkBackAction from "../../components/SideLinkBackAction";
    export default {
        name: "CustomerMgtSide",
        components: {SideLinkBackAction, SideHeader}
    }
</script>

<style scoped>

</style>
