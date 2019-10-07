<template>
    <div class="container-fluid p-sm">
        <div class="col-lg-10 col-lg-push-1 col-xs-12">
            <div class="row">
                <div class="col-xs-3">
                    <router-link to="/pos" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </router-link>
                </div>
                <div class="col-xs-6">
                    <h2 class="text-center" style="margin-top: 10px">Receipt</h2>
                </div>
            </div>
            <div class="hr-line-dashed"></div>
            <div class="row">
                <div class="col-xs-7 border-right">
                    <div class="row" id="receipt">
                        <div class="col-xs-10 col-xs-push-1" >
                            <div class="ibox-content" :class="loading ? 'sk-loading' : ''" style="border: none; width : 340px " >
                                <spinner v-if="loading"/>
                                <sales-document  :document="receipt" v-if="!validator.isEmptyObject(receipt)"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-5 ">
                    <div class="ibox-content" style="border: none">
                        <div class="row">
                            <div class="col-xs-12">
                                <button @click="printDoc" class="btn btn-block btn-lg btn-primary"><i class="fa fa-print"></i>  Print Receipt</button>

                                <div class="input-group input-group-lg m-t">
                                    <input class="form-control" v-model="email">
                                    <div class="input-group-btn" >
                                        <button @click="mailDoc" class="btn btn-lg btn-primary" type="button"><i class="fa fa-envelope"></i> Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "../../components/Spinner";
    export default {
        name: "Receipt",
        components: {Spinner},
        data : function(){
          return{
              validator : window.validator,
              namespace : '',
              orderId : '',
              email : ''
          }
        },
        methods : {
            printDoc : function () {
                this.$htmlToPaper('receipt');
            },

            mailDoc : function () {
                // customerEmail

                let data = {
                    orderId : this.receipt.id ,
                    customerEmail : this.email
                }
                this.$store.dispatch(`pos/${this.namespace}/mailDoc`, data);
            }
        },
        beforeRouteEnter(to, from, next){
          next(v =>{
              v.namespace = to.params.namespace;
              v.orderId = to.params.orderId
              let data = {
                  type : 'ORDER',
                  id : v.orderId,
                  status : 'PAID',
              }

              v.email = v.customer.customerEmail;
              v.$store.dispatch(`pos/${v.namespace}/getDocument`, data);
          })
        },
        beforeRouteLeave(to, from, next){
            this.$store.commit(`pos/${this.namespace }/RESET_STATE`);
            this.$store.dispatch('inventory/getProducts');
            next();
        },
        computed : {
            receipt(){return this.$store.getters[`pos/${this.namespace }/receipt`]},
            loading(){return this.$store.getters[`pos/${this.namespace }/loading`]},
            measurmentAbbreviation(){return this.$store.getters['inventory/getMeasurmentAbbreviation']},
        },
    }
</script>

<style scoped>
    .pos-receipt{
        border:  1px solid #e7eaec;
        padding: 10px 20px;
        font-family:  monospace, sans-serif;
        font-size: 12px;
        line-height: 1;
    }
    .pos-receipt-footer{
        text-align: center;
    }
</style>
