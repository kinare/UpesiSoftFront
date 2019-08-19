<template>
    <div class="row">
        <div class="col-md-5">
            <div class="image-imitation" :style="'background-image : url(' + (product.productImage || '/img/placeholder.jpg') + ')'" style="background-repeat: no-repeat; background-size: cover; background-position: center center"><!---->

            </div>
            <br>
            <span class="label label-default m-r-sm">Category : {{product.productCategoryName}}</span>
            <span class="label label-default m-r-sm">SKU : {{product.sku}}</span>
            <span class="label label-default m-r-sm">Location : {{product.storageLocation}}</span> <br><br>
            <span class="label label-default m-r-sm">Date : {{product.createdAt}}</span>


        </div>
        <div class="col-md-7">
            <div class="row">
                <a v-if="canDelete" @click="confirmDelete(product.id)" data-dismiss="modal" class="btn btn-default pull-right"><i class="fa fa-trash text-danger"></i> &nbsp;Delete</a>
                <a v-if="canUpdate" @click="editProduct(product)" data-dismiss="modal" class="btn btn-default pull-right"><i class="fa fa-edit"></i> &nbsp;Edit</a>
            </div>
            <h2 class="font-bold m-b-xs">
                {{product.productName}} <span class="badge badge-primary">{{product.qty}} {{product.measurementAbbreviation}}</span>
            </h2>
            <small>{{product.productDescription}}</small>

            <hr>
            <div class="m-b-sm">
                <button v-if="canCreate" class="btn btn-info pull-right"><i class="fa fa-truck-loading"></i> &nbsp;Re-stock</button>
                <h1 class="product-main-price">{{product.price | currency}} <small>{{product.unitPrice | currency}} Per Unit</small> </h1>
            </div>
            <hr>

            <div class="row">
                <div class="col-xs-12">
                    <div class="table-responsive style-1" style="max-height: 200px; overflow-y: scroll">
                        <table class="table table-striped table-hover table-condensed">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Units</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(product, index) in subProducts" v-bind:key="index">
                                <td>{{product.productName}}</td>
                                <td>{{product.measurement | number}} {{product.measurementAbbreviation}}</td>
                                <td>{{product.price | currency}}</td>
                            </tr>
                            <tr>
                                <td colspan="4" v-if="validator.isEmptyObject(subProducts)" class="text-center">No Sub-products Found</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import permissions from "../../modules/mixins/Permissions";

    export default {
        name: "ProductCard",
        props : ['product'],
        mixins : [permissions],
        data : function () {
            return {
                scope : 'products',
                validator : window.validator
            }
        },
        computed : {
            subProducts(){return this.$store.getters['inventory/subProducts']},
        },
        methods : {
            editProduct : function (product){
                this.$store.commit('inventory/SET_PRODUCT', product);
                this.$router.push('new')
            },
            confirmDelete : function(id){
                // eslint-disable-next-line no-undef
               if (confirm('Are you sure to delete?')){
                   this.$store.dispatch('inventory/removeProduct',  { data : {productId : id}})
               }
            },
        },
        watch : {
            product : {
                handler : function (n, o) {
                    this.$store.dispatch('inventory/getSubProducts', n.id);

                }
            }
        }
    }
</script>

<style scoped>

</style>