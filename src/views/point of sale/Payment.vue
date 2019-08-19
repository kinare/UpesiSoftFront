<template>
    <div class="container-fluid p-sm">
        <div class="col-lg-10 col-lg-push-1 col-xs-12">
            <div class="row">
                <div class="col-xs-3">
                    <a @click="$router.push('/pos')" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
                </div>
                <div class="col-xs-6">
                    <h2 class="text-center" style="margin-top: 10px">Payment</h2>
                </div>
                <div class="col-xs-3">
                    <a @click="receipt" :class="tendered >= getTotalSales && !validator.isEmptyObject(customer) ? '' : 'disabled'" class="btn btn-primary btn-lg pull-right">Post order <i class="fa fa-arrow-right"></i></a>
                </div>

            </div>
            <div class="hr-line-dashed"></div>
            <div class="ibox-content" :class="loading ? 'sk-loading' : ''" style="border: none; padding: 0;">
                <spinner v-if="loading"/>
                <div class="row">
                    <div class="col-xs-4">
                        <div class="row">
                            <div class=" col-xs-8 col-sm-push-4">
                                <button class="btn btn-lg  btn-block pull-right" :class="method === 'CASH' ? 'btn-primary' : 'btn-white'" @click="method = 'Cash'">Cash</button>
                                <button class="btn btn-lg  btn-block pull-right" :class="method === 'MPESA' ? 'btn-primary' : 'btn-white'" @click="method = 'Mpesa'">Mpesa</button>
                                <button class="btn btn-lg  btn-block pull-right" :class="method === 'VISA' ? 'btn-primary' : 'btn-white'" @click="method = 'Card'">Card</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 border-left">
                        <div class="row well" style="margin: 0 10px; font-family:  monospace, sans-serif;">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="due">Due</label>
                                    <input type="number" class="form-control" id="due"  v-model="getTotalSales" disabled>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="tendered">Tendered</label>
                                    <input type="number" class="form-control" id="tendered" v-model="tendered" autofocus>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="change">Change</label>
                                    <input type="number" class="form-control" id="change" v-model="change" disabled>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="change">Method</label>
                                    <select class="form-control" v-model="method">
                                        <option value="CASH">Cash</option>
                                        <option value="MPESA">Mpesa</option>
                                        <option value="VISA">Card</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12 text-right" style="margin-top: 20px;">
                                <table class="table invoice-total">
                                    <tbody>
                                    <tr>
                                        <td><strong>Paid :</strong></td>
                                        <td>Ksh {{tendered}}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Amount Due :</strong></td>
                                        <td>Ksh {{getTotalSales}}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Change :</strong></td>
                                        <td>Ksh {{change}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="hr-line-dashed"></div>

                        <div class="row">
                            <div class="col-xs-7">
                                <div class="ibox-content pos-calc" style="border: none">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="row no-pad">
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(1)">1</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(4)">4</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(7)">7</button>
                                                    <button class="btn btn-lg btn-warning btn-block" @click="unsetTendered">C</button>
                                                </div>
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(2)">2</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(5)">5</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(8)">8</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(0)">0</button>
                                                </div>
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(3)">3</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(6)">6</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered(9)">9</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="setTendered('.')">.</button>
                                                </div>
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block" @click="addTendered(10)">+10</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="addTendered(20)">+20</button>
                                                    <button class="btn btn-lg btn-white btn-block" @click="addTendered(50)">+50</button>
                                                    <button class="btn btn-lg btn-danger btn-block" @click="delTendered(1)"><i class="fa fa-backspace"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-5">
                                <div class="ibox-content" style="border: none">
                                    <div class="row">
                                        <div v-if="can('view', 'customers')" class="col-xs-12">
                                            <router-link to="/pos/customers" class="btn btn-block btn-lg btn-white"><i class="fa fa-user-alt"></i> {{!validator.isEmptyObject(customer)? customer.isBusiness ? customer.customerBusinessName : customer.customerFirstName : 'Select Customer'}}</router-link>
                                        </div>
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
    import Pos from "../../modules/store/pos/pos";
    import permissions from "../../modules/mixins/Permissions";
    const posController  = new Pos()
    export default {
        name: "Payment",
        components: {Spinner},
        mixins : [permissions],
        data : function(){
            return {
                validator : window.validator,
                namespace : '',
                tendered : 0,
                method : '',
                change : 0,
            }
        },
        beforeRouteEnter(to, from, next){
          next(v => {
              v.namespace = to.params.namespace;
              v.method = v.method === '' ? 'CASH' : v.method
              v.tendered = v.getTendered
          })
        },
        methods : {
            receipt : function () {

                //Get receipt if order is posted
                if (this.documentNo !== '')
                    this.$router.push(`/pos/receipt/${this.namespace}/${this.documentNo}`)

                //post order data
                this.$store.dispatch('pos/' + this.namespace + '/generateDocument',
                    posController.prepareDocument(
                        'ORDER',
                        this.customer,
                        this.items,
                        {
                            total : this.getTotalSales,
                            tendered : this.tendered,
                            change : this.change,
                            method : this.method
                        }
                    )
                );
            },
            setTendered : function (input) {
                this.tendered = parseInt(this.tendered.toString() + '' + input);
            },
            delTendered : function () {
                if (this.tendered.toString().length === 1){
                    this.tendered = 0
                } else {
                    this.tendered = parseInt(this.tendered.toString().slice(0, -1))
                }
            },
            unsetTendered : function () {
                this.tendered = 0
            },
            addTendered : function (input) {
                this.tendered = this.tendered + input
            }
        },
        computed : {
            items(){return this.$store.getters['pos/' +this.namespace + '/items']},
            loading(){return this.$store.getters['pos/' +this.namespace + '/loading']},
            getTotalSales(){return this.$store.getters['pos/' +this.namespace + '/totalSales']},
            payment(){return this.$store.getters['pos/' +this.namespace + '/payment']},
            customer(){return this.$store.getters['pos/' +this.namespace + '/customer']},
            documentNo(){return this.$store.getters['pos/' +this.namespace + '/documentNo']},
            getTendered(){return this.$store.getters['pos/' +this.namespace + '/tendered']},
        },
        watch : {
            tendered : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    let change = n - this.getTotalSales;
                    this.change =  change < 0 ? 0 : change

                    //persist tendered to store
                    this.$store.commit(`pos/${this.namespace}/SET_TENDERED`, n)
                }
            },
            documentNo : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    //redirect to receipt page after posting
                    if (n !== '' && o === ''){
                        this.$router.push(`/pos/receipt/${this.namespace}/${n}`)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    @media (max-width: 768px) {
        .pos-calc .btn {
            font-size:11px;
            /*padding:4px 6px;*/
        }
    }

    @media (min-width: 768px) {
        .pos-calc .btn {
            font-size:12px;
            /*padding:6px 12px;*/
        }
    }

    @media (min-width: 992px) {
        .pos-calc .btn {
            font-size:14px;
            /*padding:8px 12px;*/
        }

    }

    @media (min-width: 1200px) {
        .pos-calc .btn {
            /*padding:10px 16px;*/
            font-size:14px;
        }
    }
    .pos-calc{
        padding: 10px 20px;
    }
    .invoice-total > tbody > tr > td:last-child {
        border-bottom: 1px solid #DDDDDD;
        text-align: right;
        width: 30%!important;
    }
</style>