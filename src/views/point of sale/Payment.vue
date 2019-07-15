<template>
    <div class="container-fluid p-sm">
        <div class="col-lg-10 col-lg-push-1 col-xs-12">
            <div class="row">
                <div class="col-xs-3">
                    <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
                </div>
                <div class="col-xs-6">
                    <h2 class="text-center" style="margin-top: 10px">Payment</h2>
                </div>
                <div class="col-xs-3">
                    <a @click="receipt" :class="tendered === 0 ? 'disabled' : ''" class="btn btn-primary btn-lg pull-right">Validate <i class="fa fa-arrow-right"></i></a>
                </div>

            </div>
            <div class="hr-line-dashed"></div>
            <div class="ibox-content" :class="loading ? 'sk-loading' : ''" style="border: none; padding: 0;">
                <spinner v-if="loading"/>
                <div class="row">
                    <div class="col-xs-4">
                        <div class="row">
                            <div class=" col-xs-8 col-sm-push-4">
                                <button class="btn btn-lg btn-white btn-block pull-right" @click="method = 'Cash'">Cash</button>
                                <button class="btn btn-lg btn-white btn-block pull-right" @click="method = 'Mpesa'">Mpesa</button>
                                <button class="btn btn-lg btn-white btn-block pull-right" @click="method = 'Card'">Card</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-8 border-left">
                        <div class="row well" style="margin: 0 10px; font-family:  monospace, sans-serif;">
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="due">Due</label>
                                    <input type="number" class="form-control" id="due"  v-model="due" disabled>
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="tendered">Tendered</label>
                                    <input type="number" class="form-control" id="tendered" v-model="tendered">
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
                                        <option value="Cash">Cash</option>
                                        <option value="Mpesa">Mpesa</option>
                                        <option value="Card">Card</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xs-12 text-right" style="margin-top: 20px;">
                                <h2>Total : {{getTotalSales}} </h2>
                                <h2>Change : {{change}} </h2>
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
                                                    <button class="btn btn-lg btn-white btn-block">1</button>
                                                    <button class="btn btn-lg btn-white btn-block">4</button>
                                                    <button class="btn btn-lg btn-white btn-block">7</button>
                                                    <button class="btn btn-lg btn-white btn-block">C</button>
                                                </div>
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block">2</button>
                                                    <button class="btn btn-lg btn-white btn-block">5</button>
                                                    <button class="btn btn-lg btn-white btn-block">8</button>
                                                    <button class="btn btn-lg btn-white btn-block">0</button>
                                                </div>
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block">3</button>
                                                    <button class="btn btn-lg btn-white btn-block">6</button>
                                                    <button class="btn btn-lg btn-white btn-block">9</button>
                                                    <button class="btn btn-lg btn-white btn-block">.</button>
                                                </div>
                                                <div class="col-xs-3">
                                                    <button class="btn btn-lg btn-white btn-block">+10</button>
                                                    <button class="btn btn-lg btn-white btn-block">+20</button>
                                                    <button class="btn btn-lg btn-white btn-block">+50</button>
                                                    <button class="btn btn-lg btn-white btn-block">Del</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-5">
                                <div class="ibox-content pos-calc" style="border: none">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <router-link to="/pos/customers" class="btn btn-block btn-lg btn-white"><i class="fa fa-user-alt"></i> Customer</router-link>
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
    import { mapState, mapGetters } from 'vuex'
    import { mapFields } from 'vuex-map-fields'
    import Spinner from "../../components/Spinner";
    export default {
        name: "Payment",
        components: {Spinner},
        data : function(){
            return {

            }
        },
        beforeRouteEnter(to, from, next){
          next(v => {
              v.due = v.getTotalSales;
              v.change = v.tendered - v.getTotalSales;
          })
        },
        methods : {
          receipt : function () {
              let data = {
                  header : {
                      customer : this.customer,
                      total : this.due,
                      tendered : this.tendered,
                      change : this.change,
                      method : this.method,
                  },
                  lines : this.items
              };
              this.$store.dispatch('pos/generateReceipt', data);
              this.$router.push('/pos/receipt');
          }
        },
        computed : {
            ...mapState({
                items : state => state.pos.items,
                loading : state => state.pos.loading,
            }),
            ...mapGetters({
                getTotalSales : 'pos/totalSales',
            }),
            ...mapFields('pos', [
                'payment.tendered',
                'payment.due',
                'payment.change',
                'payment.method',
                'payment.customer',
            ])
        },
        watch : {
            tendered : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    this.change = n - this.due
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
</style>