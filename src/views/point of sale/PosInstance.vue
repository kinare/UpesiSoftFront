<template>
    <div class="container-fluid">

<!--        sales display-->
        <div class="col-sm-6 border-right">
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
                                    <th class="text-left">Uom</th>
                                    <th class="text-left">Unit Price</th>
                                    <th class="text-left">Discount</th>
                                    <th class="text-left">Price</th>
                                    <th class="text-right"><i class="fa fa-trash"></i></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item , index) in items" :key="index"  @click="select(index)" :class="selected === index ? 'success' : ''">
                                    <td class="text-left pos-product-name"><strong>{{item.productName}}</strong><br>
                                        <small>{{item.productShortDescription}}</small>
                                    </td>

<!--                                    QTY-->
                                    <td class="text-left">
                                        <input v-if="selected === index && !item.subproduct"
                                               :disabled="item.subproduct"
                                               v-on:change="fieldUpdate(index, 'QTY')"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.qty"
                                               style="width: 20px;"
                                        >
                                        <span v-else>{{item.qty}}</span>
                                    </td>

<!--                                    unit of measure-->
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
                                                    style="width: 20px;"
                                            >
                                            <span class="input-group-addon"
                                                  id="basic-addon2">
                                                {{item.measurementAbbreviation}}
                                            </span>
                                        </div>
                                        <span v-else><span v-if="item.soldMeasurement !== '' && item.soldMeasurement !== null">{{item.soldMeasurement | number }}</span>  {{item.measurementAbbreviation}}</span>
                                    </td>

<!--                                    unit price-->
                                    <td class="text-left">
                                        <input v-on:change="fieldUpdate(index, 'UNIT_PRICE')"
                                               v-if="selected === index"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.unitPrice"
                                               style="width: 20px;"
                                        >
                                        <span v-else>{{item.unitPrice | currency}}</span>
                                    </td>

<!--                                    price adjustment-->
                                    <td class="text-left">
                                        <input v-on:change="fieldUpdate(index, 'DISCOUNT')"
                                               v-if="selected === index"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.discount"
                                               style="width: 20px;"
                                        >
                                        <span v-else>{{item.discount | currency}}</span>
                                    </td>

                                    <!-- price-->
                                    <td class="text-left">
<!--                                        <input v-if="selected === index"-->
<!--                                               type="number" min="1"-->
<!--                                               class="form-control input-sm"-->
<!--                                               v-model="item.price"-->
<!--                                        >-->
                                        <span>{{item.price | currency}}</span>
                                    </td>
                                    <td class="text-right" v-if="selected === index">
                                        <span class="badge badge-white" @click="removeItemByIndex(index)">
                                            <i class="fa fa-times text-danger"></i>
                                        </span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row m-r-xs">
                            <div class="col-xs-12">
                                <h2 class="text-right"><strong>Total : {{getTotalSales | currency}}</strong></h2>
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
                            <div v-if="can('view', 'customers')" class="col-xs-8 col-md-8 p-sm">
                                <router-link to="/pos/customers" class="btn btn-block btn-lg btn-white"><i class="fa fa-user-alt"></i> {{!validator.isEmptyObject(customer)? customer.isBusiness ? customer.customerBusinessName : customer.customerFirstName : 'Select Customer'}}</router-link>
                            </div>
                            <div class="col-xs-4 col-md-4  p-sm">
                                <button :disabled="items.length === 0" @click="preview = !preview" class="btn btn-block btn-default btn-lg">Preview</button>
                            </div>
                            <div class="col-xs-4 col-md-12 visible-xs p-sm">
                                <button class="btn btn-success btn-lg pull-right visible-xs">Add</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-4">
                                <router-link :class="totalSale === 0 ? 'disabled' : ''" :to="'/pos/payment/' + namespace.split('/').pop()" class="btn btn-lg btn-block btn-info pay-btn">Payment</router-link>
                            </div>
                            <div class="col-xs-4">
                                <a @click="postDocument('INVOICE')" :class="totalSale === 0 ? 'disabled' : ''" to="/pos/invoice" class="btn btn-lg btn-block btn-white pay-btn btn-block">Invoice</a>

                            </div>
                            <div class="col-xs-4">
                                <a @click="postDocument('QUOTE')" :class="totalSale === 0 ? 'disabled' : ''" to="/pos/quote" class="btn btn-lg btn-block btn-white pay-btn btn-block">Quote</a>
                            </div>
