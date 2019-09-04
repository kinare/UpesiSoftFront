<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Invoices</h5>
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
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(doc, index) in filteredItems" v-bind:key="index" style="cursor: pointer" >
                                <td @click="openDocument(doc)">{{index + 1}}</td>
                                <td @click="openDocument(doc)">{{doc.customerIsBusiness ? doc.customerBusinessName : doc.customerFirstName + ' ' + doc.customerLastName}}</td>
                                <td @click="openDocument(doc)">{{doc.paymentMethod}}</td>
                                <td @click="openDocument(doc)"><span class="label" :class="doc.orderStatus === 'PAID' ? 'label-success' : 'label-warning'">{{doc.orderStatus}}</span></td>
                                <td @click="openDocument(doc)">{{doc.total | currency}}</td>
                                <td @click="openDocument(doc)"><span class="badge badge-inverse">{{doc.orderItems.length}}</span> </td>
                                <td @click="openDocument(doc)">{{doc.cashierFirstName + ' ' + doc.cashierLastName}}</td>
                                <td @click="openDocument(doc)">{{doc.createdAt}}</td>
                                <td><a @click="postDoc(doc)" class="btn btn-primary btn-outline btn-sm">Complete order</a> </td>
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
                        <h4 class="modal-title">Invoice</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders">
                            <div class="invoice-box">
                                <table cellpadding="0" cellspacing="0">
                                    <tr class="top">
                                        <td colspan="4">
                                            <table>
                                                <tr>
                                                    <td class="title">
                                                        <img src="https://www.focus.upesisoft.com/img/Focus%20Logo.png" style="width:100%; max-width:300px;">
                                                    </td>

                                                    <td>
                                                        Invoice #: {{selectedDocument.id}}<br>
                                                        Date: {{selectedDocument.createdAt}}<br>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr class="information">
                                        <td colspan="4">
                                            <table>
                                                <tr>
                                                    <td>
                                                        Focus Glass & Aluminium.<br>
                                                        {{selectedDocument.cashierFirstName + ' ' + selectedDocument.cashierLastName}}<br>
                                                        {{selectedDocument.cashierEmail}}
                                                    </td>

                                                    <td>
                                                        <strong>To</strong><br>
                                                        <strong>{{selectedDocument.customerIsBusiness ? selectedDocument.customerBusinessName : selectedDocument.customerFirstName + ' ' + selectedDocument.customerLastName}}</strong><br>
                                                        +{{selectedDocument.customerCountryCode + selectedDocument.customerPhoneNumber}}<br>
                                                        {{selectedDocument.customerEmail}}<br>
                                                        {{selectedDocument.customerPostalAddress}}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr class="heading">
                                        <td>
                                            Item
                                        </td>

                                        <td>
                                            QTY
                                        </td>

                                        <td>
                                            Unit
                                        </td>

                                        <td>
                                            Price
                                        </td>
                                    </tr>

                                    <tr class="item" v-for="(item, index) in selectedDocument.orderItems" :key="index">
                                        <td>{{item.productName}}</td>
                                        <td>{{item.qty || 1}}</td>
                                        <td>{{item.soldMeasurement ? item.soldMeasurement  : ''}}</td>
                                        <td>{{selectedDocument.total | currency}}</td>
                                    </tr>

                                    <tr class="total">
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                        <td>
                                            Total: {{selectedDocument.total | currency}}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button @click="mailDocument(selectedDocument)" type="button" class="btn btn-success" data-dismiss="modal"><i class="fa fa-envelope"></i> Email</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-print"></i> Print</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Convert to invoice modal-->
        <div class="modal  in fade" id="completeOrder" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Complete Order</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h1 class="text-center m-b-md">Complete order #{{docToPost.id}}?</h1>

                                    <form class="form-horizontal">
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">Customer</label>
                                            <div class="col-lg-9">
                                                <input disabled type="text" :value="docToPost.customerFullNames" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">Amount Due</label>
                                            <div class="col-lg-9">
                                                <input disabled type="text" :value="docToPost.total | currency" class="form-control">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-3 control-label">Payment</label>
                                            <div class="col-lg-9">
                                                <select class="form-control" v-model="docToPost.paymentMethod">
                                                    <option value="CASH">Cash</option>
                                                    <option value="MPESA">Mpesa</option>
                                                    <option value="VISA">Card</option>
                                                </select>
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
                            <button data-toggle="dropdown" class="btn btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-receipt"></i>  Complete order <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a @click="updateDocument(docToPost, 'no')" data-dismiss="modal"><i class="fa fa-receipt"></i> Complete order</a></li>
                                <li><a @click="updateDocument(docToPost, 'yes')" data-dismiss="modal"><i class="fa fa-envelope-open-text"></i> Complete order and email</a></li>
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
    export default {
        name: "Invoice",
        components: {Spinner},
        mixins : [sales],
        data : function () {
            return {
                type : 'INVOICE',
                selectedDocument : {},
                docToPost : {},
                validator : window.validator
            }
        },
        methods : {
            openDocument : function (doc) {
                this.selectedDocument = doc;
                // eslint-disable-next-line no-undef
                $("#docCard").modal('show');
            },

            postDoc : function (doc) {
                this.docToPost = doc;
                this.docToPost.customerFullNames =  doc.customerFirstName + ' ' + doc.customerLastName
                // eslint-disable-next-line no-undef
                $("#completeOrder").modal('show');
            }
        }
    }
</script>

<style scoped>
    .invoice-box {
        max-width: 800px;
        min-height: 842px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }

    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }

    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }

    .invoice-box table tr td:last-child {
        text-align: right;
    }

    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }

    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }

    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }

    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }

    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }

    .invoice-box table tr.item.last td {
        border-bottom: none;
    }

    .invoice-box table tr.total td:last-child {
        border-top: 2px solid #eee;
        font-weight: bold;
    }

    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }

        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }

    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }

    .rtl table {
        text-align: right;
    }

    .rtl table tr td:last-child {
        text-align: left;
    }
</style>
