<template>
    <div>
        <side-link-back-action/>
        <ul class="nav metismenu" id="side-menu" style="">
            <side-header/>
            <li>
                <router-link  to="/dashboard/accounting-management/stats"><i class="fa fa-chart-line"></i> <span class="nav-label">Summaries</span></router-link>
            </li>
            <li>
                <router-link  to="/dashboard/accounting-management/orders"><i class="fa fa-cart-arrow-down"></i> <span class="nav-label">Orders</span></router-link>
            </li>
            <li>
                <router-link  to="/dashboard/accounting-management/invoice"><i class="fa fa-file-invoice-dollar"></i> <span class="nav-label">Invoice</span></router-link>
            </li>
            <li>
                <router-link  to="/dashboard/accounting-management/quotes"><i class="fa fa-file-invoice"></i> <span class="nav-label">Quotes</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    import SideLinkBackAction from "../../components/SideLinkBackAction";
    export default {
        name: "AccountingMgtSide",
        components: {SideLinkBackAction, SideHeader}
    }
</script>

<style scoped>

</style>
