<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h4>{{validator.isEmptyObject(product) ? 'New' : 'Edit' }} Product</h4>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="tabs-container">
                                <div class="">
                                    <ul class="nav nav-tabs">
                                        <li :class="{active : activeTab === 1}"><a @click="activeTab = 1" ><i class="fa fa-wrench"></i> General</a></li>
                                        <li :class="{active : activeTab === 2}"><a @click="activeTab = 2" ><i class="fa fa-list-alt"></i> Inventory</a></li>
                                        <li :class="{active : activeTab === 3}"><a @click="activeTab = 3" ><i class="fa fa-tags"></i> Pricing</a></li>
                                        <li :class="{active : activeTab === 4}"><a @click="activeTab = 4" ><i class="fa fa-truck"></i>Shipping</a></li>
                                    </ul>
                                    <div class="tab-content m-b-lg">
                                        <div :class="{active : activeTab === 1}" id="general" class="tab-pane">
                                            <div class="panel-body">
                                                <div class="col-xs-12 tab-body">
                                                    <form method="get" class="form-horizontal">
                                                        <div class="form-group" :class="formDataError.productName.status">
                                                            <label class="col-sm-4 control-label">Name</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" v-model="formData.productName">
                                                                <span class="help-block">
                                                                    {{formDataError.productName.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" :class="formDataError.productShortDescription.status">
                                                            <label class="col-sm-4 control-label">Short Desc</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" v-model="formData.productShortDescription">
                                                                <span class="help-block">
                                                                    {{formDataError.productShortDescription.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" :class="formDataError.productDescription.status">
                                                            <label class="col-sm-4 control-label">Description</label>
                                                            <div class="col-sm-8">
                                                                <textarea class="form-control" v-model="formData.productDescription"></textarea>
                                                                <span class="help-block">
                                                                    {{formDataError.productDescription.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div :class="{active : activeTab === 2}" id="inventory" class="tab-pane">
                                            <div class="panel-body">
                                                <div class="col-xs-12 tab-body">
                                                    <form method="get" class="form-horizontal">
                                                        <div class="form-group" :class="formDataError.sku.status">
                                                            <label class="col-sm-4 control-label">SKU</label>
                                                            <div class="col-sm-8">
                                                                <input type="number" class="form-control" v-model="formData.sku">
                                                                <span class="help-block">
                                                                    {{formDataError.sku.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" :class="formDataError.qty.status">
                                                            <label class="col-sm-4 control-label">Quantity</label>
                                                            <div class="col-sm-8">
                                                                <input type="number" class="form-control" v-model="formData.qty">
                                                                <span class="help-block">
                                                                    {{formDataError.qty.message}}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="form-group" :class="formDataError.measurementUnitId.status">
                                                            <label class="col-sm-4 control-label">Unit of Measure</label>
                                                            <div class="col-sm-8">
                                                                <select class="form-control" v-model="formData.measurementUnitId">
                                                                    <option v-for="(unit, index) in units"  :value="unit.id" :key="index">{{unit.measurementName}} ({{unit.measurementAbbreviation}})</option>
                                                                </select>
                                                                <span class="help-block">
                                                                    {{formDataError.measurementUnitId.message}}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="form-group" :class="formDataError.measurement.status">
                                                            <label class="col-sm-4 control-label">Default Measure</label>
                                                            <div class="col-sm-8">
                                                                <input type="number" class="form-control" v-model="formData.measurement">
                                                                <span class="help-block">
                                                                    {{formDataError.measurement.message}}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="form-group" :class="formDataError.storageLocation.status">
                                                            <label class="col-sm-4 control-label">Location</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" v-model="formData.storageLocation">
                                                                <span class="help-block">
                                                                    {{formDataError.storageLocation.message}}
                                                                </span>
                                                            </div>
                                                        </div>


                                                        <div class="form-group" :class="formDataError.published.status">
                                                            <label class="col-sm-4 control-label">Publish</label>
                                                            <div class="col-sm-8">
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" v-model="formData.published"> Publish
                                                                </label>
                                                                <span class="help-block">
                                                                    {{formDataError.published.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" :class="formDataError.sellAs.status">
                                                            <label class="col-sm-4 control-label">Sell As</label>
                                                            <div class="col-sm-8">
                                                                <label class="checkbox-inline">
                                                                    <input type="radio" value="FULL" v-model="formData.sellAs"> Full
                                                                </label>
                                                                <label class="checkbox-inline">
                                                                    <input type="radio" value="CUSTOM" v-model="formData.sellAs" > Custom
                                                                </label>
                                                                <span class="help-block">
                                                                    {{formDataError.sellAs.message}}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div v-if="formData.sellAs === 'CUSTOM'" class="form-group" :class="formDataError.customSaleUnit.status">
                                                            <label class="col-sm-4 control-label">Sale Unit</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" v-model="formData.customSaleUnit">
                                                                <span class="help-block">
                                                                    {{formDataError.customSaleUnit.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div :class="{active : activeTab === 3}" id="pricing" class="tab-pane">
                                            <div class="panel-body">
                                                <div class="col-xs-12 tab-body">
                                                    <form method="get" class="form-horizontal">
                                                        <div class="form-group" :class="formDataError.price.status">
                                                            <label class="col-sm-4 control-label">Price</label>
                                                            <div class="col-sm-8">
                                                                <input type="number" class="form-control" v-model="formData.price">
                                                                <span class="help-block">
                                                                    {{formDataError.price.message}}
                                                                </span>
                                                            </div>
                                                        </div>
<!--                                                        <div class="form-group" :class="formDataError.salePrice.status">-->
<!--                                                            <label class="col-sm-4 control-label">Sale Price</label>-->
<!--                                                            <div class="col-sm-8">-->
<!--                                                                <input type="number" class="form-control" v-model="formData.salePrice">-->
<!--                                                                <span class="help-block">-->
<!--                                                                    {{formDataError.salePrice.message}}-->
<!--                                                                </span>-->
<!--                                                            </div>-->
<!--                                                        </div>-->
                                                        <div class="form-group" :class="formDataError.unitPrice.status">
                                                            <label class="col-sm-4 control-label">Price Per unit</label>
                                                            <div class="col-sm-8">
                                                                <input type="number" class="form-control" v-model="formData.unitPrice">
                                                                <span class="help-block">
                                                                    {{formDataError.unitPrice.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" :class="formDataError.taxClassId.status">
                                                            <label class="col-sm-4 control-label">Tax class</label>
                                                            <div class="col-sm-8">
                                                                <select class="form-control" v-model="formData.taxClassId">
                                                                    <option value="2">VAT 0</option>
                                                                    <option value="1">VAT 16</option>
                                                                </select>
                                                                <span class="help-block">
                                                                    {{formDataError.taxClassId.message}}
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div :class="{active : activeTab === 4}" id="shipping" class="tab-pane">
                                            <div class="panel-body">
                                                <div class="col-xs-12 tab-body">
                                                    <form method="get" class="form-horizontal">
                                                        <div class="form-group" :class="formDataError.availableFrom.status">
                                                            <label class="col-sm-4 control-label">Available From</label>
                                                            <div class="col-sm-8">
                                                                <DatePicker v-model="formData.availableFrom" lang="en" input-class="form-control"></DatePicker>
                                                                <span class="help-block">
                                                                    {{formDataError.availableFrom.message}}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div class="form-group" :class="formDataError.availableTo.status">
                                                            <label class="col-sm-4 control-label">Available to</label>
                                                            <div class="col-sm-8">
                                                                <DatePicker v-model="formData.availableTo"  lang="en" input-class="form-control"></DatePicker>
                                                                <span class="help-block">
                                                                    {{formDataError.availableTo.message}}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="row">
                                <!--categories-->
                                <div class="col-xs-12">
                                    <h4 class="tag-title">Categories</h4>
                                    <div class="form-group" :class="formDataError.categoryId.status">
                                        <select class="form-control" v-model="formData.categoryId">
                                            <option v-for="(category, index) in categories" :value="category.id" :key="index">{{category.productCategoryName}}</option>
                                        </select>
<!--                                        <div class="input-group" >-->
<!--                                           -->
<!--&lt;!&ndash;                                            <div class="input-group-btn">&ndash;&gt;-->
<!--&lt;!&ndash;                                                <button tabindex="-1" class="btn btn-primary" type="button" @click="addCategory()">Add</button>&ndash;&gt;-->
<!--&lt;!&ndash;                                            </div>&ndash;&gt;-->
<!--                                        </div>-->
                                        <span class="help-block">
                                            {{formDataError.categoryId.message}}
                                        </span>
                                    </div>

                                    <ul class="tag-list" style="padding: 0">
                                        <li v-for="(category, index) in formData.categories" :key="index">
                                        <a>{{category}} &nbsp; <i class="fa fa-times cat-icon" @click="formData.categories.splice(index, 1)"></i></a></li>
                                    </ul>
                                </div>

                                <!-- images-->
                                <div class="col-xs-12 m-t-lg">
                                    <h4>Product Image</h4>
                                    <label class="btn btn-block btn-white">
                                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                        <i class="fa fa-image" ></i> upload image
                                    </label>
                                    <dd class="product-image">
                                        <div class="product-imitation" :style="'background-image : url(' + url + ')'" style="background-repeat: no-repeat; background-size: cover; background-position: top center">
                                            {{url === '' ? '[ UPLOAD PHOTO ]' : ''}}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ibox-footer text-right">
                    <button v-if="activeTab === tabCount" type="button" class="btn btn-primary m-l" @click="addProduct"><i class="fa" :class="validator.isEmptyObject(product) ? 'fa-plus' : 'fa-save'" ></i>{{validator.isEmptyObject(product) ? ' Add' : ' Edit' }}  </button>
                    <button v-else type="button" class="btn btn-primary m-l" @click="activeTab++">Next <i class="fa fa-arrow-right"></i>  </button>
                    <button v-if="activeTab > 1" type="button" class="btn btn-white pull-left" @click="activeTab--"><i class="fa fa-arrow-left"></i>  Back  </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import DatePicker from 'vue2-datepicker'
    import Spinner from "../../components/Spinner";
    export default {
        name: "NewProduct",
        components: {Spinner, DatePicker },
        data : function () {
            return {
                url : '',
                activeTab : 1,
                tabCount : 4,
                category : '',
                validator : window.validator,
                formData : {
                    productName : '',
                    productDescription : '',
                    productShortDescription : '',
                    categoryId : '',
                    availableFrom : '',
                    availableTo : '',
                    sku : '',
                    price : '',
                    salePrice : '',
                    unitPrice : '',
                    measurementUnitId : '',
                    taxClassId : '',
                    published : '',
                    storageLocation : '',
                    sellAs : 'FULL',
                    customSaleUnit : 0,
                    measurement : '',
                    qty : '',
                    productImage : {},
                },
                formDataError : {
                    productName : {
                        status : '',
                        message : '',
                    },
                    productDescription : {
                        status : '',
                        message : '',
                    },
                    productShortDescription : {
                        status : '',
                        message : '',
                    },
                    categoryId : {
                        status : '',
                        message : '',
                    },
                    availableFrom : {
                        status : '',
                        message : '',
                    },
                    availableTo : {
                        status : '',
                        message : '',
                    },
                    sku : {
                        status : '',
                        message : '',
                    },
                    price : {
                        status : '',
                        message : '',
                    },
                    unitPrice : {
                        status : '',
                        message : '',
                    },
                    salePrice : {
                        status : '',
                        message : '',
                    },
                    measurementUnitId : {
                        status : '',
                        message : '',
                    },
                    taxClassId : {
                        status : '',
                        message : '',
                    },
                    published : {
                        status : '',
                        message : '',
                    },
                    storageLocation : {
                        status : '',
                        message : '',
                    },
                    sellAs : {
                        status : '',
                        message : '',
                    },
                    customSaleUnit : {
                        status : '',
                        message : '',
                    },
                    measurement : {
                        status : '',
                        message : '',
                    },
                    qty : {
                        status : '',
                        message : '',
                    },
                },
                rules : {
                    productName : 'required',
                    productDescription : 'optional',
                    productShortDescription : 'optional',
                    availableFrom : 'optional',
                    availableTo : 'optional',
                    categoryId : 'required',
                    sku : 'optional',
                    price : 'required',
                    unitPrice : 'required',
                    salePrice : 'optional',
                    measurementUnitId : 'required',
                    taxClassId : 'required',
                    published : 'optional',
                    storageLocation : 'optional',
                    sellAs : 'FULL',
                    customSaleUnit : 'optional',
                    measurement : 'optional',
                    qty : 'required',
                }
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                if (!v.validator.isEmptyObject(v.product)) v.formData = v.product
                v.url = v.product.productImage
                v.$store.dispatch('inventory/getMeasurementUnits');
                v.$store.dispatch('inventory/getCategories')
            })
        },
        beforeRouteLeave(to, from, next){
            this.$store.commit('inventory/SET_PRODUCT', {});
            next();
        },
        methods : {
            addCategory : function () {
                if (this.formData.categoryId.filter(cat => cat === this.category).length === 0 && this.category !== '') {
                    this.formData.categories.push(this.category);
                    this.category = ''
                }
            },
            addProduct : function () {
                //validation
                let res = window.validator.fields(this.formData, this.rules, this.formDataError)
                if (res.hasErrors){
                    this.formDataError = res.errors
                } else {

                    this.$store.dispatch('inventory/newProduct', window.helper.prepareFormData(this.formData));
                }
            },
            handleFileUpload(){
                this.formData.productImage = this.$refs.file.files[0];
                this.url = URL.createObjectURL(this.formData.productImage);
            }

        },
        computed : {
            ...mapState({
                product : state => state.inventory.product,
                units : state => state.inventory.measurementUnit,
                categories : state => state.inventory.categories,
                loading : state => state.inventory.loading,
                message : state => state.inventory.message,
            }),
        },
        watch : {
            message : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    if (n === 'success') {
                        this.$router.push('/dashboard/inventory-management/products')
                    }
                }
            }
        }

    }
</script>

<style scoped>
    /*.tab-body {*/
    /*    height: 400px;*/
    /*    overflow-y: scroll;*/
    /*}*/
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