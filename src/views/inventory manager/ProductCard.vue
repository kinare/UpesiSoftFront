<template>
    <div class="row">
        <div class="col-md-5">
            <div class="image-imitation" :style="'background-image : url(' + (product.productImage || '/img/placeholder.jpg') + ')'" style="background-repeat: no-repeat; background-size: cover; background-position: center center"><!---->

            </div>
        </div>
        <div class="col-md-7">
            <div class="row">
                <a v-if="canDelete" @click="confirmDelete(product.id)" data-dismiss="modal" class="btn btn-default pull-right"><i class="fa fa-trash text-danger"></i> &nbsp;Delete</a>
                <a v-if="canUpdate" @click="editProduct(product)" data-dismiss="modal" class="btn btn-default pull-right"><i class="fa fa-edit"></i> &nbsp;Edit</a>
            </div>
            <h2 class="font-bold m-b-xs">
                {{product.productName}} <span class="badge badge-primary">{{product.qty}}</span>
            </h2>
            <small>{{product.productDescription}}</small>
            <hr>
            <div>
                <button v-if="canCreate" class="btn btn-info pull-right"><i class="fa fa-truck-loading"></i> &nbsp;Re-stock</button>
                <h1 class="product-main-price">Ksh {{product.price}} <small>{{product.unitPrice}} Per Unit</small> </h1>
            </div>
            <hr>
            <h4>{{product.productShortDescription}}</h4>
            <dl class="dl-horizontal m-t-md small">
                <dt>Measurment</dt>
                <dd>{{product.measurement + ' ' + product.measurementAbbreviation}}</dd>
                <dt>Categories</dt>
                <dd>{{product.categories}}</dd>
                <dt>Quantity</dt>
                <dd>{{product.qty}}</dd>
                <dt>Full Items</dt>
                <dd>{{product.sellAs === 'CUSTOM' ? product.qty : 0}}</dd>
                <dt>Pieces</dt>
                <dd>{{product.sellAs === 'FULL' ? product.qty : 0}}</dd>
                <dt>SKU</dt>
                <dd>{{product.sku}}</dd>
                <dt>Location</dt>
                <dd>{{product.storageLocation}}</dd>
                <dt>Date Created</dt>
                <dd>{{product.createdAt}}</dd>
            </dl>
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
                scope : 'products'
            }
        },
        methods : {
            editProduct : function (product) {
                this.$store.commit('inventory/SET_PRODUCT', product);
                this.$router.push('new')
            },
            confirmDelete : function(id){
                // eslint-disable-next-line no-undef
               if (confirm('Are you sure to delete?')){
                   this.$store.dispatch('inventory/removeProduct',  { data : {productId : id}})
               }
            },
        }
    }
</script>

<style scoped>

</style>