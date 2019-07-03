<template>
    <div id="page-wrapper" class="gray-bg pos-wrapper">
        <div class="row border-bottom white-bg">
            <nav class="navbar navbar-static-top" role="navigation">
                <div class="navbar-header">
                    <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                        <i class="fa fa-reorder"></i>
                    </button>
                    <a href="#" class="navbar-brand">FOCUS</a>
                </div>
                <div class="navbar-collapse collapse" id="navbar">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a aria-expanded="false" role="button" href="https://digital4africa.com"> Go to website</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <a href="login.html">
                                <i class="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="wrapper wrapper-content" style="padding: 20px 10px 40px">
            <div class="container-fluid">
                <div class="ibox">
                    <div class="ibox-content" style="height: -webkit-fill-available">
                        <div class="row">
                            <div class="col-sm-5 border-right">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <table class="table table-condensed table-striped">
                                            <thead>
                                            <tr>
                                                <th class="text-left">Item</th>
                                                <th class="text-right">Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td class="text-left">Nails</td>
                                                <td class="text-right">250</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">Nails</td>
                                                <td class="text-right">250</td>
                                            </tr><tr>
                                                <td class="text-left">Nails</td>
                                                <td class="text-right">250</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left">Nails</td>
                                                <td class="text-right">250</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"></td>
                                                <td class="text-right"><strong>Total: 1250.00</strong></td>
                                            </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                    <!--calc-->

                                    <div class="col-sm-12 pos-calc">
                                        <div class="col-sm-4">
                                            <button class="btn btn-lg btn-white btn-block pay-btn">Payment</button>
                                            <button class="btn btn-lg btn-white btn-block">Quote</button>
                                            <button class="btn btn-lg btn-white btn-block">Invoice</button>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="row no-pad">
                                                <div class="col-sm-4">
                                                    <button class="btn btn-lg btn-white btn-block">1</button>
                                                    <button class="btn btn-lg btn-white btn-block">4</button>
                                                    <button class="btn btn-lg btn-white btn-block">7</button>
                                                    <button class="btn btn-lg btn-white btn-block">+/-</button>
                                                </div>
                                                <div class="col-sm-4">
                                                    <button class="btn btn-lg btn-white btn-block">2</button>
                                                    <button class="btn btn-lg btn-white btn-block">5</button>
                                                    <button class="btn btn-lg btn-white btn-block">8</button>
                                                    <button class="btn btn-lg btn-white btn-block">0</button>
                                                </div>
                                                <div class="col-sm-4">
                                                    <button class="btn btn-lg btn-white btn-block">Qty</button>
                                                    <button class="btn btn-lg btn-white btn-block">Disc</button>
                                                    <button class="btn btn-lg btn-white btn-block">Price</button>
                                                    <button class="btn btn-lg btn-white btn-block">Del</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-7">
                                <div class="col-lg-12">
                                    <div class="tabs-container">
                                            <ul class="nav nav-tabs">
                                                <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true">Sale 1</a></li>
                                                <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">Sale 2</a></li>
                                            </ul>
                                            <div class="tab-content">
                                                <div id="tab-1" class="tab-pane active">
                                                    <div class="panel-body">
                                                        <h1>Sale 1</h1>
                                                    </div>
                                                </div>
                                                <div id="tab-2" class="tab-pane">
                                                    <div class="panel-body">
                                                        <h1>Sale 2</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="footer">
            <div class="pull-right">
                10GB of <strong>250GB</strong> Free.
            </div>
            <div>
                <strong>Copyright</strong> Example Company © 2014-2017
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Pos",
        beforeCreate() {
            document.body.className = 'top-navigation';
        }
    }
</script>

<style scoped>
    .pay-btn{
        padding: 36px 16px;
    }
    .pos-calc{

    }
</style>