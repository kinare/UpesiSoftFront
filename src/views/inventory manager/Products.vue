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
                    <div v-if="view === 'list'" class="table-responsive product-list">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>Tax Class</th>
                                <th>State</th>
                                <th>Vailable From</th>
                                <th>Vailable To</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(product, index) in products" v-bind:key="index" style="cursor: pointer">
                                <td class="product-avatar"><img alt="image" src="/img/p1.jpg"> </td>
                                <td>{{product.productName}}</td>
                                <td>{{product.productShortDescription}}</td>
                                <td>{{product.sku}}</td>
                                <td>{{product.price}}</td>
                                <td>{{product.salePrice}}</td>
                                <td>{{product.taxClassId}}</td>
                                <td><span class="badge" :class="product.state ? 'badge-success' : 'badge-warning'">{{product.state ? 'Available' : 'Unavailable'}}</span> </td>
                                <td>{{product.availableFrom}}</td>
                                <td>{{product.availableTo}}</td>
                            </tr>
                            <tr>
                                <td colspan="10" v-if="validator.isEmptyObject(products)" >
                                    <div class="alert" :class="status">
                                        {{message}}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Spinner from "../../components/Spinner";
    export default {
        name: "Products",
        components: {Spinner},
        data : function(){
            return {
                term : '',
                validator : window.validator
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
                
            }
        }
    }
</script>

<style scoped>
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