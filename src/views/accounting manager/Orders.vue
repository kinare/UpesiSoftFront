<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Orders</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('accounting/getDocuments', param)"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5">
                            <form>
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search order">
                                    <div class="input-group-btn">
                                        <a @click="term ='' "  class="btn btn-default" ><span class="fa fa-times"></span></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="table-responsive product-list">
                        <table class="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Items</th>
                                <th>Cashier</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(order, index) in filteredItems" v-bind:key="index" style="cursor: pointer" @click="openOrder(order)">
                                <td>{{index + 1}}</td>
                                <td>{{order.customerIsBusiness ? order.customerBusinessName : order.customerFirstName + ' ' + order.customerLastName}}</td>
                                <td>{{order.paymentMethod}}</td>
                                <td><span class="label" :class="order.orderStatus === 'PAID' ? 'label-success' : 'label-warning'">{{order.orderStatus}}</span></td>
                                <td>{{order.total | currency}}</td>
                                <td><span class="badge badge-inverse">{{order.orderItems.length}}</span> </td>
                                <td>{{order.cashierFirstName + ' ' + order.cashierLastName}}</td>
                                <td>{{order.createdAt}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(documents)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--document modal-->
        <div class="modal  in fade" id="orderCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Oder Card</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row" id="receipt">
                            <div class="col-xs-8 col-xs-push-2" >
                                <div class="row">
                                    <div class="pos-receipt" style="border:  1px solid #e7eaec;padding: 10px 20px;font-family:  monospace, sans-serif;line-height: 1;">
                                        <div class="pos-receipt-header">
                                            <h3 class="text-center"><strong>Focus Glass & Aluminium</strong></h3>
                                            <h5 class="text-center">
                                                Receipt No: {{selectedDocument.id}}<br>
                                                Date : {{selectedDocument.createdAt}}
                                            </h5>
                                            <p>Name : {{selectedDocument.customerIsBusiness ? selectedDocument.customerBusinessName : selectedDocument.customerFirstName + ' ' + selectedDocument.customerLastName}}</p>
                                            <p>Phone : {{selectedDocument.customerPhoneNumber}}</p>
                                            <p>Email : {{selectedDocument.customerEmail}}</p>
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
                                                <tr v-for="(item, index) in selectedDocument.orderItems" :key="index" >
                                                    <td class="no-borders">
                                                        {{item.productName}}
                                                    </td>
                                                    <td class="no-borders">
                                                        {{item.qty || 1}}
                                                    </td>
                                                    <td class="no-borders">
                                                        {{item.soldMeasurement ? item.soldMeasurement  : ''}}
                                                    </td>
                                                    <td class="no-borders">
                                                        {{item.price | currency}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Total</strong></td>
                                                    <td class="no-borders"><strong>{{selectedDocument.total | currency}}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Cash</strong></td>
                                                    <td class="no-borders"><strong>{{selectedDocument.tenderedAmount | currency}}</strong></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="no-borders"><strong>Change</strong></td>
                                                    <td class="no-borders"><strong>{{selectedDocument.changeAmount | currency}}</strong></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="hr-line-dashed"></div>
                                        <div class="pos-receipt-footer">
                                            <p> Served by : {{selectedDocument.cashierLastName + ', ' + selectedDocument.cashierPhoneNumber}} </p>
                                            <h3 class="text-center">Thank You</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Spinner from "../../components/Spinner";
    import filterItems from "../../modules/mixins/sales";
    export default {
        name: "Orders",
        components: {Spinner},
        mixins : [filterItems],
        data : function () {
            return {
                param : {
                    type : 'ORDER',
                },
                term : '',
                selectedDocument : {},
                validator : window.validator
            }
        },
        beforeRouteEnter(to, from, next){
          next(v =>{
              v.$store.dispatch('accounting/getDocuments', v.param);
          })
        },
        computed : {
            filteredOrders(){
                let self = this;
                return this.term === ''
                    ? this.orders
                    : this.orders.filter(order =>{
                        return order.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    })
            },

            measurmentAbbreviation(){return this.$store.getters['inventory/getMeasurmentAbbreviation']},
            ...mapState('accounting',{
                documents : state => state.orders,
                loading : state => state.loading,
                message : state => state.message,
                status : state => state.status,
            })
        },
        methods : {
            openOrder : function (order) {
                this.selectedDocument = order;
                // eslint-disable-next-line no-undef
                $("#orderCard").modal('show');
            },
        }
    }
</script>

<style scoped>

</style>