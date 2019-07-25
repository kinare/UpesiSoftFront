<template>
    <div class="container-fluid p-sm">
        <div class="col-lg-10 col-lg-push-1 col-xs-12">
            <div class="row">
                <div class="col-xs-3">
                    <a @click="freshSale" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
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
                                                       Ksh {{item.price}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Total</strong></td>
                                                    <td class="no-borders"><strong>Ksh {{receipt.total}}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Cash</strong></td>
                                                    <td class="no-borders"><strong>Ksh {{receipt.tenderedAmount}}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Change</strong></td>
                                                    <td class="no-borders"><strong>Ksh {{receipt.changeAmount}}</strong></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="hr-line-dashed"></div>
                                        <div class="pos-receipt-footer">
                                            <p> Served by : {{receipt.cashierLastName + ', ' + receipt.cashierPhoneNumber}} </p>
                                            <h3 class="text-center">Thank You</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4 ">
                    <div class="ibox-content pos-calc" style="border: none">
                        <div class="row">
                            <div class="col-xs-12">
                                <button @click="printDoc" class="btn btn-block btn-lg btn-white"><i class="fa fa-print"></i>  Print Receipt</button>
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
    import PosModule from "../../modules/store/pos/PosModule";
    const { state } = PosModule;
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
            freshSale : function () {
                // redirect to pos
                if (this.namespace !== ''){
                    //refresh store
                    this.$store.commit(`pos/${this.namespace}/RESET_STATE`, state)
                }
                this.$router.push('/pos')
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
</style>