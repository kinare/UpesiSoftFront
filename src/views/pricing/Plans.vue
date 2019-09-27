<template>
    <section id="pricing" class="pricing">
        <div class="container">
            <div class="row m-b-lg">
                <div class="col-lg-12 text-center">
                    <h1>Pricing</h1>
                    <p>Select a plan suitable for your business</p>
                </div>
                <div class="col-lg-8 col-lg-offset-2 text-center m-t-xs">
                    <div class="btn-group">
                        <button class="btn btn-primary" type="button">Monthly</button>
                        <button class="btn btn-white" type="button">Yearly</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 wow zoomIn animated" style="visibility: visible;">
                    <ul class="pricing-plan list-unstyled selected">
                        <li class="pricing-title">
                            STARTER
                        </li>
                        <li class="pricing-desc">
                            Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus.
                        </li>
                        <li class="pricing-price">
                            <span>{{2000 | currency}}</span> / month
                        </li>
                        <li>
                            POS
                        </li>
                        <li>
                            Inventory
                        </li>
                        <li>
                            Accounting
                        </li>
                        <li>
                            User Management
                        </li>
                        <li>
                            Notification
                        </li>
                        <li class="plan-action">
                            <router-link to="/pricing/invoice" class="btn btn-primary btn-block">Select</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-4 wow zoomIn animated" style="visibility: visible;">
                    <ul class="pricing-plan list-unstyled selected">
                        <li class="pricing-title">
                            PROFESSIONAL
                        </li>
                        <li class="pricing-desc">
                            Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus.
                        </li>
                        <li class="pricing-price">
                            <span>{{4000 | currency}}</span> / month
                        </li>
                        <li>
                            POS
                        </li>
                        <li>
                            Inventory
                        </li>
                        <li>
                            Accounting
                        </li>
                        <li>
                            Payments
                        </li>
                        <li>
                            User Management
                        </li>
                        <li>
                           Reporting
                        </li>
                        <li>
                            Multi store
                        </li>
                        <li>
                            Reporting
                        </li>
                        <li class="plan-action">
                            <router-link to="/pricing/invoice" class="btn btn-primary btn-block">Select</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-4 wow zoomIn animated" style="visibility: visible;">
                    <ul class="pricing-plan list-unstyled selected">
                        <li class="pricing-title">
                            ENTERPRISE
                        </li>
                        <li class="pricing-desc">
                            Lorem ipsum dolor sit amet, illum fastidii dissentias quo ne. Sea ne sint animal iisque, nam an soluta sensibus.
                        </li>
                        <li class="pricing-price">
                            <span>{{8000 | currency}}</span> / month
                        </li>
                        <li>
                            POS
                        </li>
                        <li>
                            Inventory
                        </li>
                        <li>
                            Accounting
                        </li>
                        <li>
                            Payments
                        </li>
                        <li>
                            User Management
                        </li>
                        <li>
                            Reporting
                        </li>
                        <li>
                            Multi store
                        </li>
                        <li>
                            Reporting
                        </li>
                        <li>
                            Web Integration
                        </li>
                        <li class="plan-action">
                            <router-link to="/pricing/invoice" class="btn btn-primary btn-block">Select</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row m-t-lg">
                <div class="col-lg-8 col-lg-offset-2 text-center m-t-lg">
                   <p>Some text here</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "Plans",
        computed : {
            ...mapState({
                loading : state => state.loading,
                plans : state => state.plans
            })
        }
    }
</script>

<style scoped>
    .landing-page .pricing-plan {
        background-color: white;
    }
    .landing-page .btn-primary {
        background-color: #1b75bb;
        border-color: #1f90d8;
        color: #FFFFFF;
        font-size: 14px;
         padding: 6px 12px;
        font-weight: 600;
    }
    .landing-page .pricing-plan:hover{
        -webkit-box-shadow: 2px 3px 17px -7px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 3px 17px -7px rgba(0,0,0,0.75);
        box-shadow: 2px 3px 17px -7px rgba(0,0,0,0.75);    }
</style>
