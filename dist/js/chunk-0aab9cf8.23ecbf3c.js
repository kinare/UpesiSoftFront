(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0aab9cf8"],{2375:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sk-spinner sk-spinner-double-bounce"},[n("div",{staticClass:"sk-double-bounce1"}),n("div",{staticClass:"sk-double-bounce2"})])}],i={name:"Spinner"},r=i,c=n("2877"),o=Object(c["a"])(r,s,a,!1,null,"5cbedca4",null);e["a"]=o.exports},"2e3f":function(t,e,n){},"77c0":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid p-sm"},[n("div",{staticClass:"row"},[n("div",{staticClass:"tabs-container"},[n("ul",{staticClass:"nav nav-tabs"},[t._l(t.tabs,function(e,s){return n("li",{key:s,class:e.status},[n("a",{on:{click:function(e){return t.switchTab(s)}}},[t._v("\n                        "+t._s(e.name)+"   \n                    ")]),"active"===e.status&&t.tabs.length>1?n("span",{staticClass:"badge close-tab"},[n("i",{staticClass:"fa fa-times text-white ",on:{click:function(n){return t.closeTab(s,e.no)}}})]):t._e()])}),n("li",[n("a",[n("i",{staticClass:"fa fa-plus",on:{click:t.newTab}})])])],2),n("div",{staticClass:"tab-content"},t._l(t.tabs,function(t,e){return n("div",{key:e,staticClass:"tab-pane",class:t.status,attrs:{id:t.id}},[n("div",{staticClass:"panel-body"},[n("pos-instance",{attrs:{namespace:t.namespace}})],1)])}),0)])])])},a=[],i=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),r=n("2f62"),c={name:"",id:"",namespace:"",status:"",no:0},o=c,l=n("8804");function u(t,e){return m(t)||d(t,e)||b()}function m(t){if(Array.isArray(t))return t}function d(t,e){var n=[],s=!0,a=!1,i=void 0;try{for(var r,c=t[Symbol.iterator]();!(s=(r=c.next()).done);s=!0)if(n.push(r.value),e&&n.length===e)break}catch(o){a=!0,i=o}finally{try{s||null==c["return"]||c["return"]()}finally{if(a)throw i}}return n}function b(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function p(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.reduce(function(t,e){var n=e.split(".").slice(-1)[0];if(t[n])throw new Error("The key `".concat(n,"` is already in use."));return t[n]=e,t},{})}function f(t){return function(){for(var e=arguments.length,n=new Array(e),s=0;s<e;s++)n[s]=arguments[s];var a="string"===typeof n[0]?[].concat(n):[""].concat(n),i=u(a,4),r=i[0],c=i[1],o=i[2],l=i[3];return r.length&&"/"!==r.charAt(r.length-1)&&(r+="/"),o="".concat(r).concat(o||"getField"),l="".concat(r).concat(l||"updateField"),t(r,c,o,l)}}function v(t){return function(e){return e.split(/[.[\]]+/).reduce(function(t,e){return t[e]},t)}}function h(t,e){var n=e.path,s=e.value;n.split(/[.[\]]+/).reduce(function(t,e,n,a){return a.length===n+1&&(t[e]=s),t[e]},t)}f(function(t,e,n,s){var a=Array.isArray(e)?p(e):e;return Object.keys(a).reduce(function(t,e){var i=a[e],r={get:function(){return this.$store.getters[n](i)},set:function(t){this.$store.commit(s,{path:i,value:t})}};return t[e]=r,t},{})}),f(function(t,e,n,s){var a=Array.isArray(e)?p(e):e;return Object.keys(a).reduce(function(t,e){var i=a[e];return t[e]={get:function(){var t=this.$store,e=t.getters[n](i);return e.map(function(e,a){return Object.keys(e).reduce(function(e,r){var c="".concat(i,"[").concat(a,"].").concat(r);return Object.defineProperty(e,r,{get:function(){return t.getters[n](c)},set:function(e){t.commit(s,{path:c,value:e})}})},{})})}},t},{})});var g=function(){return{items:[],name:"tab module",payment:{tendered:0,due:"",change:0,method:"Cash",customer:{}},oderNo:"",receipt:[],invoice:{header:{},lines:[]},quote:{header:{},lines:[]},customer:"",message:"",status:"",loading:!1}},C={updateField:h,SET_ITEMS:function(t,e){t.items.push(e)},UNSET_ITEMS:function(t,e){t.items.splice(e,1)},UPDATE_SALE:function(t,e){t.items[e.index]=e.item},SET_RECEIPT:function(t,e){t.receipt=e},SET_INVOICE:function(t,e){t.invoice.header=e.header,t.invoice.lines=e.lines},SET_QUOTE:function(t,e){t.quote.header=e.header,t.quote.lines=e.lines},SET_LOADING:function(t,e){t.loading=e},SET_MESSAGE:function(t,e){t.message=e.message||"Something went wrong",t.status=e.status||"alert-warning"},SET_CUSTOMER:function(t,e){t.customer=e},SET_ORDER_NO:function(t,e){t.oderNo=e}},_={getField:v,totalSales:function(t){return t.items.reduce(function(t,e){return parseInt(t)+parseInt(e.price)},0)},getItem:function(t){return function(e){return t.items[e]}},items:function(t){return t.items},payment:function(t){return t.payment},customer:function(t){return t.customer},loading:function(t){return t.loading},oderNo:function(t){return t.oderNo},receipt:function(t){return t.receipt.shift()},invoice:function(t){return t.invoice},quote:function(t){return t.quote}},w={generateReceipt:function(t,e){t.commit("SET_LOADING",!0),window.api.call("post",l["a"].generateReceipt,e).then(function(e){t.commit("SET_ORDER_NO",e.data.data.orderId),t.commit("SET_LOADING",!1)}).catch(function(e){t.commit("SET_MESSAGE",{message:e.response.data.message,status:"alert-warning"}),t.commit("SET_LOADING",!1)})},getDocument:function(t,e){t.commit("SET_LOADING",!0),window.api.call("get",l["a"].document(e)).then(function(e){t.commit("SET_RECEIPT",e.data.data),t.commit("SET_LOADING",!1)}).catch(function(e){t.commit("SET_MESSAGE",{message:e.response.data.message,status:"alert-warning"}),t.commit("SET_LOADING",!1)})}},y={state:g,mutations:C,getters:_,actions:w,endpoints:l["a"]},k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"col-sm-5 border-right"},[n("div",{staticClass:"row"},[n("div",{staticClass:"ibox",staticStyle:{"margin-bottom":"0"}},[n("div",{staticClass:"ibox-content pos-display"},[n("div",{staticClass:"row pos-items"},[n("table",{staticClass:"table small table-condensed table-striped"},[t._m(0),n("tbody",t._l(t.items,function(e,s){return n("tr",{key:s,class:t.selected===s?"success":"",on:{click:function(e){return t.select(s)}}},[n("td",{staticClass:"text-left"},[n("strong",[t._v(t._s(e.productName))]),n("br"),n("small",[t._v(t._s(e.productShortDescription))])]),n("td",{staticClass:"text-left"},[t.selected===s?n("input",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"item.qty"}],staticClass:"form-control input-sm",attrs:{disabled:"CUSTOM"===e.sellAs,type:"number",min:"1"},domProps:{value:e.qty},on:{change:function(e){return t.fieldUpdate(s,"QTY")},input:function(n){n.target.composing||t.$set(e,"qty",n.target.value)}}}):n("span",[t._v(t._s(e.qty))])]),n("td",{staticClass:"text-left"},[t.selected===s?n("div",{staticClass:"input-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.soldMeasurement,expression:"item.soldMeasurement"}],staticClass:"form-control input-sm",attrs:{disabled:"FULL"===e.sellAs,"aria-describedby":"basic-addon2",type:"number",min:e.minUnit,max:e.maxUnit},domProps:{value:e.soldMeasurement},on:{change:function(e){return t.fieldUpdate(s,"UNIT")},input:function(n){n.target.composing||t.$set(e,"soldMeasurement",n.target.value)}}}),n("span",{staticClass:"input-group-addon",attrs:{id:"basic-addon2"}},[t._v("\n                                                "+t._s(t.getUom(e.measurementUnit)[0].measurementAbbreviation)+"\n                                            ")])]):n("span",[t._v(t._s(e.soldMeasurement)+t._s(t.getUom(e.measurementUnit)[0].measurementAbbreviation))])]),n("td",{staticClass:"text-right"},[t.selected===s?n("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"item.price"}],staticClass:"form-control input-sm",attrs:{type:"number",min:"1"},domProps:{value:e.price},on:{input:function(n){n.target.composing||t.$set(e,"price",n.target.value)}}}):n("span",[t._v(t._s(e.price))])])])}),0)])]),n("div",{staticClass:"row m-r-xs"},[n("div",{staticClass:"col-xs-12"},[n("h2",{staticClass:"text-right"},[n("strong",[t._v("Total : Ksh "+t._s(t.getTotalSales))])])])])])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"ibox",staticStyle:{"margin-bottom":"0"}},[n("div",{staticClass:"ibox-content pos-calc"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-8 col-md-12 p-sm"},[n("router-link",{staticClass:"btn btn-block btn-lg btn-white",attrs:{to:"/pos/customers"}},[n("i",{staticClass:"fa fa-user-alt"}),t._v(" "+t._s(t.validator.isEmptyObject(t.customer)?"Select Customer":t.customer.isBusiness?t.customer.customerBusinessName:t.customer.customerFirstName))])],1),t._m(1)]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-4"},[n("router-link",{staticClass:"btn btn-lg btn-block btn-info pay-btn",class:0===t.totalSale?"disabled":"",attrs:{to:"/pos/payment/"+t.namespace.split("/").pop()}},[t._v("Payment")]),n("a",{staticClass:"btn btn-lg btn-block btn-white btn-block",class:t.validator.isEmptyObject(t.customer)||0===t.totalSale?"disabled":"",attrs:{to:"/pos/invoice"},on:{click:function(e){return t.postDocument("INVOICE")}}},[t._v("Invoice")]),n("a",{staticClass:"btn btn-lg btn-block btn-white btn-block",class:t.validator.isEmptyObject(t.customer)||0===t.totalSale?"disabled":"",attrs:{to:"/pos/quote"},on:{click:function(e){return t.postDocument("QUOTE")}}},[t._v("Quote")])],1),n("div",{staticClass:"col-xs-8"},[n("div",{staticClass:"row no-pad"},[n("div",{staticClass:"col-xs-3"},[n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(1)}}},[t._v("1")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(4)}}},[t._v("4")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(7)}}},[t._v("7")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate("+/-")}}},[t._v("+/-")])]),n("div",{staticClass:"col-xs-3"},[n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(2)}}},[t._v("2")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(5)}}},[t._v("5")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(8)}}},[t._v("8")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(0)}}},[t._v("0")])]),n("div",{staticClass:"col-xs-3"},[n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(3)}}},[t._v("3")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(6)}}},[t._v("6")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(9)}}},[t._v("9")]),n("button",{staticClass:"btn btn-lg btn-white btn-block",on:{click:function(e){return t.calculate(".")}}},[t._v(".")])]),n("div",{staticClass:"col-xs-3"},[n("button",{staticClass:"btn btn-lg btn-block",class:"QTY"===t.operation?"btn-success":"btn-white",on:{click:function(e){return t.setOperation("QTY")}}},[t._v("Qty")]),n("button",{staticClass:"btn btn-lg btn-block",class:"UNIT"===t.operation?"btn-success":"btn-white",on:{click:function(e){return t.setOperation("UNIT")}}},[t._v("Unit")]),n("button",{staticClass:"btn btn-lg btn-block",class:"PRICE"===t.operation?"btn-success":"btn-white",on:{click:function(e){return t.setOperation("PRICE")}}},[t._v("Price")]),n("button",{staticClass:"btn btn-lg btn-danger btn-block",on:{click:function(e){return t.removeItem()}}},[n("i",{staticClass:"fa fa-backspace"})])])])])])])])])]),n("div",{staticClass:"col-sm-7 col-xs-12"},[n("div",{staticClass:"col-xs-12"},[n("div",{staticClass:"row"},[n("form",[n("div",{staticClass:"input-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.term,expression:"term"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Search Item"},domProps:{value:t.term},on:{input:function(e){e.target.composing||(t.term=e.target.value)}}}),t._m(2)])])]),t._m(3),n("div",{staticClass:"hr-line-dashed",staticStyle:{margin:"5px"}}),n("div",{staticClass:"ibox-content search-items",class:t.loading?"sk-loading":"",staticStyle:{"background-color":"#FAFBFB",border:"none",padding:"0"}},[t.loading?n("Spinner"):t._e(),t._l(t.filteredProducts,function(e,s){return n("div",{key:s,staticClass:"file-box"},[n("div",{staticClass:"file"},[n("a",{on:{click:function(n){return t.addItem(e)}}},[n("span",{staticClass:"corner",class:e.state?"available":"unavailable"}),t._m(4,!0),n("div",{staticClass:"file-name"},[n("h5",{staticStyle:{"line-height":"1","margin-bottom":"-5px"}},[t._v(t._s(e.productName))]),n("br"),n("small",[t._v("QTY "+t._s(e.qty||1))]),n("span",{staticClass:"badge badge-info pull-right"},[t._v("Ksh "+t._s(0===e.salePrice?e.price:e.salePrice))]),n("div",{staticClass:"clearfix"})])])])])})],2)])])])},E=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{staticClass:"text-left"},[t._v("Item")]),n("th",{staticClass:"text-left"},[t._v("Qty")]),n("th",{staticClass:"text-left"},[t._v("Measure")]),n("th",{staticClass:"text-right"},[t._v("Price")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-xs-4 col-md-12 visible-xs p-sm"},[n("button",{staticClass:"btn btn-success btn-lg pull-right visible-xs"},[t._v("Add")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"input-group-btn"},[n("button",{staticClass:"btn  btn-primary",attrs:{type:"submit"}},[t._v("\n                                    Search\n                                ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row text-center p-xs"},[n("div",{staticClass:"btn-group-xs"},[n("button",{staticClass:"btn btn-white m-xs"},[t._v("1/4 m")]),n("button",{staticClass:"btn btn-white m-xs"},[t._v("1/2 m")]),n("button",{staticClass:"btn btn-white m-xs"},[t._v("1 m")]),n("button",{staticClass:"btn btn-white m-xs"},[t._v("2 m")]),n("button",{staticClass:"btn btn-white m-xs"},[t._v("full")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"image"},[n("img",{staticClass:"img-responsive",attrs:{alt:"image",src:"/img/p1.jpg"}})])}],S=n("2375"),T=n("ecdc"),x=new T["a"],O={name:"PosInstance",props:["namespace"],components:{Spinner:S["a"]},data:function(){return{selected:0,operation:"QTY",term:"",validator:window.validator}},beforeCreate:function(){this.$store.dispatch("inventory/getProducts"),this.$store.dispatch("inventory/getMeasurementUnits")},computed:{totalSale:function(){return this.items.reduce(function(t,e){return parseInt(t)+parseInt(e.price)},0)},filteredProducts:function(){var t=this;return""===this.term?this.products:this.products.filter(function(e){return e.productName.toLowerCase().indexOf(t.term.toLowerCase())>=0||e.productShortDescription.toLowerCase().indexOf(t.term.toLowerCase())>=0||e.price===parseInt(t.term)>=0||e.salePrice===parseInt(t.term)>=0||e.measurement===parseInt(t.term)>=0||e.sellAs.toLowerCase().indexOf(t.term.toLowerCase())>=0||e.availableFrom.toLowerCase().indexOf(t.term.toLowerCase())>=0||e.availableTo.toLowerCase().indexOf(t.term.toLowerCase())>=0})},products:function(){return this.$store.getters["inventory/products"]},units:function(){return this.$store.getters["inventory/measurementUnit"]},loading:function(){return this.$store.getters["inventory/loading"]},message:function(){return this.$store.getters["inventory/message"]},status:function(){return this.$store.getters["inventory/status"]},getUom:function(){return this.$store.getters["inventory/getMeasurementUnit"]},items:function(){return this.$store.getters[this.namespace+"/items"]},getTotalSales:function(){return this.$store.getters[this.namespace+"/totalSales"]},getItem:function(){return this.$store.getters[this.namespace+"/getItem"]},customer:function(){return this.$store.getters[this.namespace+"/customer"]}},methods:{addItem:function(t){if(0===this.items.filter(function(e){return e.id===t.id}).length){var e=Object.assign({},t);e.productId=e.id,e.subProductId="CUSTOM"===e.sellAs?e.id:"",e.soldMeasurement=e.measurement,e.categories="",e.measurementBefore=e.measurement,e.measurementAfter=e.measurement,e.price=0===t.salePrice?t.price:t.salePrice,e.qty=1,e.maxUnit=e.measurement,e.minUnit=e.customSaleUnit,e.itemPrice=e.price,this.$store.commit(this.namespace+"/SET_ITEMS",e)}},select:function(t){this.selected=t},setOperation:function(t){this.operation=t},removeItem:function(){this.$store.commit(this.namespace+"/UNSET_ITEMS",this.selected)},calculate:function(t){if(0!==this.items.length){var e={input:t,operand:this.getItem(this.selected),operation:this.operation};this.$store.commit(this.namespace+"/UPDATE_SALE",{index:this.selected,item:x.performOperation(e)})}},fieldUpdate:function(t,e){this.$store.commit(this.namespace+"/UPDATE_SALE",{index:t,item:x.updateSale(this.getItem(t),e)})}}},I=O,A=(n("d0f7"),n("2877")),P=Object(A["a"])(I,k,E,!1,null,"468d205e",null),$=P.exports;function N(t){for(var e=1;e<arguments.length;e++)if(e%2){var n=null!=arguments[e]?arguments[e]:{},s=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),s.forEach(function(e){Object(i["a"])(t,e,n[e])})}else Object.defineProperties(t,Object.getOwnPropertyDescriptors(arguments[e]));return t}var U=y.state,M=y.mutations,D=y.getters,L=y.actions,j=y.endpoints,R={name:"Register",components:{PosInstance:$},data:function(){return{tab:o}},beforeRouteEnter:function(t,e,n){n(function(t){0===t.tabs.length&&t.newTab()})},computed:N({},Object(r["c"])("pos",{tabs:function(t){return t.tabs},tabCount:function(t){return t.tabCount}})),methods:{newTab:function(){this.tab.name="sale "+(this.tabCount+1),this.tab.id="tab-"+this.tabCount,this.tab.namespace="pos/tab"+this.tabCount,this.tab.status="active",this.tab.no=this.tabCount,this.$store.registerModule(["pos","tab".concat(this.tab.no)],{state:U,mutations:M,getters:D,actions:L,namespaced:!0,endpoints:j}),this.$store.commit("pos/ADD_TAB",Object.assign({},this.tab)),this.tab={}},closeTab:function(t,e){this.tabs.length>0&&(this.$store.commit("pos/REMOVE_TAB",t),this.$store.unregisterModule(["pos","tab".concat(e)]))},switchTab:function(t){this.$store.commit("pos/SWITCH_TAB",t)}}},q=R,Q=(n("790a"),Object(A["a"])(q,s,a,!1,null,"7bae7519",null));e["default"]=Q.exports},"790a":function(t,e,n){"use strict";var s=n("2e3f"),a=n.n(s);a.a},8804:function(t,e,n){"use strict";var s={products:"products/get/all",insert:"products/new",categories:"categories/get/all",generateReceipt:"orders/new",customers:"customers/get/all",insertCustomer:"customers/new",document:function(t){return"orders/get?orderType=".concat(t.type,"&orderId=").concat(t.id,"&orderStatus=").concat(t.status)}};e["a"]=s},af34:function(t,e,n){},d0f7:function(t,e,n){"use strict";var s=n("af34"),a=n.n(s);a.a},ecdc:function(t,e,n){"use strict";var s=n("d225"),a=n("b0b4"),i=function(){function t(){Object(s["a"])(this,t)}return Object(a["a"])(t,[{key:"updateSale",value:function(t,e){switch(e){case"QTY":t.price=t.qty*t.itemPrice;break;case"UNIT":t.price=t.soldMeasurement*t.itemPrice,t.measurementAfter=t.measurementBefore-t.soldMeasurement;break;case"PRICE":break}return t}},{key:"performOperation",value:function(t){switch(t.operation){case"QTY":"CUSTOM"!==t.operand.sellAs&&(t.operand.qty=parseInt(t.operand.qty+""+t.input));break;case"UNIT":"FULL"!==t.operand.sellAs&&(t.operand.soldMeasurement=parseInt(t.operand.soldMeasurement+""+t.input));break;case"PRICE":t.operand.price=parseInt(t.operand.price+""+t.input);break}return this.updateSale(t.operand,t.operation)}},{key:"prepareDocument",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ORDER",e=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,s=arguments.length>3?arguments[3]:void 0,a={customerId:e.id,customerDetails:JSON.stringify(e),orderType:t,orderStatus:"ORDER"===t?"PAID":"PENDING",orderItems:JSON.stringify(n),total:s.total,paymentMethod:s.method,tendered:s.tendered,change:s.change};return a}}]),t}();e["a"]=i}}]);
//# sourceMappingURL=chunk-0aab9cf8.23ecbf3c.js.map