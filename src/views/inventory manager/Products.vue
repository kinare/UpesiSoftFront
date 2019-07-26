<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Products</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs" :class="view === 'list' ? 'btn-primary' : 'btn-white'" @click="$store.commit('inventory/SET_VIEW', 'list')">
                            <i class="fa fa-list"></i>
                        </a>
                        <a class="btn btn-xs " :class="view === 'grid' ? 'btn-primary' : 'btn-white'" @click="$store.commit('inventory/SET_VIEW','grid')">
                            <i class="fa fa-th-large"></i>
                        </a>
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('inventory/getProducts')"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <Spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-3 m-b-xs">
                            <div class="btn-group-xs">
                                <select class="form-control">
                                    <option selected>Select Category</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-5 col-sm-push-4">
                            <form v-on:submit.prevent="searchProduct">
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search">
                                    <div class="input-group-btn">
                                        <button @click="searchProduct" type="submit" class="btn btn-default" >Go <span class="fa fa-arrow-right"></span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
<!--                    product list-->
                    <div v-if="view === 'list'" class="table-responsive product-list">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>State</th>
                                <th>Full Items</th>
                                <th>Pieces</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(product, index) in products" v-bind:key="index" style="cursor: pointer">
                                <td @click="openProduct(product)" class="product-avatar"><img alt="image" src="/img/p1.jpg"> </td>
                                <td @click="openProduct(product)" >
                                    {{product.productName}}<br>
                                    <small class="text-muted">{{product.productShortDescription}}</small>
                                </td>
                                <td @click="openProduct(product)" >{{product.productDescription}}</td>
                                <td @click="openProduct(product)" >{{product.sku}}</td>
                                <td @click="openProduct(product)" >{{product.price}}</td>
                                <td @click="openProduct(product)" >{{product.salePrice}}</td>
                                <td @click="openProduct(product)" ><span class="badge" :class="product.state ? 'badge-info' : 'badge-warning'">{{product.state ? 'Available' : 'Unavailable'}}</span> </td>
                                <td @click="openProduct(product)" ><span class="badge badge-white">{{product.sellAs === 'FULL' ? product.qty : 0}}</span> </td>
                                <td @click="openProduct(product)" ><span class="badge badge-white">{{product.sellAs === 'CUSTOM' ? product.qty : 0}}</span></td>
                                <td><a class="btn btn-sm btn-success" @click="restockProduct(product)">Re-stock</a> </td>
                            </tr>
                            <tr>
                                <td colspan="10" v-if="validator.isEmptyObject(products)">
                                    <div class="alert" :class="status">
                                        {{message}}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
<!--                    product grid-->
                    <div v-if="view === 'grid'" class="row">
                        <div class="col-md-12">
                            <div v-for="(product, index) in products" v-bind:key="index"  class="file-box">
                                <div class="file">
                                    <a href="#">
                                        <span class="corner" :class="product.state ? 'available': 'unavailable'"></span>
                                        <div class="image">
                                            <img alt="image" class="img-responsive" src="/img/p1.jpg">
                                        </div>
                                        <div class="file-name">
                                            {{product.name}}<span class="badge badge-info pull-right">{{product.price}}</span>
                                            <br>
                                            <small>{{product.shortDescription}}</small>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


<!--        product modal-->
        <div class="modal  in fade" id="viewProduct" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Product Detail</h4>
                    </div>
                    <div class="modal-body">
                        <product-card :product="seletedProduct"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
<!--                        <button type="button" class="btn btn-primary">Save changes</button>-->
                    </div>
                </div>
            </div>
        </div>


<!--        restock modal-->
        <div class="modal in fade" id="restock" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Re-stock product</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <form>
                                    <div class="form-group">
                                        <label class="label-control">Quantity</label>
                                        <input type="number" class="form-control" placeholder="Quantity">
                                    </div>
                                    <div class="form-group" >
                                        <label class="control-label">Available From</label>
                                        <input type="date" class="form-control" placeholder="Available from">
                                        <!--                                    <DatePicker lang="en" input-class="form-control"></DatePicker>-->
                                        <span class="help-block"></span>
                                    </div>

                                    <div class="form-group" >
                                        <label class="control-label">Available to</label>
                                        <input type="date" class="form-control" placeholder="Available to">
                                        <!--                                    <DatePicker lang="en" input-class="form-control"></DatePicker>-->
                                        <span class="help-block"></span>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeRestockModal">Close</button>
                        <button type="button" class="btn btn-primary">Re-stock</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Spinner from "../../components/Spinner";
    import ProductCard from "./ProductCard";
    import DatePicker from 'vue2-datepicker'
    export default {
        name: "Products",
        components: {ProductCard, Spinner, DatePicker},
        data : function(){
            return {
                term : '',
                validator : window.validator,
                seletedProduct : {},
                selectedForRestock : {}
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('inventory/getProducts')
            })
        },
        computed : {
            ...mapState('inventory',{
                products : state => state.products,
                loading : state => state.loading,
                view : state => state.view,
                message : state => state.message,
                status : state => state.status,
            }),
        },
        methods : {
            searchProduct : function () {
                
            },

            openProduct : function (product) {
                this.seletedProduct = product
                // eslint-disable-next-line no-undef
                $("#viewProduct").modal('show');
            },

            restockProduct : function (product) {
                this.selectedForRestock = product
                // eslint-disable-next-line no-undef
                $("#restock").modal('show');
            },
            closeRestockModal: function () {
                this.selectedForRestock = {}
            }
        }
    }
</script>

<style scoped>
    .product-avatar img {
        width: 28px;
        height: 28px;
        border-radius: 0!important;
        margin-left: 18px;
    }
   .available{
       position: absolute;
       display: inline-block;
       width: 0;
       height: 0;
       line-height: 0;
       border: 0.6em solid transparent;
       border-right: 0.6em solid #1c84c6;
       border-bottom: 0.6em solid #1c84c6;
       right: 0em;
       bottom: 0em;
   }
    .unavailable {
        position: absolute;
        display: inline-block;
        width: 0;
        height: 0;
        line-height: 0;
        border: 0.6em solid transparent;
        border-right: 0.6em solid #f8ac59;
        border-bottom: 0.6em solid #f8ac59;
        right: 0em;
        bottom: 0em;
    }
   .product-list table tr td {
       height: 46px;
       vertical-align: middle;
       border: none;
   }
   .product-avatar img {
       width: 28px;
       height: 28px;
       border-radius: 50%;
   }
</style>