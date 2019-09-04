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
                        <small class="text-info">{{total('QUOTE').count}} Quotes</small>
                    </div>
                </div>
            </div>
        </div>

<!--        chart-->
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>Summary</h5>
                        <div class="pull-right">
                            <div class="btn-group">
                                <button type="button" :class="selected === 1 ? 'btn-primary' : 'btn-white'" @click="getByTime('day'); selected = 1" class="btn btn-xs ">Today</button>
                                <button type="button" :class="selected === 2 ? 'btn-primary' : 'btn-white'" @click="getByTime('week'); selected = 2" class="btn btn-xs">Weekly</button>
                                <button type="button" :class="selected === 3 ? 'btn-primary' : 'btn-white'" @click="getByTime('month'); selected = 3" class="btn btn-xs">Monthly</button>
                                <button type="button" :class="selected === 4 ? 'btn-primary' : 'btn-white'" @click="getByTime('year'); selected = 4" class="btn btn-xs ">Annually</button>
                            </div>

                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row m-b">
                           <div class="col-xs-12">
                               <div class="form-group pull-right">
                                   <datepicker confirm type="datetime" format="YYYY-MM-DD HH:mm:ss" v-model="dateRange" input-class="form-control " range lang="en" ></datepicker>
                               </div>
                           </div>
                        </div>
                        <LineChart :data="chartData" :options="options"></LineChart>
                    </div>
                </div>
            </div>
        </div>

<!--        orders-->
        <div class="row">
            <div class="col-lg-8">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Orders</h5>
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
    import datepicker from "vue2-datepicker";
    import moment from "moment/moment";
    export default {
        name: "Charts",
        components: {LineChart, datepicker},
        mixins : [sales],
        data : function () {
            return {
                dateRange : [],
                selected : 0,
                customer : '',
                cashier : '',
                type : '',
                params : {
                    from : '',
                    to : ''
                },
                period : '',
            }
        },
        computed : {
            options(){
                return  {responsive: true, maintainAspectRatio: false}
            },
            chartData(){
                return {
                    labels: this.setLabels,
                    datasets: [
                        {
                            label: 'Orders',
                            borderColor: '#0091EA',
                            fill : false,
                            data: this.setPlotData(this.total('ORDER').documents)
                        },
                        {
                            label: 'Invoices',
                            borderColor: '#FF6D00',
                            fill : false,
                            data: this.setPlotData(this.total('INVOICE').documents)
                        },
                        {
                            label: 'Quotes',
                            borderColor: '#AEEA00',
                            fill : false,
                            data: this.setPlotData(this.total('QUOTE').documents)
                        }
                    ]
                }
            },
            setLabels(){
                let labels = []
                switch (this.period) {
                    case "day":
                        labels = this.getHoursInDay();
                        break;
                    case "week":
                        labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                        break;
                    case "month":
                        labels = this.getDaysOfMonth();
                        break;
                    case "year":
                        labels =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        break;
                    default:
                        labels =  this.getDatesFromDocuments();
                }
                return labels
            }
        },
        methods : {
            getDaysOfMonth(){
                let daysForMonth = []
                let days = moment().daysInMonth()
                while (days){
                    daysForMonth.push(days)
                    days--;
                }
                return daysForMonth.reverse();
            },

            getDatesFromDocuments : function(){
                //get all records
                let labels = [];
                let recs = 0;
                let dates =  this.filteredItems.sort((a, b) => {
                    let dateA = moment(a.createdAt);
                    let dateB = moment(b.createdAt);
                    return dateA > dateB ? 1 : -1;
                })

                let from = dates.shift();
                let to = dates.pop();

                if (to && from)
                    recs = moment(to.createdAt).diff(moment(from.createdAt), "day")

                while (recs){
                    labels.push(moment(from.createdAt).add(recs, "days").format("MMM Do YY"))
                    recs--
                }
                return  labels.reverse()
            },

            getHoursInDay : function(){
                let hours = 24
                let hoursInDay = []
                while (hours){
                    hoursInDay.push(hours)
                    hours--
                }
                return hoursInDay.reverse();
            },

            setPlotData : function(items){
                let data = [];
                switch (this.period) {
                    case "day":
                        this.setLabels.forEach(label => {
                            data.push(
                                items.filter(item => {
                                   return  moment(item.createdAt).hour() === label
                                }).length
                            )
                        })
                        break;
                    case "week":
                        this.setLabels.forEach(label => {
                            data.push(
                                items.filter(item => {
                                    return  label.toLowerCase().indexOf(moment(item.createdAt).format('ddd').toLowerCase()) >= 0
                                }).length
                            )
                        })
                        break;
                    case "month":
                        this.setLabels.forEach(label => {
                            data.push(
                                items.filter(item => {
                                    return  moment(item.createdAt).date() === label
                                }).length
                            )
                        })
                        break;
                    case "year":
                        this.setLabels.forEach(label => {
                            data.push(
                                items.filter(item => {
                                    return  label.toLowerCase().indexOf(moment(item.createdAt).format('MMM').toLowerCase()) >= 0
                                }).length
                            )
                        })
                        break;
                    default:
                        this.setLabels.forEach(label => {
                            data.push(
                                items.filter(item => {
                                    return  label.toString() ===  moment(item.createdAt).format("MMM Do YY").toString()
                                }).length
                            )
                        })
                }
                return data;
            },

            getByTime : function(period){

                // clear data before loading
                this.$store.commit('accounting/SET_SALES_DOCUMENTS', []);

                //set period filter
                this.period = period

                //reset date range filter
                this.dateRange = [];

                //get
                this.params.from = moment().startOf(period).format("YYYY-MM-DD HH:mm:ss");
                this.params.to = moment().endOf(period).format("YYYY-MM-DD HH:mm:ss");
                this.getDocumentsByTime();
            },

            getDocumentsByTime : function(){
                this.$store.dispatch(
                    'accounting/getSalesDocuments',
                    !!this.params.to && !!this.params
                        ? `?to=${this.params.to}&from=${this.params.from}`
                        : `?from=${this.params.from}`
                );

                //clear variable
                this.params = {}
            }
        },
        watch : {
            customer : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    this.term = n
                }
            },
            cashier : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    this.term = n
                }
            },
            type : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    this.term = n
                }
            },
            dateRange : {
                handler : function (n, o) {
                    // eslint-disable-next-line no-undef
                    if (!_.isEqual(n, o)) {

                        //reset preset filters
                        this.selected = 0;

                        this.params.to = window.helper.dateFix(n[1]);
                        this.params.from = window.helper.dateFix(n[0]);
                        this.getDocumentsByTime();

                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
