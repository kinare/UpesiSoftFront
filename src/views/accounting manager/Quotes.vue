<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Quotes</h5>
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
                                        <a @click="term ='' " class="btn btn-default" ><span class="fa fa-times"></span></a>
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
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(doc, index) in filteredItems" v-bind:key="index" style="cursor: pointer" >
                                <td @click="openDocument(doc)" >{{index + 1}}</td>
                                <td @click="openDocument(doc)" >{{doc.customerIsBusiness ? doc.customerBusinessName : doc.customerFirstName + ' ' + doc.customerLastName}}</td>
                                <td @click="openDocument(doc)" >{{doc.paymentMethod}}</td>
                                <td @click="openDocument(doc)" ><span class="label" :class="doc.orderStatus === 'PAID' ? 'label-success' : 'label-warning'">{{doc.orderStatus}}</span></td>
                                <td @click="openDocument(doc)" >{{doc.total | currency}}</td>
                                <td @click="openDocument(doc)" ><span class="badge badge-inverse">{{doc.orderItems.length}}</span> </td>
                                <td @click="openDocument(doc)" >{{doc.cashierFirstName + ' ' + doc.cashierLastName}}</td>
                                <td @click="openDocument(doc)" >{{doc.createdAt}}</td>
                                <td>
                                    <a @click="convertDoc(doc)" class="btn btn-primary btn-outline btn-sm">Convert to invoice</a>
                                    <a @click="deleteDoc(doc.id)" class="btn btn-primary btn-outline btn-sm m-l"><i class="fa fa-trash"></i> </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(documents)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--document modal-->
        <div class="modal  in fade" id="docCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Quotation</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders">
                            <sales-document/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Print</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Convert to invoice modal-->
        <div class="modal  in fade" id="convertCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Convert to invoice</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h1 class="text-center m-b-md">Convert Quotation #{{docToConvert.id}} to invoice ?</h1>

                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">Customer</label>
                                            <div class="col-lg-9">
                                                <input disabled type="text" :value="docToConvert.customerFullNames" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">Amount</label>
                                            <div class="col-lg-9">
                                                <input disabled type="text" :value="docToConvert.total | currency" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">Invoice Date</label>
                                            <div class="col-lg-9">
                                                <DatePicker v-model="docToConvert.dueDate" lang="en" input-class="form-control"></DatePicker>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white m-r" data-dismiss="modal">Close</button>

                        <div class="btn-group">
                            <button data-toggle="dropdown" class="btn btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-exchange-alt"></i> Convert <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a @click="updateDocument(docToConvert, 'no')" data-dismiss="modal"><i class="fa fa-exchange-alt"></i> Convert</a></li>
                                <li><a @click="updateDocument(docToConvert, 'yes')" data-dismiss="modal"><i class="fa fa-envelope-open-text"></i> Convert and email</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Spinner from "../../components/Spinner";
    import sales from "../../modules/mixins/sales";
    import DatePicker from 'vue2-datepicker'
    export default {
        name: "Quote",
        components: {Spinner, DatePicker},
        mixins : [sales],
        data : function () {
            return {
                type : 'QUOTE',
                docToConvert : {},
                validator : window.validator
            }
        },
        methods : {
            openDocument : function (doc) {
                this.$salesDoc.initDoc(doc);
                // eslint-disable-next-line no-undef
                $("#docCard").modal('show');
            },

            convertDoc : function (doc) {
                this.docToConvert = doc;
                this.docToConvert.customerFullNames =  doc.customerFirstName + ' ' + doc.customerLastName
                this.docToConvert.dueDate =  new Date();

                // eslint-disable-next-line no-undef
                $("#convertCard").modal('show');
            }
        }
    }
</script>

<style scoped>
.mx-datepicker input {
    width: 100% !important;
}
</style>
