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
                <div class="ibox-content p-xl pos-invoice" :class="loading ? 'sk-loading' : ''" style="height: 80vh; overflow-x: scroll" id="invoice">
                    <spinner v-if="loading"/>
                    <div v-if="!validator.isEmptyObject(invoice)">
                        <div class="row">
                            <h2 class="text-center"><strong>Invoice</strong></h2>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <h5>From:<br>
                                    <strong>Focus Glass & Aluminium</strong>
                                </h5>
                                <address>
                                    {{invoice.cashierFirstName + ' ' + invoice.cashierLastName}}<br>
                                    {{invoice.cashierEmail}}<br>
                                </address>
                            </div>

                            <div class="col-sm-6 text-right">
                                <h4>Invoice No. {{invoice.id}}</h4>
                                <span>To:</span>
                                <address>
                                    <strong>{{invoice.customerIsBusiness ? invoice.customerBusinessName : invoice.customerFirstName + ' ' + invoice.customerLastName}}</strong><br>
                                    +{{invoice.customerCountryCode + invoice.customerPhoneNumber}}<br>
                                    {{invoice.customerEmail}}<br>
                                    {{invoice.customerPostalAddress}}
                                </address>
                                <p>
                                    <span><strong>Invoice Date:</strong> {{invoice.createdAt}}</span><br>
                                    <!--                                <span><strong>Due Date:</strong> March 24, 2014</span>-->
                                </p>
                            </div>
                        </div>
                        <div class="table-responsive m-t">
                            <table class="table invoice-table">
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>QTY</th>
                                    <th>Unit</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in invoice.orderItems" :key="index">

                                    <td>{{item.productName}}</td>
                                    <td>{{item.qty || 1}}</td>
                                    <td>{{item.soldMeasurement ? item.soldMeasurement + ' ' + measurmentAbbreviation(item.measurementUnitId) : ''}}</td>
                                    <td>Ksh {{item.price}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div><!-- /table-responsive -->
                        <table class="table invoice-total">
                            <tbody>
                            <tr>
                                <td><strong>Total :</strong></td>
                                <td>{{invoice.total}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
            this.$store.commit(`pos/${this.namespace }/SET_DOC_NO`, '');
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
            measurmentAbbreviation(){return this.$store.getters['inventory/getMeasurmentAbbreviation']},        },
        watch : {
            documentNo : {
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

<style scoped>
    .pos-invoice{
        border:  1px solid #e7eaec;padding: 10px 20px;
    }
</style>