<!--                            <div class="col-xs-8">-->
<!--                                <div class="row no-pad">-->
<!--                                    <div class="col-xs-3">-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(1)">1</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(4)">4</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(7)">7</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate('+/-')">+/-</button>-->
<!--                                    </div>-->
<!--                                    <div class="col-xs-3">-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(2)">2</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(5)">5</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(8)">8</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(0)">0</button>-->
<!--                                    </div>-->
<!--                                    <div class="col-xs-3">-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(3)">3</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(6)">6</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate(9)">9</button>-->
<!--                                        <button class="btn btn-lg btn-white btn-block" @click="calculate('.')">.</button>-->
<!--                                    </div>-->
<!--                                    <div class="col-xs-3">-->
<!--                                        <button class="btn btn-lg btn-block" :class="operation === 'QTY' ? 'btn-success' : 'btn-white'" @click="setOperation('QTY')">Qty</button>-->
<!--                                        <button class="btn btn-lg btn-block" :class="operation === 'UNIT' ? 'btn-success' : 'btn-white'" @click="setOperation('UNIT')">Unit</button>-->
<!--                                        <button class="btn btn-lg btn-block" :class="operation === 'PRICE' ? 'btn-success' : 'btn-white'" @click="setOperation('PRICE')">Price</button>-->
<!--                                        <button class="btn btn-lg btn-danger btn-block" @click="removeItem()"><i class="fa fa-backspace"></i> </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!--        product display-->
        <div class="col-sm-6 col-xs-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Products</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs" :class="view === 'list' ? 'btn-primary' : 'btn-white'" @click="$store.commit('inventory/SET_VIEW', 'list')">
                            <i class="fa fa-list"></i>
                        </a>
                        <a class="btn btn-xs " :class="view === 'grid' ? 'btn-primary' : 'btn-white'" @click="$store.commit('inventory/SET_VIEW', 'grid')">
                            <i class="fa fa-th-large"></i>
                        </a>
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('inventory/getProducts')"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content "  :class="loading ? 'sk-loading' : ''">
                    <Spinner v-if="loading"/>

                    <div class="row m-b m-t" style="position: sticky">
                        <div class="col-xs-10 col-xs-push-1">
                            <form>
                                <div class="input-group">
                                    <input type="text" placeholder="Search Item" v-model="term" autofocus class="form-control">
                                    <div class="input-group-btn" >
                                        <button @click="term = ''"  class="btn btn-default" type="button">Clear</button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="search-items style-1">
                        <div v-if="view === 'list'" class="table-responsive product-list">
                            <table class="table table-hover table-condensed table-striped">
                                <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Full Items</th>
                                    <th>Pieces</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(product, index) in filteredProducts" v-bind:key="index" @click="product.sellAs === 'CUSTOM' ? getSubProducts(product) : addItem(product)" style="cursor: pointer">
                                    <td class="product-avatar"><img alt="image" :src="product.productImage || '/img/placeholder.jpg'"> </td>
                                    <td>
                                        {{product.productName}}<br>
                                        <small class="text-muted">{{product.productShortDescription}}</small>
                                    </td>
                                    <td>{{product.productCategoryName}}</td>
                                    <td>{{product.price | currency}}</td>
                                    <td><span class="badge badge-white">{{product.qty}}</span> </td>
                                    <td><span class="badge badge-white">{{product.sellAs === 'CUSTOM' ? product.pieces : '0'}}</span></td>
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

                        <div v-if="view === 'grid'" class="row">
                            <div class="col-lg-6" v-for="(product, index) in filteredProducts" v-bind:key="index" style="cursor: pointer">
                                <div class="prod-widget widget style1 white-bg" @click="product.sellAs === 'CUSTOM' ? getSubProducts(product) : addItem(product)">
                                    <div class="row">
                                        <div class="col-xs-4" style="position: relative">
                                            <span class="badge badge-info price-tag">{{product.price | currency}}</span>
                                            <img alt="image" class="m-t-md img-responsive" :src="product.productImage || '/img/placeholder.jpg'">
                                        </div>
                                        <div class="col-xs-8">
                                            <span> <strong>{{product.productName}}</strong></span><br>
                                            <small>Full : {{product.qty}}</small>&nbsp;&nbsp;
                                            <small v-if="product.sellAs === 'CUSTOM' ">Piece : {{product.pieces}}</small><br>
                                            <small title="category"><i class="fa fa-tag"></i> : {{product.productCategoryName}}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="validator.isEmptyObject(products)" class="aler alert-warning text-center m-t-lg p-lg">
                                <h1>No Products Found</h1>
                                <p>Contact Inventory manager for more info</p>
                            </div>
                        </div>
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
                        <h4 class="modal-title">{{subProduct.productName}} &nbsp; <span class="badge badge-primary">Full : {{subProduct.qty}}</span> &nbsp; <span class="badge badge-primary">Pieces : {{subProduct.pieces}}</span> </h4>
                        <small class="font-bold">{{subProduct.productDescription}}</small>
                    </div>
                    <div class="modal-body style-1" style="height: 400px; overflow-y: scroll">
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
                                <div class="row">
                                    <div class="col-xs-12">
                                        <button @click="addItem(subProduct); showModal = false"  class="btn btn-primary btn-lg btn-block">Select {{subProduct.productName + '(Full)'}}</button>
                                    </div>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" @click="showModal = false">Close</button>
                        <button type="button" class="btn btn-primary" @click="addSubProducts">Add Items</button>
                    </div>
                </div>
            </div>
        </div>

        <!--        preview modal-->
        <div  v-if="preview" class="modal fadeIn in modal-active"  :id="id" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="preview = false"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Sale preview</h4>
                        <small class="font-bold">{{items.length}} Items</small>
                    </div>
                    <div class="modal-body style-1" style="height: 460px; overflow-y: scroll">
                        <div class="row">
                            <div class="col-xs-12">
                                <table class="table small table-condensed table-striped">
                                    <thead>
                                    <tr>
                                        <th class="text-left pos-product-name">Item</th>
                                        <th class="text-left">Qty</th>
                                        <th class="text-left">Uom</th>
                                        <th class="text-left">Unit Price</th>
                                        <th class="text-left">Price</th>
                                        <th class="text-right"><i class="fa fa-trash"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item , index) in items" :key="index"  @click="select(index)" :class="selected === index ? 'success' : ''">
                                        <td class="text-left pos-product-name"><strong>{{item.productName}}</strong><br>
                                            <small>{{item.productShortDescription}}</small>
                                        </td>

                                        <!--                                    QTY-->
                                        <td class="text-left">
                                            <input v-if="selected === index && !item.subproduct"
                                                   :disabled="item.subproduct"
                                                   v-on:change="fieldUpdate(index, 'QTY')"
                                                   type="number" min="1"
                                                   class="form-control input-sm"
                                                   v-model="item.qty"
                                                   style="width: 20px;"
                                            >
                                            <span v-else>{{item.qty}}</span>
                                        </td>

                                        <!--                                    unit of measure-->
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
                                                        style="width: 20px;"
                                                >
                                                <span class="input-group-addon">
                                                {{item.measurementAbbreviation}}
                                            </span>
                                            </div>
                                            <span v-else><span v-if="item.soldMeasurement !== '' && item.soldMeasurement !== null">{{item.soldMeasurement | number }}</span>  {{item.measurementAbbreviation}}</span>
                                        </td>

                                        <!--                                    unit price-->
                                        <td class="text-left">
                                            <input v-on:change="fieldUpdate(index, 'UNIT_PRICE')"
                                                   v-if="selected === index"
                                                   type="number" min="1"
                                                   class="form-control input-sm"
                                                   v-model="item.unitPrice"
                                                   style="width: 20px;"
                                            >
                                            <span v-else>{{item.unitPrice | currency}}</span>
                                        </td>

                                        <!-- price-->
                                        <td class="text-left">
                                            <!--                                        <input v-if="selected === index"-->
                                            <!--                                               type="number" min="1"-->
                                            <!--                                               class="form-control input-sm"-->
                                            <!--                                               v-model="item.price"-->
                                            <!--                                        >-->
                                            <span>{{item.price | currency}}</span>
                                        </td>
                                        <td class="text-right" v-if="selected === index">
                                            <span class="badge badge-white" @click="removeItemByIndex(index)">
                                                <i class="fa fa-times text-danger"></i>
                                            </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" @click="preview = false">Close</button>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    import Spinner from "../../components/Spinner";
    import Pos from "../../modules/store/pos/pos";
    import permissions from "../../modules/mixins/Permissions";
    import sanitizer from "../../modules/mixins/SanitizeRecords";
    const posController  = new Pos();
    export default {
        name: "PosInstance",
        props : ['namespace', 'id'],
        components: {Spinner},
        mixins : [permissions, sanitizer],
        data : function(){
            return {
                preview : false,
                scope : 'customers',
                selectedSubProducts : [],
                selectedAllSubProducts : [],
                selectedParentProduct : {},
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
                    : this.sanitize(this.products).filter(product => {
                        return product.productName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.productShortDescription.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.price.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.salePrice.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.measurement.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.sellAs.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.availableFrom.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.availableTo.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.productColor.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.measurementName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.productCategoryName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
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
            products(){return this.$store.getters['inventory/posProducts']},
            subProducts(){return this.$store.getters['inventory/subProducts']},
            units(){return this.$store.getters['inventory/measurementUnit']},
            loading(){return this.$store.getters['inventory/loading']},
            message(){return this.$store.getters['inventory/message']},
            status(){return this.$store.getters['inventory/status']},
            view(){return this.$store.getters['inventory/view']},
            getUom(){return this.$store.getters['inventory/getMeasurementUnit']},


            //pos
            items(){return this.$store.getters[this.namespace + '/items']},
            getTotalSales(){return this.$store.getters[this.namespace + '/totalSales']},
            getItem(){return this.$store.getters[this.namespace + '/getItem']},
            customer(){return this.$store.getters[this.namespace + '/customer']},
        },
        methods : {
            addItem : function (product) {

                // check for item in sale
                let item = this.items.filter(item => item.id === product.id)

                if (item.length === 0){ // if item not in sale add...
                    let prod = {...product};
                    prod.productId = product.subproduct ? this.subProduct.id  : prod.id;
                    product.subproduct = product.subproduct ? true : false
                    // prod.subProductId =  prod.id;
                    prod.measurement = prod.measurement === null ? 1 : prod.measurement;
                    prod.soldMeasurement = prod.measurement; //1 as the default sold measurment
                    prod.categories = '';
                    prod.measurementBefore = prod.measurement;
                    prod.measurementAfter = prod.measurement;
                    prod.qty = 1;
                    prod.maxUnit = prod.measurement;
                    prod.minUnit = prod.customSaleUnit ? prod.customSaleUnit : 1;
                    prod.itemPrice = prod.price;
                    prod.discount = 0;
                    this.$store.commit(this.namespace + '/SET_ITEMS', prod)
                }else {
                    if (item[0].sellAs === "FULL"){
                        item[0].qty++ ; // get item
                        item[0].price = item[0].qty * item[0].unitPrice ; // get item
                    } else {
                        let prod = {...product};
                        prod.productId = product.subproduct ? this.subProduct.id  : prod.id;
                        product.subproduct = product.subproduct ? true : false
                        // prod.subProductId =  prod.id;
                        prod.measurement = prod.measurement === null ? 1 : prod.measurement;
                        prod.soldMeasurement = prod.measurement; //1 as the default sold measurment
                        prod.categories = '';
                        prod.measurementBefore = prod.measurement;
                        prod.measurementAfter = prod.measurement;
                        prod.qty = 1;
                        prod.maxUnit = prod.measurement;
                        prod.minUnit = prod.customSaleUnit ? prod.customSaleUnit : 1;
                        prod.itemPrice = prod.price;
                        prod.discount = 0;
                        this.$store.commit(this.namespace + '/SET_ITEMS', prod)
                    }
                }
            },
            addSubProducts : function(){
                this.selectedSubProducts.forEach(product => {
                    product.subproduct = true;
                    product.subProductId = product.id;
                    product.productShortDescription = this.subProduct.productShortDescription;
                    product.sellAs = 'CUSTOM';
                    this.addItem(product);
                    this.showModal = false
                });
                // eslint-disable-next-line no-undef
                $('#subProducts').modal('hide');
            },
            getSubProducts : function(product){
                this.subProduct = product;
                this.$store.commit('inventory/SET_SUB_PRODUCTS', []);

                if(product.pieces !== 0)
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
            postDocument : function(type){
             const params = {
                 title : 'Confirmation',
                 text : `Are you sure to post ${type.toLowerCase()}?`,
                 onConfirm : () => {
                     //set document type
                     this.documentType = type;

                     let path  = '';
                     switch(this.documentType){
                         case "INVOICE":
                             path = `/pos/invoice/${this.namespace.split('/').pop()}`;
                             break;
                         case "QUOTE":
                             path = `/pos/quote/${this.namespace.split('/').pop()}`
                             break;
                     }

                     //post order data
                     this.$store.commit(`${this.namespace}/SET_DOCUMENT`,
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


                     // set customer before posting document
                     if (window.validator.isEmptyObject(this.customer)) {
                         this.$router.push('/pos/customers/' + btoa(path))
                     }else {
                         //push to document
                         this.$router.push(path);
                     }
                 }
             };
             this.$confirm.show(params);
            },
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
    @media (min-width: 992px){
        .modal-lg {
            width: 1200px;
        }
    }

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
        height: 44vh;
        position: relative;
        overflow-y: scroll;
        /*padding: 10px;*/
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
        height: 52vh;
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
