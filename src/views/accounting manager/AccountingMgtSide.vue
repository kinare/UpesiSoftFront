<template>
    <ul class="nav metismenu" id="side-menu" style="">
        <side-header/>
        <li>
            <router-link  to="/dashboard/accounting-management/quotes"><i class="fa fa-file-invoice"></i> <span class="nav-label">Quotes</span></router-link>
        </li>
        <li>
            <router-link  to="/dashboard/accounting-management/invoice"><i class="fa fa-file-invoice-dollar"></i> <span class="nav-label">Invoice</span></router-link>
        </li>
        <li>
            <router-link  to="/dashboard/accounting-management/receipts"><i class="fa fa-receipt"></i> <span class="nav-label">Receipts</span></router-link>
        </li>
        <li>
            <router-link  to="/dashboard/accounting-management/orders"><i class="fa fa-cart-arrow-down"></i> <span class="nav-label">Orders</span></router-link>
        </li>
        <li>
            <router-link  to="/dashboard/accounting-management/sales"><i class="fa fa-wallet"></i> <span class="nav-label">Sales</span></router-link>
        </li>
    </ul>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    export default {
        name: "AccountingMgtSide",
        components: {SideHeader}
    }
</script>

<style scoped>

</style>