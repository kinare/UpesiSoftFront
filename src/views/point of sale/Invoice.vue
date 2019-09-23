<template>
    <div class="col-xs-10 col-xs-push-1 m-b-md m-t-md">
        <div class="row">
            <div class="col-xs-3">
                <a @click="$router.push('/pos')" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
            </div>
            <div class="col-xs-6">
                <h2 class="text-center" style="margin-top: 10px">Invoice</h2>
            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="row">
            <div class="col-xs-8" >
                <div class="ibox-content p-xl pos-invoice style-1" :class="loading ? 'sk-loading' : ''" style="height: 80vh; overflow-y: scroll" id="invoice">
                    <spinner v-if="loading"/>
                    <sales-document  :document="invoice" v-if="!validator.isEmptyObject(invoice)"/>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="row">
                        <div class="col-xs-12">
                            <button @click="printDoc" class="btn btn-block btn-lg btn-default"><i class="fa fa-print"></i> Print Invoice</button>
                            <button @click="mailDoc" class="btn btn-block btn-lg btn-default"><i class="fa fa-envelope"></i> Email Invoice</button>
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
        name: "Invoice",
        components: {Spinner},
        data : function(){
            return {
                namespace : '',
                validator : window.validator,
                helper : window.helper
            }
        },
        beforeRouteEnter(to, from, next){
            next(v =>{
                v.namespace = to.params.namespace;

                //set customer if not set
                if (!v.document.customerId){
                    v.document.customerId = v.customer.id;
                    v.document.customerDetails  = JSON.stringify(v.customer);
                }

                //post invoice
                v.$store.dispatch(`pos/${v.namespace}/generateDocument`, v.document);
            })
        },
        beforeRouteLeave(to, from, next){
            this.$store.commit(`pos/${this.namespace }/RESET_STATE`);
            this.$store.dispatch('inventory/getProducts');

            next();
        },

        methods : {
            printDoc : function () {
                this.$htmlToPaper('invoice');
            },

            mailDoc : function () {
                //todo Mail invoice to customer
            }
        },
        computed : {
            invoice(){return this.$store.getters[`pos/${this.namespace }/invoice`]},
            document(){return this.$store.getters[`pos/${this.namespace }/document`]},
            customer(){return this.$store.getters[`pos/${this.namespace }/customer`]},
            loading(){return this.$store.getters[`pos/${this.namespace }/loading`]},
            documentNo(){return this.$store.getters[`pos/${this.namespace }/documentNo`]},
            measurmentAbbreviation(){return this.$store.getters['inventory/getMeasurmentAbbreviation']},
        },
        watch : {
            documentNo : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    if (n){
                        let data = {
                            type : this.document.orderType,
                            id : n,
                            status : this.document.orderStatus,
                        }

                        this.$store.dispatch(`pos/${this.namespace}/getDocument`, data);
                    }
                }
            }
        }
    }
</script>

<style scoped></style>
