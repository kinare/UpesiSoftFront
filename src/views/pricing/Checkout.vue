<template>
    <div class="row">
        <div class="col-md-12">
            <div class="ibox-content">
                <router-link to="/pricing/invoice" class="btn btn-white"><i class="fa fa-chevron-circle-left"></i> Back </router-link>
            </div>
        </div>
        <div class="col-md-12">
            <div class="ibox-content">
                <div class="panel-group payments-method" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="pull-right">
                            <i class="fa fa-money-bill-wave text-info"></i>
                        </div>
                        <h5 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">MPESA</a>
                        </h5>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse">
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-md-10">
                                    <h2>Summary</h2>
                                    <strong>Plan:</strong>: Name of product <br>
                                    <strong>Price:</strong>: <span class="text-navy">$452.90</span>

                                    <p class="m-t">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.

                                    </p>

                                    <a class="btn btn-success">
                                        <i class="fa fa-mobile"></i>  Pay via Mpesa
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="pull-right">
                            <i class="fa fa-credit-card text-success"></i>
                        </div>
                        <h5 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Bank</a>
                        </h5>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse in">
                        <div class="panel-body">

                            <div class="row">
                                <div class="col-md-12">
                                    <h2>Summary</h2>
                                    <strong>Product:</strong>: Name of product <br>
                                    <strong>Price:</strong>: <span class="text-navy">$452.90</span>

                                    <p class="m-t">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                        enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.

                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Checkout"
    }
</script>

<style scoped>

</style>
