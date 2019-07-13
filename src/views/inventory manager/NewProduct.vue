<template>
    <div class="row">
            <div class="col-lg-9">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h4>New Product</h4>
                    </div>
                    <div class="ibox-content">
                        <div class="tabs-container">
                            <div class="tabs-left">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#general" aria-expanded="true"><i class="fa fa-wrench"></i> General</a></li>
                            <li class=""><a data-toggle="tab" href="#inventory" aria-expanded="false"><i class="fa fa-list-alt"></i> Inventory</a></li>
                            <li class=""><a data-toggle="tab" href="#attributes" aria-expanded="false"><i class="fa fa-tags"></i> Pricing</a></li>
                            <li class=""><a data-toggle="tab" href="#shipping" aria-expanded="false"><i class="fa fa-truck"></i>Shipping</a></li>
                            <li class=""><a data-toggle="tab" href="#advance" aria-expanded="false"><i class="fa fa-cog"></i>Advance</a></li>
                        </ul>
                        <div class="tab-content m-b-lg">
                            <div id="general" class="tab-pane active">
                                <div class="panel-body">
                                   <div class="col-xs-12">
                                       <form method="get" class="form-horizontal">
                                           <div class="form-group">
                                               <label class="col-sm-2 control-label">Name</label>
                                               <div class="col-sm-10">
                                                   <input type="text" class="form-control">
                                               </div>
                                           </div>
                                           <div class="form-group">
                                               <label class="col-sm-2 control-label">Short Desc</label>
                                               <div class="col-sm-10">
                                                   <input type="text" class="form-control">
                                               </div>
                                           </div>
                                           <div class="form-group">
                                               <label class="col-sm-2 control-label">Description</label>
                                               <div class="col-sm-10">
                                                  <textarea class="form-control"></textarea>
                                               </div>
                                           </div>
                                       </form>
                                   </div>
                                </div>
                            </div>
                            <div id="inventory" class="tab-pane">
                                <div class="panel-body">
                                    <div class="col-xs-12">
                                        <form method="get" class="form-horizontal">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">SKU</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">Quantity</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">Unit of Measure</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">Sale Unit of Measure</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control">
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div id="attributes" class="tab-pane">
                                <div class="panel-body">
                                    <div class="col-xs-12">
                                        <form method="get" class="form-horizontal">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">Price</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="hr-line-dashed"></div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">Sale Price</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="hr-line-dashed"></div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">Tax class</label>
                                        <div class="col-sm-10">
                                            <select class="form-control">
                                                <option value="2">VAT 0</option>
                                                <option value="1">VAT 16</option>
                                            </select>
                                        </div>
                                    </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div id="shipping" class="tab-pane">
                                <div class="panel-body">
                                    <h1>shipping</h1>
                                </div>
                            </div>
                            <div id="advance" class="tab-pane">
                                <div class="panel-body">
                                    <h1>advance</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                        </div>

                    </div>
                    <div class="ibox-footer text-right">
                        <button type="button" class="btn btn-white"><i class="fa fa-times"></i> Cancel</button>
                        <button type="button" class="btn btn-primary m-l"><i class="fa fa-plus"></i> Add </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <div class="row">
<!--                            categories-->
                            <div class="col-xs-12">
                                <h4 class="tag-title">Categories</h4>
                                <div class="input-group m-b">
                                    <select class="form-control">
                                        <option selected>Select category</option>
                                        <option >Cat 1</option>
                                        <option>Cat 2</option>
                                        <option>Cat 3</option>
                                    </select>
                                    <div class="input-group-btn">
                                        <button tabindex="-1" class="btn btn-primary" type="button">Add</button>
                                    </div>
                                </div>

                                <ul class="tag-list" style="padding: 0">
                                    <li v-for="(category, index) in categories" :key="index"><a>Family &nbsp; <i class="fa fa-times cat-icon" ></i></a></li>
                                </ul>
                            </div>

<!--                            images-->
                            <div class="col-xs-12 m-t-lg">
                                <h4>Product Image</h4>
                                <label class="btn btn-block btn-white">
                                    <input type="file" id="file" ref="file"/>
                                    <i class="fa fa-image" ></i> upload image
                                </label>
                                <dd class="product-image">
                                    <a href=""><img alt="image" src="/img/a3.jpg"></a>
                                    <a href=""><img alt="image" src="/img/a1.jpg"></a>
                                    <a href=""><img alt="image" src="/img/a2.jpg"></a>
                                    <a href=""><img alt="image" src="/img/a4.jpg"></a>
                                    <a href=""><img alt="image" src="/img/a5.jpg"></a>
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "NewProduct",

    }
</script>

<style scoped>
    .cat-icon:hover{
        color: #9F2F33;
    }
    .product-image img {
        width: 40px;
        height: 40px;
        padding: 5px;
    }

    input[type="file"] {
        display: none;
    }
    .tabs-container .tabs-left > .nav-tabs .active > a, .tabs-container .tabs-left > .nav-tabs .active > a:hover, .tabs-container .tabs-left > .nav-tabs .active > a:focus{
        color: #9F2F33;
    }
</style>