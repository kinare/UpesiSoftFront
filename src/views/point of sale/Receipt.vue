<template>
    <div class="container-fluid p-sm">
        <div class="col-lg-10 col-lg-push-1 col-xs-12">
            <div class="row">
                <div class="col-xs-3">
                    <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
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
                            <div class="ibox-content" style="border: none; width : 340px " >
                                <div class="row">
                                    <div class="pos-receipt" style="border:  1px solid #e7eaec;padding: 10px 20px;font-family:  monospace, sans-serif;line-height: 1;">
                                        <div class="pos-receipt-header">
                                            <h5 class="text-center">
                                                Receipt No: 000215<br>
                                                Date : 07/05/2019 13 : 12 : 22
                                            </h5>
                                            <p>Name : Michael Kamau</p>
                                            <p>Phone : 0708338855</p>
                                            <p>Email : michaelkinare@gmil.com</p>
                                        </div>
                                        <div class="hr-line-dashed"></div>
                                        <div class="pos-receipt-content">
                                            <p v-for="(item, index) in items" :key="index">{{item.productName}} <span class="pull-right"> &nbsp; &nbsp; {{item.price}}</span></p>

                                            <br>
                                            <p>Sub total <span class="pull-right">Ksh {{getTotalSales}}</span></p>
                                            <h4>Total <span class="pull-right">Ksh {{getTotalSales}}</span></h4>
                                            <br>
                                            <p>Cash <span class="pull-right">Ksh {{payment.due}}</span></p>
                                            <p>Change <span class="pull-right">Ksh {{payment.change}}</span></p>
                                        </div>
                                        <div class="hr-line-dashed"></div>
                                        <div class="pos-receipt-footer">
                                            <p> Served by : Agnes </p>
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
    import { mapState, mapGetters } from 'vuex'
    export default {
        name: "Receipt",
        methods : {
            printDoc : function () {
                this.$htmlToPaper('receipt');
            }
        },
        computed : {
            ...mapState({
                items : state => state.pos.items,
                payment : state => state.pos.payment,
            }),
            ...mapGetters({
                getTotalSales : 'pos/totalSales',
            }),
        },
    }
</script>

<style scoped>
    .pos-receipt{
        border:  1px solid #e7eaec;
        padding: 10px 20px;
        font-family:  monospace, sans-serif;
        line-height: 1;
    }
</style>