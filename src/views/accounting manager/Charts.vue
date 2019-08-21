<template>
    <div class="wrapper wrapper-content">

<!--        cards-->
        <div class="row">
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
<!--                        <span class="label label-success pull-right">Monthly</span>-->
                        <h5>Income</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{totalIncome | currency}}</h1>
                        <small class="text-info">{{documents.length}} Sales</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
<!--                        <span class="label label-info pull-right">Annual</span>-->
                        <h5>Orders</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{total('ORDER').total | currency}}</h1>
                        <small class="text-info">{{total('ORDER').count}} orders</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
<!--                        <span class="label label-primary pull-right">Today</span>-->
                        <h5>Invoices</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{total('INVOICE').total | currency}}</h1>
                        <small class="text-info">{{total('INVOICE').count}} Invoices</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
<!--                        <span class="label label-danger pull-right">Low value</span>-->
                        <h5>Quotations</h5>
                    </div>
                    <div class="ibox-content">
                        <h1 class="no-margins">{{total('QUOTE').total | currency}}</h1>
                        <small class="text-info">{{total('QUOTE').count}} Invoices</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>Summary</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-xs btn-white active">Today</button>
                                <button type="button" class="btn btn-xs btn-white">Weekly</button>
                                <button type="button" class="btn btn-xs btn-white">Monthly</button>
                                <button type="button" class="btn btn-xs btn-white">Annual</button>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <LineChart :data="data" :options="options"></LineChart>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Orders</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                                <button type="button" class="btn btn-xs btn-white active">Today</button>
                                <button type="button" class="btn btn-xs btn-white">Weekly</button>
                                <button type="button" class="btn btn-xs btn-white">Monthly</button>
                                <button type="button" class="btn btn-xs btn-white">Annual</button>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label">Customer</label>
                                    <input type="text" v-model="customer"   placeholder="Name" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label">Cashier</label>
                                    <input type="text" v-model="cashier" placeholder="Cashier" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label class="control-label" for="status">Status</label>
                                    <select v-model="type" name="status" id="status" class="form-control">
                                        <option value="ORDER" selected="">Order</option>
                                        <option value="INVOICE">Invoice</option>
                                        <option value="QUOTE">Quotation</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr class="hr-line-dashed">

                        <div class="table-responsive">
                            <table class="table table-hover table-striped table-condensed">
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
                                <tr v-for="(order, index) in filteredItems" v-bind:key="index" style="cursor: pointer">
                                    <td>{{index + 1}}</td>
                                    <td>{{order.customerIsBusiness ? order.customerBusinessName : order.customerFirstName + ' ' + order.customerLastName}}</td>
                                    <td>{{order.orderType}}</td>
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
            <div class="col-lg-4">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>User activities</h5>
                    </div>
                    <div class="ibox-content">
                        <table class="table table-hover no-margins">
                            <thead>
                            <tr>
                                <th>Status</th>
                                <th>Date</th>
                                <th>User</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><small>Pending...</small></td>
                                <td><i class="fa fa-clock-o"></i> 11:20pm</td>
                                <td>Samantha</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 24% </td>
                            </tr>
                            <tr>
                                <td><span class="label label-warning">Canceled</span> </td>
                                <td><i class="fa fa-clock-o"></i> 10:40am</td>
                                <td>Monica</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 66% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 01:30pm</td>
                                <td>John</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 54% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 02:20pm</td>
                                <td>Agnes</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 12% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 09:40pm</td>
                                <td>Janet</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 22% </td>
                            </tr>
                            <tr>
                                <td><span class="label label-primary">Completed</span> </td>
                                <td><i class="fa fa-clock-o"></i> 04:10am</td>
                                <td>Amelia</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 66% </td>
                            </tr>
                            <tr>
                                <td><small>Pending...</small> </td>
                                <td><i class="fa fa-clock-o"></i> 12:08am</td>
                                <td>Damian</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 23% </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LineChart from "../../modules/charts/LineChart";
    import sales from "../../modules/mixins/sales";
    export default {
        name: "Charts",
        components: {LineChart},
        mixins : [sales],
        data : function () {
            return {
                customer : '',
                cashier : '',
                type : '',

                data : {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'Orders',
                            borderColor: '#0091EA',
                            fill : false,
                            // backgroundColor : '#23c6c8',
                            data: [40, 39, 10, 40, 39, 80, 40, 52, 63 ,48, 77, 13]
                        },
                        {
                            label: 'Invoices',
                            borderColor: '#FF6D00',
                            fill : false,
                            // backgroundColor : '#23c6c8',
                            data: [20, 45, 12, 45, 34, 75, 34, 12, 47 ,86, 78, 12]
                        },
                        {
                            label: 'Quotes',
                            borderColor: '#AEEA00',
                            fill : false,
                            // backgroundColor : '#23c6c8',
                            data: [22, 35, 64, 85, 76, 14, 64, 75, 10 ,24, 43, 47]
                        }
                    ]
                },
                options : {responsive: true, maintainAspectRatio: false}
            }
        },
        watch : {
            customer : {
                handler : function (n, o) {
                    this.term = n
                }
            },
            cashier : {
                handler : function (n, o) {
                    this.term = n
                }
            },
            type : {
                handler : function (n, o) {
                    this.term = n
                }
            }
        }
    }
</script>

<style scoped>

</style>