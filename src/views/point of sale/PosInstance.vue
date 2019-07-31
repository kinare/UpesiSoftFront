<template>
    <div class="container-fluid">

<!--        sales display-->
        <div class="col-sm-5 border-right">
<!--            pos display-->
            <div class="row">
                <div class="ibox" style="margin-bottom: 0;">
                    <div class="ibox-content pos-display">
                        <div class="row pos-items style-1">
                            <table class="table small table-condensed table-striped">
                                <thead>
                                <tr>
                                    <th class="text-left pos-product-name">Item</th>
                                    <th class="text-left">Qty</th>
                                    <th class="text-left">Measure</th>
                                    <th class="text-right">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item , index) in items" :key="index"  @click="select(index)" :class="selected === index ? 'success' : ''">
                                    <td class="text-left pos-product-name"><strong>{{item.productName}}</strong><br>
                                        <small>{{item.productShortDescription}}</small>
                                    </td>
                                    <td class="text-left">
                                        <input v-if="selected === index && item.sellAs !== 'CUSTOM'"
                                               :disabled="item.sellAs === 'CUSTOM'"
                                               v-on:change="fieldUpdate(index, 'QTY')"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.qty"
                                        >
                                        <span v-else>{{item.qty}}</span>
                                    </td>
                                    <td class="text-left">
                                        <div v-if="selected === index && item.sellAs !== 'FULL'" class="input-group">
                                            <input  v-on:change="fieldUpdate(index, 'UNIT')"
                                                    :disabled="item.sellAs === 'FULL'"
                                                    aria-describedby="basic-addon2"
                                                    type="number"
                                                    :min="item.minUnit"
                                                    :max="item.maxUnit"
                                                    class="form-control input-sm"
                                                    v-model="item.soldMeasurement"
                                            >
                                            <span class="input-group-addon"
                                                  id="basic-addon2">
                                                {{item.measurementAbbreviation}}
                                            </span>
                                        </div>
                                        <span v-else>{{item.soldMeasurement}}{{item.measurementAbbreviation}}</span>
                                    </td>
                                    <td class="text-right">
                                        <input v-if="selected === index"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.price"
                                        >
                                        <span v-else>{{item.price}}</span>
                                    </td>
                                    <td v-if="selected === index" ><span class="badge badge-white" @click="removeItemByIndex(index)"><i class="fa fa-times text-danger"></i> </span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row m-r-xs">
                            <div class="col-xs-12">
                                <h2 class="text-right"><strong>Total : Ksh {{getTotalSales}}</strong></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<!--            pos calculator-->
            <div class="row">
                <div class="ibox" style="margin-bottom: 0">
                    <div class="ibox-content pos-calc">
                        <div class="row">
                            <div class="col-xs-8 col-md-12 p-sm">
                                <router-link to="/pos/customers" class="btn btn-block btn-lg btn-white"><i class="fa fa-user-alt"></i> {{!validator.isEmptyObject(customer)? customer.isBusiness ? customer.customerBusinessName : customer.customerFirstName : 'Select Customer'}}</router-link>
                            </div>
                            <div class="col-xs-4 col-md-12 visible-xs p-sm">
                                <button class="btn btn-success btn-lg pull-right visible-xs">Add</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                                <router-link :class="totalSale === 0 ? 'disabled' : ''" :to="'/pos/payment/' + namespace.split('/').pop()" class="btn btn-lg btn-block btn-info pay-btn">Payment</router-link>
                                <a @click="postDocument('INVOICE')" :class="totalSale === 0 ? 'disabled' : ''" to="/pos/invoice" class="btn btn-lg btn-block btn-white btn-block">Invoice</a>
                                <a @click="postDocument('QUOTE')" :class="totalSale === 0 ? 'disabled' : ''" to="/pos/quote" class="btn btn-lg btn-block btn-white btn-block">Quote</a>
                            </div>
                            <div class="col-xs-8">
                                <div class="row no-pad">
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(1)">1</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(4)">4</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(7)">7</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate('+/-')">+/-</button>
                                    </div>
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(2)">2</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(5)">5</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(8)">8</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(0)">0</button>
                                    </div>
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(3)">3</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(6)">6</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(9)">9</button>
                                        <button class="btn btn-lg btn-white btn-block" @click="calculate('.')">.</button>
                                    </div>
                                    <div class="col-xs-3">
                                        <button class="btn btn-lg btn-block" :class="operation === 'QTY' ? 'btn-success' : 'btn-white'" @click="setOperation('QTY')">Qty</button>
                                        <button class="btn btn-lg btn-block" :class="operation === 'UNIT' ? 'btn-success' : 'btn-white'" @click="setOperation('UNIT')">Unit</button>
                                        <button class="btn btn-lg btn-block" :class="operation === 'PRICE' ? 'btn-success' : 'btn-white'" @click="setOperation('PRICE')">Price</button>
                                        <button class="btn btn-lg btn-danger btn-block" @click="removeItem()"><i class="fa fa-backspace"></i> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!--        product display-->
        <div class="col-sm-7 col-xs-12">
            <div class="col-xs-12">
                <div class="row m-b">
                    <div class="col-xs-10 col-xs-push-1">
                        <form>
                            <div class="input-group-lg">
                                <input type="text" placeholder="Search Item" v-model="term" autofocus class="form-control">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="ibox-content search-items style-1"  :class="loading ? 'sk-loading' : ''" style="background-color: #FAFBFB; border: none; padding: 0; margin: 0">
                    <Spinner v-if="loading"/>
                    <div class="col-xs-6" v-for="(product, index) in filteredProducts" v-bind:key="index">
                        <div class="contact-box" style="padding: 5px">
                            <a @click="product.sellAs === 'CUSTOM' ? getSubProducts(product) : addItem(product)">
                                <div class="col-sm-4">
                                    <div class="text-center">
                                        <img alt="image" class="m-t-xs img-responsive" src="img/a2.jpg">
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
                    <div v-if="validator.isEmptyObject(products)" class="aler alert-warning text-center m-t-lg p-lg">
                        <h1>No Products Found</h1>
                        <p>Contact Inventory manager for more info</p>
                    </div>
                </div>
            </div>
        </div>

