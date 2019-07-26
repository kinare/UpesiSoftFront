<template>
    <div class="row">
        <div class="col-md-5">
            <div class="image-imitation">
                [IMAGE 1]
            </div>
        </div>
        <div class="col-md-7">
            <div class="row">
                <button class="btn btn-default pull-right"><i class="fa fa-edit"></i> &nbsp;Edit</button>
            </div>
            <h2 class="font-bold m-b-xs">
                {{product.productName}} <span class="badge badge-primary">{{product.qty}}</span>
            </h2>
            <small>{{product.productDescription}}</small>
            <hr>
            <div>
                <button class="btn btn-info pull-right"><i class="fa fa-truck-loading"></i> &nbsp;Re-stock</button>
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
            <div class="text-right">
                <div class="btn-group">
                    <button class="btn btn-white btn-sm"><i class="fa fa-star"></i> Add to wishlist </button>
                    <button class="btn btn-white btn-sm"><i class="fa fa-envelope"></i> Contact with supplier </button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductCard",
        props : ['product'],
        data : function () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>