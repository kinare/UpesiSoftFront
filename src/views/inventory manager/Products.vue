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
                                <select class="form-control" v-model="term">
                                    <option v-for="(category, index) in categories" :key="index" selected>{{category.productCategoryName}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-5 col-sm-push-4">
                            <form v-on:submit.prevent="searchProduct">
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search">
                                    <div class="input-group-btn">
                                        <button @click="term = ''" type="submit" class="btn btn-default" > <span class="fa fa-times"></span></button>
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
                                <th>Category</th>
                                <th>SKU</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>State</th>
                                <th>Full Items</th>
                                <th>Pieces</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(product, index) in filteredProducts" v-bind:key="index" style="cursor: pointer">
                                <td @click="openProduct(product)" class="product-avatar"><img alt="image" :src="product.productImage || '/img/placeholder.jpg'"> </td>
                                <td @click="openProduct(product)" >
                                    {{product.productName}}<br>
                                    <small class="text-muted">{{product.productShortDescription}}</small>
                                </td>
                                <td @click="openProduct(product)" >{{product.productDescription}}</td>
                                <td @click="openProduct(product)" >{{product.productCategoryName}}</td>
                                <td @click="openProduct(product)" >{{product.sku}}</td>
                                <td @click="openProduct(product)" >{{product.price}}</td>
                                <td @click="openProduct(product)" >{{product.salePrice}}</td>
                                <td @click="openProduct(product)" ><span class="badge" :class="product.state ? 'badge-info' : 'badge-warning'">{{product.state ? 'Available' : 'Unavailable'}}</span> </td>
                                <td @click="openProduct(product)" ><span class="badge badge-white">{{product.sellAs === 'FULL' ? product.qty : 0}}</span> </td>
                                <td @click="openProduct(product)" ><span class="badge badge-white">{{product.sellAs === 'CUSTOM' ? product.qty : 0}}</span></td>
                                <td class="col-md-2">
                                    <div class="btn-group-sm">
                                        <button v-if="canCreate" title="re-stock" @click="restockProduct(product)" class="btn btn-white" type="button"><i class="text-info fa fa-truck-loading"></i></button>
                                        <button v-if="canUpdate" title="edit" @click="editProduct(product)" class="btn btn-white" type="button"><i class="text-success fa fa-edit"></i></button>
                                        <button v-if="canDelete" title="remove"  @click="confirmRemoveProduct(product.id)" class="btn btn-white" type="button" ><i class="fa fa-trash text-danger"></i></button>
                                    </div>
                                </td>
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
                        <div class="col-xs-6 col-md-4 col-lg-3" v-for="(product, index) in filteredProducts" v-bind:key="index">
                            <div class="contact-box" style="padding: 5px; height: 100px; overflow: hidden">
                                <a @click="openProduct(product)">
                                    <div class="col-sm-4">
                                        <div class="text-center">
                                            <img alt="image" class="m-t-xs img-responsive" :src="product.productImage || '/img/placeholder.jpg'">
                                            <div class="m-t-xs font-bold">
                                                <span class="badge badge-info">Ksh {{product.price}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5><strong>{{product.productName}}</strong></h5>
                                        <small>Full : {{product.sellAs === 'CUSTOM' ? product.qty : 0}}</small>&nbsp;&nbsp;
                                        <small>Pieces : {{product.sellAs === 'FULL' ? product.qty : 0}}</small><br>
                                        <small>Category : {{product.productCategoryName}}</small>
                                    </div>
                                    <div class="clearfix"></div>
                                </a>
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

        <!-- Role Modal-->
        <div class="modal fadeIn" id="confirmProductDelete" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title text-center">Confirmation</h4>
                    </div>
                    <div class="modal-body text-center">
                        <h1>Are you sure to delete?</h1>
                        <br>
                        <div class="row ">
                            <a class="btn btn-primary btn-block" @click="removeProduct(selectedProductId)">Yes</a>
                            <a class="btn btn-white btn-block" data-dismiss="modal">No</a> &nbsp;&nbsp;
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
    import ProductCard from "./ProductCard";
    import DatePicker from 'vue2-datepicker'
    import permissions from "../../modules/mixins/Permissions";
    export default {
        name: "Products",
        components: {ProductCard, Spinner, DatePicker},
        mixins : [permissions],
        data : function(){
            return {
                scope : 'products',
                term : '',
                validator : window.validator,
                seletedProduct : {},
                selectedForRestock : {},
                selectedProductId : ''
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('inventory/getProducts');
                v.$store.dispatch('inventory/getCategories')
            })
        },
        computed : {
            filteredProducts () {
                let self = this;
                return this.term === ''
                    ? this.products
                    : this.products.filter(product => {
                        return product.productName ? product.productName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.productShortDescription ? product.productShortDescription.toLowerCase().indexOf(self.term.toLowerCase()) >= 0  : ''
                        || product.price ? product.price.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.salePrice ? product.salePrice.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.measurement ? product.measurement.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.sellAs ? product.sellAs.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.productCategoryName ? product.productCategoryName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.availableFrom ? product.availableFrom.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.availableTo ? product.availableTo.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        || product.categories ? product.categories.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    })
            },
            ...mapState('inventory',{
                products : state => state.products,
                categories : state => state.categories,
                loading : state => state.loading,
                view : state => state.view,
                message : state => state.message,
                status : state => state.status,
            }),
        },
        methods : {
            confirmRemoveProduct : function(id){
                this.selectedProductId = id
                // eslint-disable-next-line no-undef
                $("#confirmProductDelete").modal({backdrop:'static',keyboard:false, show:true});
            },
            removeProduct : function(id){
                this.$store.dispatch('inventory/removeProduct',  { data : {productId : id}})
                // eslint-disable-next-line no-undef
                $("#confirmProductDelete").modal('hide');
            },
            editProduct : function (product) {
                this.$store.commit('inventory/SET_PRODUCT', product);
                this.$router.push('new')
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
    .prod-image{
        padding: 50px 0;
        background-repeat:no-repeat;
        background-position: center center;
        background-size: cover;
        border-top: 1px solid #e7eaec ;
        border-left: 1px solid #e7eaec ;
        border-bottom: 1px solid #e7eaec;
    }
    .prod-desc{
        height: 101px;
        border-top: 1px solid #e7eaec;
        border-right: 1px solid #e7eaec;
        border-bottom: 1px solid #e7eaec;
    }
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