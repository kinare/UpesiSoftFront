<template>
    <div class="col-xs-10 col-xs-push-1 m-b-md m-t-md">
        <div class="row">
            <div class="col-xs-3">
                <a @click="$router.push('/pos')" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
            </div>
            <div class="col-xs-6">
                <h2 class="text-center" style="margin-top: 10px">Quotation</h2>
            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="row">
            <div class="col-xs-8" >
                <div class="ibox-content p-xl pos-quote style-1" :class="loading ? 'sk-loading' : ''" style="height: 80vh; overflow-y: scroll" id="quote">
                    <spinner v-if="loading"/>
                    <div v-if="!validator.isEmptyObject(quote)">
                        <div class="quote-box">
                            <table cellpadding="0" cellspacing="0">
                                <tr class="top">
                                    <td colspan="4">
                                        <table>
                                            <tr>
                                                <td class="title">
                                                    <img src="https://www.focus.upesisoft.com/img/Focus%20Logo.png" style="width:100%; max-width:300px;">
                                                </td>

                                                <td>
                                                    quote #: {{quote.id}}<br>
                                                    Date: {{quote.createdAt}}<br>
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
                                                    {{quote.cashierFirstName + ' ' + quote.cashierLastName}}<br>
                                                    {{quote.cashierEmail}}
                                                </td>

                                                <td>
                                                    <strong>To</strong><br>
                                                    <strong>{{quote.customerIsBusiness ? quote.customerBusinessName : quote.customerFirstName + ' ' + quote.customerLastName}}</strong><br>
                                                    +{{quote.customerCountryCode + quote.customerPhoneNumber}}<br>
                                                    {{quote.customerEmail}}<br>
                                                    {{quote.customerPostalAddress}}
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

                                <tr class="item" v-for="(item, index) in quote.orderItems" :key="index">
                                    <td>{{item.productName}}</td>
                                    <td>{{item.qty || 1}}</td>
                                    <td>{{item.soldMeasurement ? item.soldMeasurement  : ''}}</td>
                                    <td>{{quote.total | currency}}</td>
                                </tr>

                                <tr class="total">
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        Total: {{quote.total | currency}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="row">
                        <div class="col-xs-12">
                            <button @click="printDoc" class="btn btn-block btn-lg btn-default"><i class="fa fa-print"></i> Print quote</button>
                            <button @click="mailDoc(quote)" class="btn btn-block btn-lg btn-default"><i class="fa fa-envelope"></i> Email Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "../../components/Spinner";
    export default {
        name: "Quote",
        components: {Spinner},
        data : function(){
            return {
                namespace : '',
                validator : window.validator,
            }
        },
        beforeRouteEnter(to, from, next){
            next(v =>{
                v.namespace = to.params.namespace;

                //set customer if not set
                if (!v.document.customerId){
                    v.document.customerId = v.customer.id;
                    v.document.customerDetails  = JSON.stringify(v.customer);
                }

                //post quote
                v.$store.dispatch(`pos/${v.namespace}/generateDocument`, v.document);
            })
        },
        beforeRouteLeave(to, from, next){
            this.$store.commit(`pos/${this.namespace }/SET_DOC_NO`, '');
            next();
        },
        methods : {
            printDoc : function () {
                this.$htmlToPaper('quote');
            },

            mailDoc : function (doc) {
                this.$store.dispatch(
                    `pos/${this.namespace }/mailSaleDocument`,
                    { orderId : doc.id})
            }
        },
        computed : {
            quote(){return this.$store.getters[`pos/${this.namespace }/quote`]},
            document(){return this.$store.getters[`pos/${this.namespace }/document`]},
            customer(){return this.$store.getters[`pos/${this.namespace }/customer`]},
            loading(){return this.$store.getters[`pos/${this.namespace }/loading`]},
            documentNo(){return this.$store.getters[`pos/${this.namespace }/documentNo`]},
            measurmentAbbreviation(){return this.$store.getters['inventory/getMeasurmentAbbreviation']},        },
        watch : {
            documentNo : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    if (n){
                        let data = {
                            type : this.document.orderType,
                            id : n,
                            status : this.document.orderStatus,
                        }

                        this.$store.dispatch(`pos/${this.namespace}/getDocument`, data);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .pos-quote{
        border:  1px solid #e7eaec;padding: 10px 20px;
    }
    .quote-box {
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

    .quote-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }

    .quote-box table td {
        padding: 5px;
        vertical-align: top;
    }

    .quote-box table tr td:last-child {
        text-align: right;
    }

    .quote-box table tr.top table td {
        padding-bottom: 20px;
    }

    .quote-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }

    .quote-box table tr.information table td {
        padding-bottom: 40px;
    }

    .quote-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }

    .quote-box table tr.details td {
        padding-bottom: 20px;
    }

    .quote-box table tr.item td{
        border-bottom: 1px solid #eee;
    }

    .quote-box table tr.item.last td {
        border-bottom: none;
    }

    .quote-box table tr.total td:last-child {
        border-top: 2px solid #eee;
        font-weight: bold;
    }

    @media only screen and (max-width: 600px) {
        .quote-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }

        .quote-box table tr.information table td {
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
