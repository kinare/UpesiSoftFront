<template>
    <div class="col-xs-10 col-xs-push-1 m-b-md m-t-md">
        <div class="row">
            <div class="col-xs-3">
                <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
            </div>
            <div class="col-xs-6">
                <h2 class="text-center" style="margin-top: 10px">Quotation</h2>
            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="row" id="quote">
            <div class="col-xs-8" >
                <div class="ibox-content p-xl pos-invoice" style="height: 80vh; overflow-x: scroll" >
                    <div class="row">
                        <h2 class="text-center"><strong>Quotation</strong></h2>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <h5>From:</h5>
                            <address>
                                <strong>Inspinia, Inc.</strong><br>
                                106 Jorg Avenu, 600/10<br>
                                Chicago, VT 32456<br>
                                <abbr title="Phone">P:</abbr> (123) 601-4590
                            </address>
                        </div>

                        <div class="col-sm-6 text-right">
                            <h4>Quote No.</h4>
                            <h4 class="text-navy">INV-000567F7-00</h4>
                            <p>
                                <span><strong> Date:</strong> Marh 18, 2014</span><br>
                            </p>
                        </div>
                    </div>

                    <div class="table-responsive m-t-lg">
                        <table class="table invoice-table">
                            <thead>
                            <tr>
                                <th>Item List</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Tax</th>
                                <th>Total Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><div><strong>Admin Theme with psd project layouts</strong></div>
                                    <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small></td>
                                <td>1</td>
                                <td>$26.00</td>
                                <td>$5.98</td>
                                <td>$31,98</td>
                            </tr>
                            <tr>
                                <td><div><strong>Wodpress Them customization</strong></div>
                                    <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </small></td>
                                <td>2</td>
                                <td>$80.00</td>
                                <td>$36.80</td>
                                <td>$196.80</td>
                            </tr>
                            <tr>
                                <td><div><strong>Angular JS &amp; Node JS Application</strong></div>
                                    <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</small></td>
                                <td>3</td>
                                <td>$420.00</td>
                                <td>$193.20</td>
                                <td>$1033.20</td>
                            </tr>

                            </tbody>
                        </table>
                    </div><!-- /table-responsive -->

                    <table class="table invoice-total">
                        <tbody>
                        <tr>
                            <td><strong>Sub Total :</strong></td>
                            <td>$1026.00</td>
                        </tr>
                        <tr>
                            <td><strong>TAX :</strong></td>
                            <td>$235.98</td>
                        </tr>
                        <tr>
                            <td><strong>TOTAL :</strong></td>
                            <td>$1261.98</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row">
                    <div class="row">
                        <div class="col-xs-12">
                            <button @click="printDoc" class="btn btn-block btn-lg btn-default"><i class="fa fa-print"></i> Print Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Quote",
        methods : {
            printDoc : function () {
                this.$htmlToPaper('quote');
            }
        }
    }
</script>

<style scoped>

</style>