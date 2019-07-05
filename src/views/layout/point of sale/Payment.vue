<template>
    <div class="container-fluid p-sm">
        <div class="col-lg-10 col-lg-push-1 col-xs-12">
            <div class="row">
                <div class="col-xs-3">
                    <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
                </div>
                <div class="col-xs-6">
                    <h2 class="text-center" style="margin-top: 10px">Payment</h2>
                </div>
                <div class="col-xs-3">
                    <router-link to="/pos/receipt" class="btn btn-white btn-lg pull-right"><i class="fa fa-arrow-right"></i> Validate </router-link>
                </div>

            </div>
            <div class="hr-line-dashed"></div>
            <div class="row">
                <div class="col-xs-4">
                   <div class="row">
                       <div class=" col-xs-8 col-sm-push-4">
                           <button class="btn btn-lg btn-white btn-block pull-right">Cash</button>
                           <button class="btn btn-lg btn-white btn-block pull-right">Mpesa</button>
                           <button class="btn btn-lg btn-white btn-block pull-right">Card</button>
                       </div>
                   </div>
                </div>
                <div class="col-xs-8 border-left">
                    <div class="row">
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="due">Due</label>
                                <input type="text" class="form-control" id="due" value="1500.00" disabled>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="tendered">Tendered</label>
                                <input type="text" class="form-control" id="tendered" value="1500.00">
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="change">Change</label>
                                <input type="text" class="form-control" id="change" value="1500.00" disabled>
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <div class="form-group">
                                <label for="change">Method</label>
                                <select class="form-control">
                                    <option selected value="Cash">Cash</option>
                                    <option value="Mpesa">Mpesa</option>
                                    <option value="Card">Card</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="hr-line-dashed"></div>

                    <div class="row">
                        <div class="col-xs-7">
                            <div class="ibox-content pos-calc" style="border: none">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="row no-pad">
                                            <div class="col-xs-3">
                                                <button class="btn btn-lg btn-white btn-block">1</button>
                                                <button class="btn btn-lg btn-white btn-block">4</button>
                                                <button class="btn btn-lg btn-white btn-block">7</button>
                                                <button class="btn btn-lg btn-white btn-block">C</button>
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
                                                <button class="btn btn-lg btn-white btn-block">+10</button>
                                                <button class="btn btn-lg btn-white btn-block">+20</button>
                                                <button class="btn btn-lg btn-white btn-block">+50</button>
                                                <button class="btn btn-lg btn-white btn-block">Del</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-5">
                            <div class="ibox-content pos-calc" style="border: none">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <button class="btn btn-block btn-lg btn-white"><i class="fa fa-user-alt"></i> Customer</button>
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
        name: "Payment"
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
    .pos-calc{
        padding: 10px 20px;
    }
</style>