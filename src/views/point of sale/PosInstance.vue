<template>
    <div class="container-fluid">
        <div class="col-sm-5 border-right">
<!--            pos display-->
            <div class="row">
                <div class="ibox" style="margin-bottom: 0;">
                    <div class="ibox-content pos-display">
                        <div class="row pos-items">
                            <table class="table small table-condensed table-striped">
                                <thead>
                                <tr>
                                    <th class="text-left">Item</th>
                                    <th class="text-left">Qty</th>
                                    <th class="text-left">Measure</th>
                                    <th class="text-right">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item , index) in items" :key="index"  @click="select(index)" :class="selected === index ? 'success' : ''">
                                    <td class="text-left"><strong>{{item.productName}}</strong><br>
                                        <small>{{item.productShortDescription}}</small>
                                    </td>
                                    <td class="text-left">
                                        <input v-if="selected === index"
                                               :disabled="item.sellAs === 'CUSTOM'"
                                               v-on:change="fieldUpdate(index, 'QTY')"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.qty"
                                        >
                                        <span v-else>{{item.qty}}</span>
                                    </td>
                                    <td class="text-left">
                                        <div v-if="selected === index" class="input-group">
                                            <input  v-on:change="fieldUpdate(index, 'UNIT')"
                                                    :disabled="item.sellAs === 'FULL'"
                                                    aria-describedby="basic-addon2"
                                                    type="number"
                                                    :min="item.minUnit"
                                                    :max="item.maxUnit"
                                                    class="form-control input-sm"
                                                    v-model="item.measurement"
                                            >
                                            <span class="input-group-addon"
                                                  id="basic-addon2">
                                                {{getUom(item.measurementUnit)[0].measurementAbbreviation}}
                                            </span>
                                        </div>
                                        <span v-else>{{item.measurement}}{{getUom(item.measurementUnit)[0].measurementAbbreviation}}</span>
                                    </td>
                                    <td class="text-right">
                                        <input v-if="selected === index"
                                               type="number" min="1"
                                               class="form-control input-sm"
                                               v-model="item.salePrice"
                                        >
                                        <span v-else>{{item.salePrice}}</span>
                                    </td>
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
                                <router-link :class="totalSale === 0 ? 'disabled' : ''" to="/pos/invoice" class="btn btn-lg btn-block btn-white btn-block">Invoice</router-link>
                                <router-link :class="totalSale === 0 ? 'disabled' : ''" to="/pos/quote" class="btn btn-lg btn-block btn-white btn-block">Quote</router-link>
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
        <div class="col-sm-7 col-xs-12">
            <div class="col-xs-12">
                <div class="row">
                    <form>
                        <div class="input-group">
                            <input type="text" placeholder="Search Item" v-model="term" class="form-control">
                            <div class="input-group-btn">
                                <button class="btn  btn-primary" type="submit">
                                    Search
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="row text-center p-xs">
                    <div class="btn-group-xs">
                        <button class="btn btn-white m-xs">1/4 m</button>
                        <button class="btn btn-white m-xs">1/2 m</button>
                        <button class="btn btn-white m-xs">1 m</button>
                        <button class="btn btn-white m-xs">2 m</button>
                        <button class="btn btn-white m-xs">full</button>
                    </div>
                </div>
                <div class="hr-line-dashed" style="margin: 5px"></div>
                <div class="ibox-content search-items" :class="loading ? 'sk-loading' : ''" style="background-color: #FAFBFB; border: none; padding: 0">
                    <Spinner v-if="loading"/>
                    <div v-for="(product, index) in filteredProducts" v-bind:key="index"  class="file-box">
                        <div class="file">
                            <a @click="addItem(product)">
                                <span class="corner" :class="product.state ? 'available': 'unavailable'"></span>
                                <div class="image">
                                    <img alt="image" class="img-responsive" src="/img/p1.jpg">
                                </div>
                                <div class="file-name">
                                    <h5 style="line-height: 1; margin-bottom: -5px">{{product.productName}}</h5>
                                    <br>
                                    <small>QTY {{product.qty || 1}}</small>
                                    <span class="badge badge-info pull-right">Ksh {{product.salePrice === 0 ? product.price : product.salePrice}}</span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                        </div>
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
        props : ['namespace'],
        components: {Spinner},
        data : function(){
            return {
                selected : 0,
                operation : 'QTY',
                term : '',
                validator : window.validator,
            }
        },
        beforeCreate(){
            this.$store.dispatch('inventory/getProducts');
            this.$store.dispatch('inventory/getMeasurementUnits');
        },
        computed : {
            //getters
            totalSale(){
                return this.items.reduce((total, item) => parseInt(total) + parseInt(item.salePrice), 0)
            },
            filteredProducts () {
                let self = this;
                return this.term === ''
                    ? this.products
                    : this.products.filter(product => {
                        return product.productName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.productShortDescription.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.price === parseInt(self.term )>= 0
                            || product.salePrice === parseInt(self.term )>= 0
                            || product.measurement === parseInt(self.term )>= 0
                            || product.sellAs.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.availableFrom.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || product.availableTo.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                        // || product.categories.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    })
            },

            //Inventory
            products(){return this.$store.getters['inventory/products']},
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
                    let prod = Object.assign({}, product); // JSON.parse( JSON.stringify( product ) );
                    prod.qty = 1
                    prod.salePrice = product.salePrice === 0 ? product.price : product.salePrice
                    prod.measurement = product.measurement ? product.measurement : 1
                    prod.maxUnit = prod.measurement;
                    prod.minUnit = prod.customSaleUnit;
                    prod.itemPrice = prod.salePrice;
                    this.$store.commit(this.namespace + '/SET_ITEMS', prod)
                }
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
        },
    }
</script>
<style scoped>
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
        height: 66vh;
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
        width: 160px;
    }
</style>
