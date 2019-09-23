<template>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="5">
                    <table>
                        <tr>
                            <td class="title">
                                <img src="https://www.focus.upesisoft.com/img/Focus%20Logo.png" style="width:100%; max-width:150px;">
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
                                <strong>Focus Glass & Aluminium LTD.</strong><br>
                                {{salesDocument.cashierFirstName + ' ' + salesDocument.cashierLastName}}<br>
                                {{salesDocument.cashierEmail}}
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

                <!--                                        <td>-->
                <!--                                            Unit-->
                <!--                                        </td>-->

                <td>
                    Price
                </td>
                <td>
                    Total
                </td>
            </tr>

            <tr class="item" v-for="(item, index) in salesDocument.orderItems" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.productName}}</td>
                <td>{{item.qty || 1}}</td>
                <!--                                        <td>{{ item.soldMeasurement ? item.soldMeasurement  : ''}}</td>-->
                <td>{{item.price | currency}}</td>
                <td>{{item.total | currency}}</td>
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
    </div>
</template>

<script>
    import SalesDoc from '../modules/plugins/SalesDocument'

    export default {
        name: "SalesDocument",
        data : function () {
            return {
                salesDocument : {}
            }
        },
        mounted(){
            SalesDoc.DocEvent.$on('InitSalesDocument', (params) => {
                this.initDoc(params);
            });
        },
        destroyed(){
          this.unsetDoc();
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
