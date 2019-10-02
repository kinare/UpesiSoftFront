<template>
    <div class="row">
        <div class="col-md-12">
            <div class="ibox-content">
                <router-link to="/pricing" class="btn btn-white"><i class="fa fa-chevron-circle-left"></i> Back </router-link>
                <a class="btn pull-right btn-white"><i class="fa fa-print"></i> Print </a>
            </div>
        </div>
        <div class="col-md-12">
            <div class="ibox-content p-xl m-b-lg">
                <div class="row">
                    <div class="col-sm-6">
                        <h5>From:</h5>
                        <address>
                            <strong>Digital 4 Africa.</strong><br>
                            The Mirage Towers(Nairobi Garage), <br>
                            Chiromo Rd, Westlands, Nairobi<br>
                            0743830663<br>
                            hello@digital4africa.com<br>
                        </address>
                    </div>

                    <div class="col-sm-6 text-right">
                        <h4>Invoice No.</h4>
                        <h4 class="text-navy">INV-000567F7-00</h4>
                        <span>To:</span>
                        <address>
                            <strong>Corporate, Inc.</strong><br>
                            112 Street Avenu, 1080<br>
                            Miami, CT 445611<br>
                            <abbr title="Phone">P:</abbr> (120) 9000-4321
                        </address>
                        <p>
                            <span><strong>Invoice Date:</strong> {{new Date()}}</span><br>
                        </p>
                    </div>
                </div>

                <div class="table-responsive m-t">
                    <table class="table invoice-table">
                        <thead>
                        <tr>
                            <th>Plan</th>
                            <th>Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><div><strong>{{plan.paymentPlanName}}s</strong></div>
                                <small>{{plan.paymentPlanDescription}}</small></td>
                            <td>{{payment(plan.paymentPlanPeriods).paymentPlanPeriodPrice}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div><!-- /table-responsive -->

                <table class="table invoice-total">
                    <tbody>
                    <tr>
                        <td><strong>TOTAL :</strong></td>
                        <td>{{payment(plan.paymentPlanPeriods).paymentPlanPeriodPrice}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="text-right">
                    <router-link to="/pricing/checkout" class="btn btn-primary"><i class="fa fa-dollar"></i> Make A Payment</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "Invoice",
        data : function(){
            return {
               // business : window.auth.
            }
        },
        methods : {
            payment : function(payment){
                let self = this;
                // eslint-disable-next-line no-console
                console.log(payment)
                return payment.filter(pay => {
                    return pay.paymentPlanPeriodType === self.period
                }).shift();
            },
        },
        computed : {
            ...mapState({
                plan : state => state.selectedPlan.plan,
                period : state => state.selectedPlan.period,
                business : state => state.businessDetails
            })
        }
    }
</script>

<style scoped>

</style>
