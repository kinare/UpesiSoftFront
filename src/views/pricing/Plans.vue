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
                        <button class="btn" :class="periodType === 'monthly' ? 'btn-primary' : 'btn-white'" @click="periodType = 'monthly'" type="button">Monthly</button>
                        <button class="btn" :class="periodType === 'yearly' ? 'btn-primary' : 'btn-white'" @click="periodType = 'yearly'" type="button">Yearly</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="(plan, index) in plans" :key="index" class="col-lg-4 wow zoomIn animated" style="visibility: visible;">
                    <ul class="pricing-plan list-unstyled selected">
                        <li class="pricing-title text-uppercase">
                            {{plan.paymentPlanName}}
                        </li>
                        <li class="pricing-desc">
                            {{plan.paymentPlanDescription}}
                        </li>
                        <li class="pricing-price">
                            <span>{{payment(plan.paymentPlanPeriods).paymentPlanPeriodPrice | currency}}</span> / {{ payment(plan.paymentPlanPeriods).paymentPlanPeriodName}}
                        </li>
                        <li v-for="(feature, index) in plan.paymentPlanFeatures" :key="index">
                            {{feature.paymentPlanFeatureName}}
                        </li>
                        <li class="plan-action">
                            <a @click="selectPlan(plan)"  class="btn btn-primary btn-block">Select</a>
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
        data : function(){
          return {
              periodType : 'yearly',
          };
        },
        computed : {
            ...mapState({
                loading : state => state.loading,
                plans : state => state.plans
            })
        },
        methods : {
            payment : function(payment){
                let self = this;
                // eslint-disable-next-line no-console
                console.log(payment)
                return payment.filter(pay => {
                    return pay.paymentPlanPeriodType === self.periodType
                }).shift();
            },

            selectPlan : function (plan) {
                let data = {
                    plan : plan,
                    period : this.periodType
                };

                this.$store.commit('SELECT_PLAN', data);
                this.$router.push('/pricing/invoice');
            }
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
