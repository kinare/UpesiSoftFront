<template>
    <div v-if="!validator.isEmptyObject(salesDocument)" class="row">

<!--        receipt view-->
        <div v-if="salesDocument.orderType === 'ORDER'" class="row" id="receipt">
            <div class="col-xs-12">

<!--                header-->
                <div class="row">
                    <div class="col-xs-4">
                        <div class="row">
                            <div class="col-xs-12">
                                <img :src="business.businessLogoImage" style="width:100%; max-width:150px;"><br>
                            </div>
                            <div class="col-xs-12">
                                <small><i>{{business.businessTagline}}</i></small><br>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 text-center">
                        <strong>{{salesDocument.orderType}}</strong>
                    </div>
                    <div class="col-xs-4">
                        <div class="content pull-right text-left">
                            <strong style="font-size: larger">{{business.businessName}}</strong><br>
                            {{business.businessPostalAddress}},{{business.businessPhysicalAddress}}, {{business.businessCountry}}<br>
                            {{business.businessPhoneNumber}}<br>
                        </div>
                    </div>
                </div>

<!--                address info-->
                <div class="row m-t-md">
                    <div class="col-xs-5" style="border: solid 1px ">
                        {{salesDocument.customerIsBusiness ? salesDocument.customerBusinessName : salesDocument.customerFirstName + ' ' + salesDocument.customerLastName}}<br>
                        +{{salesDocument.customerCountryCode + salesDocument.customerPhoneNumber}}<br>
                        {{salesDocument.customerEmail}}<br>
                        PIN : {{salesDocument.kraPin || 'N/A'}}
                    </div>
                    <div class="col-xs-2">&nbsp;</div>
                    <div class="col-xs-5" style="border: solid 1px ">
                        {{salesDocument.orderType | capitalize}} #: {{salesDocument.id}}<br>
                        Date: {{salesDocument.createdAt}}<br>
                        KRA : {{business.businessKraPin}}<br>
                    </div>
                </div>

<!--                title-->
                <div class="row">
                    <div class="text-center m-t-md">
                        <strong><u>CUSTOMER COPY</u></strong>
                    </div>
                </div>

<!--                item list-->
                <div class="row m-t-md">
                    <div class="col-xs-12">
                        <table class="table table-bordered invoice-table">
                            <thead>
                            <tr>
                                <th>Item</th>
                                <th>QTY</th>
                                <th>Uom</th>
                                <th>Unit Price</th>
                                <th>Discount</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in salesDocument.orderItems" :key="index" >
                                <td> {{item.productName}}</td>
                                <td>{{item.qty || 1}}</td>
                                <td>{{(item.soldMeasurement ? item.soldMeasurement : '') + ' ' + item.measurementAbbreviation || 1}}</td>
                                <td>{{item.unitPrice | currency}}</td>
                                <td>{{item.discount | currency}}</td>
                                <td> {{item.price | currency}}</td>
                            </tr>
                            </tbody>
                        </table>

                        <table class="table invoice-total">
                            <tbody>
                            <tr>
                                <td><strong>Total :</strong></td>
                                <td><strong>{{salesDocument.total | currency}}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Cash :</strong></td>
                                <td>{{salesDocument.tenderedAmount | currency}}</td>
                            </tr>
                            <tr>
                                <td><strong>Change :</strong></td>
                                <td>{{salesDocument.changeAmount | currency}}</td>
                            </tr>
                            </tbody>
                        </table>


                    </div>
                </div>

<!--                terms and conditions-->
                <div class="row m-t-md">
                    <div class="col-xs-12">
                        <div class="well m-t-lg">
                            <strong>Terms & Conditions</strong>
                            <div :v-html="business.businessTerms"></div>
                        </div>
                    </div>
                </div>

<!--                footer-->
                <div class="row m-t-md">
                    <div class="col-xs-12">
                        Serve by : <u>{{salesDocument.cashierFirstName + ' ' +salesDocument.cashierLastName}}</u>
                    </div>
                </div>

            </div>

        </div>

<!--        invoice view-->
        <div v-else class="ibox-content p-xl">
            <div class="row m-b-md">
                <div class="col-xs-6">
                    <img :src="business.businessLogoImage"  width="200">
                </div>
                <div class="col-xs-6">
                    <div class="content pull-right text-left">
                        {{salesDocument.orderType | capitalize}} #: {{salesDocument.id}}<br>
                        Date: {{salesDocument.createdAt}}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <h2 style="margin-bottom: 0"><strong>{{business.businessName}}</strong></h2><br>
                    <small><i>{{business.businessTagline}}</i></small><br>
                    {{business.businessPostalAddress}}, {{business.businessCountry}}<br>
                    {{business.businessPhysicalAddress}},<br>
                    {{business.businessPhoneNumber}}<br>
                    KRA : {{business.businessKraPin}}<br>
                </div>

                <div class="col-sm-6 text-right">
                    <strong>To</strong><br>
                    <strong>{{salesDocument.customerIsBusiness ? salesDocument.customerBusinessName : salesDocument.customerFirstName + ' ' + salesDocument.customerLastName}}</strong><br>
                    +{{salesDocument.customerCountryCode + salesDocument.customerPhoneNumber}}<br>
                    {{salesDocument.customerEmail}}<br>
                    {{salesDocument.customerPostalAddress}}<br>
                    PIN : {{salesDocument.kraPin || 'N/A'}}
                </div>
            </div>

            <div class="table-responsive m-t">
                <table class="table invoice-table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th class="text-left">Item</th>
                        <th>QTY</th>
                        <th>Uom</th>
                        <th>Unit Price</th>
                        <th class="text-right">Discount</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr class="item" v-for="(item, index) in salesDocument.orderItems" :key="index">
                            <td>{{index + 1}}</td>
                            <td class="text-left">{{item.productName}}</td>
                            <td>{{item.qty || 1}}</td>
                            <td>{{(item.soldMeasurement ? item.soldMeasurement : '') + ' ' + item.measurementAbbreviation || 1}}</td>
                            <td>{{item.unitPrice | currency}}</td>
                            <td class="text-right">{{item.discount | currency}}</td>
                            <td>{{item.price | currency}}</td>
                        </tr>
                    </tbody>
                </table>
            </div><!-- /table-responsive -->

            <table class="table invoice-total">
                <tbody>
                <tr>
                    <td><strong>Total :</strong></td>
                    <td>{{salesDocument.total | currency}}</td>
                </tr>
                </tbody>
            </table>
            <div>
                Prepared by : <u>{{salesDocument.cashierFirstName + ' ' +salesDocument.cashierLastName}}</u>
            </div>

            <div class="well m-t">
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

<style scoped></style>
