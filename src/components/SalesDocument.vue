<template>
    <div v-if="!validator.isEmptyObject(salesDocument)" class="row">

<!--        receipt view-->
        <div v-if="salesDocument.orderType === 'ORDER'" class="row" id="receipt">
            <div class="col-xs-12" >
                <div class="row">
                    <div class="pos-receipt" style="border:  1px solid #e7eaec;padding: 10px 20px;font-family:  monospace, sans-serif;line-height: 1;">
                        <div class="pos-receipt-header">
                            <h2 class="text-center">
                                <strong>{{business.businessName}}</strong><br>
                                <small><i>{{business.businessTagline}}</i></small><br>
                            </h2>
                            <h5 class="text-center">
                                Receipt No: {{salesDocument.id}}<br>
                                Date : {{salesDocument.createdAt}}
                            </h5>
                            <p>Name : {{salesDocument.customerIsBusiness ? salesDocument.customerBusinessName : salesDocument.customerFirstName + ' ' + salesDocument.customerLastName}}</p>
                            <p>Phone : {{salesDocument.customerPhoneNumber}}</p>
                            <p>Email : {{salesDocument.customerEmail}}</p>
                            <p>PIN : {{salesDocument.kraPin || 'N/A'}}</p>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="pos-receipt-content">
                            <table class="table small table-condensed">
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>QTY</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in salesDocument.orderItems" :key="index" >
                                    <td class="no-borders">
                                        {{item.productName}}
                                    </td>
                                    <td class="no-borders">
                                        {{item.qty || 1}}
                                    </td>
                                    <td class="no-borders">
                                        {{item.price | currency}}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="no-borders"><strong>Total</strong></td>
                                    <td class="no-borders"><strong>{{salesDocument.total | currency}}</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="no-borders"><strong>Cash</strong></td>
                                    <td class="no-borders"><strong>{{salesDocument.tenderedAmount | currency}}</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="no-borders"><strong>Change</strong></td>
                                    <td class="no-borders"><strong>{{salesDocument.changeAmount | currency}}</strong></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="pos-receipt-footer">
                            <p class="text-center"> <strong>Served by</strong> : {{salesDocument.cashierFirstName + ' ' + salesDocument.cashierLastName}} </p>
                            <h3 class="text-center">Thank You</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!--        invoice view-->
        <div v-else class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="5">
                        <table>
                            <tr>
                                <td class="title">
                                    <img :src="business.businessLogoImage" style="width:100%; max-width:150px;">
                                </td>

                                <td>
                                    {{salesDocument.orderType | capitalize}} #: {{salesDocument.id}}<br>
                                    Date: {{salesDocument.createdAt}}<br>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class="information">
                    <td colspan="5">
                        <table>
                            <tr>
                                <td>
                                    <h2 style="margin-bottom: 0"><strong>{{business.businessName}}</strong></h2><br>
                                    <small><i>{{business.businessTagline}}</i></small><br>
                                    {{business.businessPostalAddress}}, {{business.businessCountry}}<br>
                                    {{business.businessPhysicalAddress}},<br>
                                    {{business.businessPhoneNumber}}<br>
                                    KRA : {{business.businessKraPin}}<br>
                                    VAT No. : {{business.businessVatNumber}}
                                </td>

                                <td>
                                    <strong>To</strong><br>
                                    <strong>{{salesDocument.customerIsBusiness ? salesDocument.customerBusinessName : salesDocument.customerFirstName + ' ' + salesDocument.customerLastName}}</strong><br>
                                    +{{salesDocument.customerCountryCode + salesDocument.customerPhoneNumber}}<br>
                                    {{salesDocument.customerEmail}}<br>
                                    {{salesDocument.customerPostalAddress}}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <h2 style="text-align: center"><strong>{{salesDocument.orderType}}</strong></h2>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr class="heading">
                    <td>
                        No.
                    </td>
                    <td>
                        Item
                    </td>
                    <td>
                        QTY
                    </td>
                    <td class="print-hide">
                        Unit Price
                    </td>
                    <td>
                        Total
                    </td>
                </tr>

                <tr class="item" v-for="(item, index) in salesDocument.orderItems" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.qty || 1}}</td>
                    <td class="print-hide">{{item.productDefaultPrice | currency}}</td>
                    <td>{{item.price | currency}}</td>
                </tr>

                <tr class="total">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        Total: {{salesDocument.total | currency}}
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left" colspan="4">
                        Prepared by : <u>{{salesDocument.cashierFirstName + ' ' +salesDocument.cashierLastName}}</u>
                    </td>
                </tr>
            </table>
            <div class="well m-t-lg">
                <strong>Terms & Conditions</strong>
                <div :v-html="business.businessTerms"></div>

            </div>
        </div>
    </div>
</template>

<script>
    import SalesDoc from '../modules/plugins/SalesDocument'

    export default {
        name: "SalesDocument",
        props : ['document'],
        data : function () {
            return {
                salesDocument : {},
                auth : window.auth,
                validator : window.validator
            }
        },
        mounted(){
            this.salesDocument = this.document;

            SalesDoc.DocEvent.$on('InitSalesDocument', (params) => {
                this.initDoc(params);
            });
        },
        destroyed(){
          this.unsetDoc();
        },
        computed : {
          business(){
              return JSON.parse(this.auth.business());
          }
        },
        methods : {
            initDoc : function (doc) {
                this.salesDocument = doc;
            },
            unsetDoc : function () {
                this.salesDocument = {}
            },
            mailDoc : function (email) {
                if (!email){
                    // mail doc
                }
            },
            printDoc : function () {
                //print document
            }
        },
    }
</script>

<style scoped>
    .invoice-box {
        max-width: 800px;
        min-height: 842px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        /*box-shadow: 0 0 10px rgba(0, 0, 0, .15);*/
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
