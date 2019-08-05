<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Invoices</h5>
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
                            <tr v-for="(doc, index) in filteredDocuments" v-bind:key="index" style="cursor: pointer" @click="openDocument(doc)">
                                <td>{{index + 1}}</td>
                                <td>{{doc.customerIsBusiness ? doc.customerBusinessName : doc.customerFirstName + ' ' + doc.customerLastName}}</td>
                                <td>{{doc.paymentMethod}}</td>
                                <td><span class="label" :class="doc.orderStatus === 'PAID' ? 'label-success' : 'label-warning'">{{doc.orderStatus}}</span></td>
                                <td>{{doc.total | currency}}</td>
                                <td><span class="badge badge-inverse">{{doc.orderItems.length}}</span> </td>
                                <td>{{doc.cashierFirstName + ' ' + doc.cashierLastName}}</td>
                                <td>{{doc.createdAt}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(invoices)" class="alert text-center" :class="status">{{message}}</div>
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
                        <h4 class="modal-title">Invoice</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders">
                            <div class="p-xl pos-invoice style-1" style="height: 80vh; overflow-y: scroll" id="invoice">
                                <div class="row">
                                    <h2 class="text-center"><strong>Invoice</strong></h2>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h5>From:<br>
                                            <strong>Focus Glass & Aluminium</strong>
                                        </h5>
                                        <address>
                                            {{selectedDocument.cashierFirstName + ' ' + selectedDocument.cashierLastName}}<br>
                                            {{selectedDocument.cashierEmail}}<br>
                                        </address>
                                    </div>

                                    <div class="col-sm-6 text-right">
                                        <h4>Invoice No. {{selectedDocument.id}}</h4>
                                        <span>To:</span>
                                        <address>
                                            <strong>{{selectedDocument.customerIsBusiness ? selectedDocument.customerBusinessName : selectedDocument.customerFirstName + ' ' + selectedDocument.customerLastName}}</strong><br>
                                            +{{selectedDocument.customerCountryCode + selectedDocument.customerPhoneNumber}}<br>
                                            {{selectedDocument.customerEmail}}<br>
                                            {{selectedDocument.customerPostalAddress}}
                                        </address>
                                        <p>
                                            <span><strong>Invoice Date:</strong> {{selectedDocument.createdAt}}</span><br>
                                            <!--<span><strong>Due Date:</strong> March 24, 2014</span>-->
                                        </p>
                                    </div>
                                </div>
                                <div class="table-responsive m-t">
                                    <table class="table invoice-table">
                                        <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>QTY</th>
                                            <th>Unit</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item, index) in selectedDocument.orderItems" :key="index">

                                            <td>{{item.productName}}</td>
                                            <td>{{item.qty || 1}}</td>
                                            <td>{{item.soldMeasurement ? item.soldMeasurement  : ''}}</td>
                                            <td>{{selectedDocument.total | currency}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div><!-- /table-responsive -->
                                <table class="table invoice-total">
                                    <tbody>
                                    <tr>
                                        <td><strong>Total :</strong></td>
                                        <td>{{selectedDocument.total | currency}}</td>
                                    </tr>
                                    </tbody>
                                </table>
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
    export default {
        name: "Invoice",
        components: {Spinner},
        data : function () {
            return {
                param : {
                    type : 'INVOICE',
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
            filteredDocuments(){
                let self = this;
                return this.term === ''
                    ? this.invoices
                    : this.invoices.filter(doc =>{
                        return doc.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    })
            },

            ...mapState('accounting',{
                invoices : state => state.invoices,
                loading : state => state.loading,
                message : state => state.message,
                status : state => state.status,
            })
        },
        methods : {
            openDocument : function (doc) {
                this.selectedDocument = doc;
                // eslint-disable-next-line no-undef
                $("#docCard").modal('show');
            },
        }
    }
</script>

<style scoped>

</style>