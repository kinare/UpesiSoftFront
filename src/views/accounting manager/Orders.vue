<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Orders</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('accounting/getSalesDocuments', `?orderType=${type}`)"></i>
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
                        <div class="ibox-content no-borders">
                            <sales-document/>
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
    import Spinner from "../../components/Spinner";
    import sales from "../../modules/mixins/sales";
    export default {
        name: "Orders",
        components: {Spinner},
        mixins : [sales],
        data : function () {
            return {
                type : 'ORDER',
                validator : window.validator
            }
        },
        methods : {
            openOrder : function (order) {
                this.$salesDoc.initDoc(order);
                // eslint-disable-next-line no-undef
                $("#orderCard").modal('show');
            },
        }
    }
</script>

<style scoped>

</style>
