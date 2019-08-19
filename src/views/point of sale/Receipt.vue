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
                <div class="col-xs-8 border-right">
                    <div class="row" id="receipt">
                        <div class="col-xs-6 col-xs-push-3" >
                            <div class="ibox-content" :class="loading ? 'sk-loading' : ''" style="border: none; width : 340px " >
                                <spinner v-if="loading"/>
                                <div class="row">
                                    <div class="pos-receipt" v-if="!validator.isEmptyObject(receipt)" style="border:  1px solid #e7eaec;padding: 10px 20px;font-family:  monospace, sans-serif;line-height: 1;">
                                        <div class="pos-receipt-header">
                                            <h5 class="text-center">
                                                <strong>Focus Glass & Aluminium</strong><br>
                                                Receipt No: {{receipt.id}}<br>
                                                Date : {{receipt.createdAt}}
                                            </h5>
                                            <p>Name : {{receipt.customerIsBusiness ? receipt.customerBusinessName : receipt.customerFirstName + ' ' + receipt.customerLastName}}</p>
                                            <p>Phone : {{receipt.customerPhoneNumber}}</p>
                                            <p>Email : {{receipt.customerEmail}}</p>
                                        </div>
                                        <div class="hr-line-dashed"></div>
                                        <div class="pos-receipt-content">
                                            <table class="table small table-condensed">
                                                <thead>
                                                    <tr>
                                                        <th>Item</th>
                                                        <th>QTY</th>
                                                        <th>Unit</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(item, index) in receipt.orderItems" :key="index" >
                                                    <td class="no-borders">
                                                       {{item.productName}}
                                                    </td>
                                                    <td class="no-borders">
                                                        {{item.qty || 1}}
                                                    </td>
                                                    <td class="no-borders">
                                                       {{item.soldMeasurement ? item.soldMeasurement + ' ' + measurmentAbbreviation(item.measurementUnitId) : ''}}
                                                    </td>
                                                    <td class="no-borders">
                                                        {{item.price | currency}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Total</strong></td>
                                                    <td class="no-borders"><strong>{{receipt.total | currency}}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Cash</strong></td>
                                                    <td class="no-borders"><strong>{{receipt.tenderedAmount | currency}}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Change</strong></td>
                                                    <td class="no-borders"><strong>{{receipt.changeAmount | currency}}</strong></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="hr-line-dashed"></div>
                                        <div class="pos-receipt-footer">
                                            <h3 class="text-center">Thank You</h3>
                                            <p> Served by : {{receipt.cashierFirstName + ', ' + receipt.cashierLastName}} </p>
                                            <small class="text-center">
                                                Made by digital 4 Africa <br>
                                                www.digital4africa.com
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 ">
                    <div class="ibox-content" style="border: none">
                        <div class="row">
                            <div class="col-xs-12">
                                <button @click="printDoc" class="btn btn-block btn-lg btn-white"><i class="fa fa-print"></i>  Print Receipt</button>
                                <button @click="mailDoc" class="btn btn-block btn-lg btn-white"><i class="fa fa-envelope"></i>  Mail Receipt</button>
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
          }
        },
        methods : {
            printDoc : function () {
                this.$htmlToPaper('receipt');
            },

            mailDoc : function () {
                
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
              v.$store.dispatch(`pos/${v.namespace}/getDocument`, data);
          })
        },
        beforeRouteLeave(to, from, next){
            this.$store.commit(`pos/${this.namespace }/RESET_STATE`);
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