<!--        sub product modal-->
        <div  v-if="showModal" class="modal fadeIn in modal-active"  :id="id" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="showModal = false"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">{{subProduct.productName}} &nbsp; <span class="badge badge-primary">{{subProducts.length}}</span> </h4>
                        <small class="font-bold">{{subProduct.productDescription}}</small>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row">
                                    <form>
                                        <div class="input-group-sm">
                                            <input type="text" placeholder="Search Item" v-model="subterm" class="form-control">
                                        </div>
                                    </form>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="ibox-content" :class="loading ? 'sk-loading' : ''" style="background-color: #FAFBFB; border: none;">
                                    <Spinner v-if="loading"/>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover table-condensed">
                                            <thead>
                                                <tr>
                                                    <td><input type="checkbox" value="All" v-model="selectedAllSubProducts" class="check-control"></td>
                                                    <th>Name</th>
                                                    <th>Units</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(product, index) in filteredSubProducts" v-bind:key="index">
                                                    <td><input type="checkbox" :value="product" v-model="selectedSubProducts" class="check-control"></td>
                                                    <td>{{product.productName}}</td>
                                                    <td>{{product.measurement + ' ' + product.measurementAbbreviation}}</td>
                                                    <td>Ksh {{product.price}}</td>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" @click="showModal = false">Close</button>
                        <button type="button" class="btn btn-primary" @click="addSubProducts">Add Items</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from "../../components/Spinner";
    import Pos from "../../modules/store/pos/pos";
    const posController  = new Pos();
    export default {
        name: "PosInstance",
        props : ['namespace', 'id'],
        components: {Spinner},
        data : function(){
            return {
                selectedSubProducts : [],
                selectedAllSubProducts : [],
                selected : 0,
                subProduct : {},
                operation : 'QTY',
                term : '',
                subterm : '',
                validator : window.validator,
                showModal : false,
                documentType : '',
            }
        },
        beforeCreate(){
            this.$store.dispatch('inventory/getProducts');
            this.$store.dispatch('inventory/getMeasurementUnits');
        },
        computed : {
            //getters
            totalSale(){
                return this.items.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)
            },
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
                            || product.availableFrom ? product.availableFrom.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                            || product.availableTo ? product.availableTo.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                        // || product.categories.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    })
            },
            filteredSubProducts () {
                let self = this;
                return this.subterm === ''
                    ? this.subProducts
                    : this.subProducts.filter(product => {
                        return product.price.toString().toLowerCase().indexOf(self.subterm.toLowerCase()) >= 0
                            || product.salePrice.toString().toLowerCase().indexOf(self.subterm.toLowerCase()) >= 0
                            || product.measurement.toString().toLowerCase().indexOf(self.subterm.toLowerCase()) >= 0
                            || product.sku.toString().toLowerCase().indexOf(self.subterm.toLowerCase()) >= 0
                            || product.productName.toLowerCase().indexOf(self.subterm.toLowerCase()) >= 0
                    })
            },

            //Inventory
            products(){return this.$store.getters['inventory/products']},
            subProducts(){return this.$store.getters['inventory/subProducts']},
            units(){return this.$store.getters['inventory/measurementUnit']},
            loading(){return this.$store.getters['inventory/loading']},
            message(){return this.$store.getters['inventory/message']},
            status(){return this.$store.getters['inventory/status']},
            getUom(){return this.$store.getters['inventory/getMeasurementUnit']},


            //pos
            items(){return this.$store.getters[this.namespace + '/items']},
            getTotalSales(){return this.$store.getters[this.namespace + '/totalSales']},
            getItem(){return this.$store.getters[this.namespace + '/getItem']},
            customer(){return this.$store.getters[this.namespace + '/customer']},
        },
        methods : {
            addItem : function (product) {
                if (this.items.filter(item => item.id === product.id).length === 0){
                    let prod = {...product}; // JSON.parse( JSON.stringify( product ) );
                    prod.productId = product.subproduct ? this.subProduct.id  : prod.id
                    // prod.subProductId =  prod.id;
                    prod.soldMeasurement = prod.measurement;
                    prod.categories = '';
                    prod.measurementBefore = prod.measurement;
                    prod.measurementAfter = prod.measurement;
                    prod.price = product.salePrice === 0 ? product.price : product.salePrice;
                    prod.qty = 1;
                    prod.maxUnit = prod.measurement;
                    prod.minUnit = prod.customSaleUnit;
                    prod.itemPrice = prod.price;
                    this.$store.commit(this.namespace + '/SET_ITEMS', prod)
                }
            },
            addSubProducts : function(){
                this.selectedSubProducts.forEach(product => {
                    product.subproduct = true
                    product.subProductId = product.id
                    product.productShortDescription = this.subProduct.productShortDescription
                    product.sellAs = 'CUSTOM'
                    this.addItem(product);
                    this.showModal = false
                });
                // eslint-disable-next-line no-undef
                $('#subProducts').modal('hide');
            },
            getSubProducts : function(product){
                this.subProduct = product
                this.$store.dispatch('inventory/getSubProducts', product.id);
                this.showModal = true
                // eslint-disable-next-line no-undef
                $('#subProducts').modal('show');
            },
            select : function (index) {
                this.selected = index;
            },
            setOperation : function (operation){
                this.operation = operation;
            },
            removeItem : function () {
                this.$store.commit(this.namespace + '/UNSET_ITEMS', this.selected);
            },
            removeItemByIndex : function(index){
                this.$store.commit(this.namespace + '/UNSET_ITEMS', index);
            },
            calculate : function (input) {
                if (this.items.length !== 0){
                    let formulae = {
                        input : input,
                        operand : this.getItem(this.selected),
                        operation : this.operation
                    };

                    this.$store.commit(
                        this.namespace + '/UPDATE_SALE',
                        {
                            index : this.selected,
                            item : posController.performOperation(formulae)
                        }
                    )
                }
            },
            fieldUpdate : function (index, field) {
                this.$store.commit(
                    this.namespace + '/UPDATE_SALE',
                    {
                        index : index,
                        item : posController.updateSale(this.getItem(index), field)
                    }
                )
            },
            postDocument : function (type) {

                //set document type
                this.documentType = type;

                // set customer before posting document
                if (window.validator.isEmptyObject(this.customer)) {
                    this.$router.push('/pos/customers')
                }else {

                    //post order data
                    this.$store.commit(`${this.namespace}/SET_DOCUMENT` ,
                        posController.prepareDocument(
                            type,
                            this.customer,
                            this.items,
                            {
                                total : this.getTotalSales,
                                tendered : 0,
                                change : 0,
                                method : 'CASH'
                            }
                        )
                    );

                    let path  = '';
                    switch(this.documentType){
                        case "INVOICE":
                            path = 'invoice';
                            break;
                        case "QUOTE":
                            path = 'quote'
                            break;
                    }

                    //push to document
                    this.$router.push(`/pos/${path}/${this.namespace.split('/').pop()}`);
                }
            }
        },
        watch : {
            selectedAllSubProducts : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    if (n[0] === 'All') {
                        //Clear selected products
                        this.selectedSubProducts = [];
                        //Add all sub products
                        this.filteredSubProducts.forEach(product => {
                            this.selectedSubProducts.push(product)
                        })
                    }else{
                        //Unselect all sub products
                        this.selectedSubProducts = [];
                    }

                }
            },
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
    .pos-product-name{
        min-width: 115px;
    }
    .check-control{
        height: 20px !important;
    }
    .modal-active{
        display:block;
    }
    td input {
        min-width: 70px
    }
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


    .search-items{
        height: 80vh;
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
        width: 195px;
        /*width: 160px;*/
    }


</style>
