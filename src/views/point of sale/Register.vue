<template>
    <div class="container-fluid p-sm">
        <div class="col-sm-4 border-right">
            <div class="row">
                <div class="ibox" style="margin-bottom: 0; ">
                    <div class="ibox-content pos-display">
                        <div class="row pos-items">
                            <table class="table small table-condensed table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-left">Item</th>
                                        <th class="text-left">Description</th>
                                        <th class="text-left">Qty</th>
                                        <th class="text-right">Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-left">Nails</td>
                                        <td class="text-left">Steel Wall Nails</td>
                                        <td class="text-left">2</td>
                                        <td class="text-right">250</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">Nails</td>
                                        <td class="text-left">Steel Wall Nails</td>
                                        <td class="text-left">2</td>
                                        <td class="text-right">250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row m-r-xs">
                            <div class="col-xs-12">
                                <h2 class="text-right"><strong>Total : 1254.00</strong></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="ibox" style="margin-bottom: 0">
                    <div class="ibox-content pos-calc">
                        <div class="row ">
                            <div class="col-xs-12 p-sm">
                                <button class="btn btn-success btn-lg pull-right visible-xs">Add</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                                <router-link to="/pos/payment" class="btn btn-lg btn-block btn-info pay-btn">Payment</router-link>
                                <router-link to="/pos/invoice" class="btn btn-lg btn-block btn-white btn-block">Invoice</router-link>
                                <router-link to="/pos/quote" class="btn btn-lg btn-block btn-white btn-block">Quote</router-link>
                            </div>
                            <div class="col-xs-8">
                                <div class="row no-pad">
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-white btn-block">1</button>
                                        <button class="btn btn-lg btn-white btn-block">4</button>
                                        <button class="btn btn-lg btn-white btn-block">7</button>
                                        <button class="btn btn-lg btn-white btn-block">+/-</button>
                                    </div>
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-white btn-block">2</button>
                                        <button class="btn btn-lg btn-white btn-block">5</button>
                                        <button class="btn btn-lg btn-white btn-block">8</button>
                                        <button class="btn btn-lg btn-white btn-block">0</button>
                                    </div>
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-white btn-block">3</button>
                                        <button class="btn btn-lg btn-white btn-block">6</button>
                                        <button class="btn btn-lg btn-white btn-block">9</button>
                                        <button class="btn btn-lg btn-white btn-block">.</button>
                                    </div>
                                    <div class="col-xs-3">
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
            </div>
        </div>
        <div class="col-sm-8 col-xs-12">
            <div class="col-xs-12">
                <div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true">Sale 1</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">Sale 2</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                                <div class="col-xs-12">
                                    <div class="row">
                                        <form>
                                            <div class="input-group">
                                                <input type="text" placeholder="Search Item" name="search" class="form-control">
                                                <div class="input-group-btn">
                                                    <button class="btn  btn-primary" type="submit">
                                                        Search
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div class="row text-center p-xs">
                                        <div class="btn-group-xs">
                                            <button class="btn btn-white m-xs">1/4 m</button>
                                            <button class="btn btn-white m-xs">1/2 m</button>
                                            <button class="btn btn-white m-xs">1 m</button>
                                            <button class="btn btn-white m-xs">2 m</button>
                                            <button class="btn btn-white m-xs">full</button>
                                        </div>
                                    </div>
                                    <div class="hr-line-dashed" style="margin: 5px"></div>
                                    <div class="search-items">
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div><div class="file-box">
                                        <div class="file">
                                            <a href="#">
                                                <span class="corner"></span>

                                                <div class="icon">
                                                    <i class="fa fa-file"></i>
                                                </div>
                                                <div class="file-name">
                                                    Document_2014.doc
                                                    <br>
                                                    <small>Added: Jan 11, 2014</small>
                                                </div>
                                            </a>
                                        </div>

                                    </div><div class="file-box">
                                        <div class="file">
                                            <a href="#">
                                                <span class="corner"></span>

                                                <div class="icon">
                                                    <i class="fa fa-file"></i>
                                                </div>
                                                <div class="file-name">
                                                    Document_2014.doc
                                                    <br>
                                                    <small>Added: Jan 11, 2014</small>
                                                </div>
                                            </a>
                                        </div>

                                    </div><div class="file-box">
                                        <div class="file">
                                            <a href="#">
                                                <span class="corner"></span>

                                                <div class="icon">
                                                    <i class="fa fa-file"></i>
                                                </div>
                                                <div class="file-name">
                                                    Document_2014.doc
                                                    <br>
                                                    <small>Added: Jan 11, 2014</small>
                                                </div>
                                            </a>
                                        </div>

                                    </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div><div class="file-box">
                                        <div class="file">
                                            <a href="#">
                                                <span class="corner"></span>

                                                <div class="icon">
                                                    <i class="fa fa-file"></i>
                                                </div>
                                                <div class="file-name">
                                                    Document_2014.doc
                                                    <br>
                                                    <small>Added: Jan 11, 2014</small>
                                                </div>
                                            </a>
                                        </div>

                                    </div>
                                        <div class="file-box">
                                            <div class="file">
                                                <a href="#">
                                                    <span class="corner"></span>

                                                    <div class="icon">
                                                        <i class="fa fa-file"></i>
                                                    </div>
                                                    <div class="file-name">
                                                        Document_2014.doc
                                                        <br>
                                                        <small>Added: Jan 11, 2014</small>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>




                                    </div>
                                </div>
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
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>
    @media (max-width: 768px) {
        .pos-calc .btn {
            font-size:11px;
            /*padding:4px 6px;*/
        }
    }

    @media (min-width: 768px) {
        .pos-calc .btn {
            font-size:12px;
            /*padding:6px 12px;*/
        }
    }

    @media (min-width: 992px) {
        .pos-calc .btn {
            font-size:14px;
            /*padding:8px 12px;*/
        }

    }

    @media (min-width: 1200px) {
        .pos-calc .btn {
            /*padding:10px 16px;*/
            font-size:14px;
        }
    }

    .pay-btn{
        padding: 24px 12px;
    }

    .pos-container * {
        box-sizing: border-box;
    }
    .pos-container{
        height: 100vh;
        overflow: auto;
    }
    .pos-bar{
        min-height: 50px;
    }
    .pos-total{
        position: absolute;
        bottom: 0;
        /*left: 0;*/
        width: 100%;
        right: 15px;
        padding: 15px;
        background-color: white;
    }

    .pos-calc{
        padding: 10px 20px;
        border:  1px solid #e7eaec;
    }
    .pos-items{
        height: 40vh;
        position: relative;
        overflow-y: scroll;
        padding: 10px;
    }
    .pos-display{
        border:  1px solid #e7eaec;
        padding: 0 20px;
        background-color: #F6F7F8;
    }
    .pos-footer{
        min-height: 40px;
    }
    .tabs-container .tab-pane .panel-body{

        background-color: #FAFBFB;
    }
    .tabs-container .nav-tabs > li.active > a{
        background-color: #FAFBFB;
    }

    .search-items{
        height: 50vh;
        overflow-y: scroll;
    }

    .file .file-name {
        padding: 10px;
        background-color: #f8f8f8;
        border-top: 1px solid #e7eaec;
    }
    .file .icon i {
        font-size: 61px;
        color: #dadada;
    }
    .file .icon {
        padding: 10px 10px;
        text-align: center;
    }
    .file .icon, .file .image {
        height: 80px;
        overflow: hidden;
    }
    .file {
        border: 1px solid #e7eaec;
        padding: 0;
        background-color: #ffffff;
        position: relative;
        margin-bottom: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }
    .file-box {
        float: left;
        width: 160px;
    }
</style>