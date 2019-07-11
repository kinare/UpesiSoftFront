(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fdc872cc"],{"063a":function(t,s,a){},2375:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"sk-spinner sk-spinner-double-bounce"},[a("div",{staticClass:"sk-double-bounce1"}),a("div",{staticClass:"sk-double-bounce2"})])}],r={name:"Spinner"},n=r,c=a("2877"),l=Object(c["a"])(n,e,i,!1,null,"5cbedca4",null);s["a"]=l.exports},"3f6c":function(t,s,a){"use strict";var e=a("063a"),i=a.n(e);i.a},cfd0:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12"},[a("div",{staticClass:"ibox float-e-margins"},[a("div",{staticClass:"ibox-title"},[a("h5",[t._v("Products")]),a("div",{staticClass:"ibox-tools"},[a("a",{staticClass:"btn btn-xs",class:"list"===t.view?"btn-primary":"btn-white",on:{click:function(s){return t.$store.commit("inventory/SET_VIEW","list")}}},[a("i",{staticClass:"fa fa-list"})]),a("a",{staticClass:"btn btn-xs ",class:"grid"===t.view?"btn-primary":"btn-white",on:{click:function(s){return t.$store.commit("inventory/SET_VIEW","grid")}}},[a("i",{staticClass:"fa fa-th-large"})]),a("a",{staticClass:"btn btn-xs btn-white"},[a("i",{staticClass:"fa fa-sync-alt",on:{click:function(s){return t.$store.dispatch("inventory/getProducts")}}})])])]),a("div",{staticClass:"ibox-content",class:t.loading?"sk-loading":""},[t.loading?a("Spinner"):t._e(),a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-sm-5 col-sm-push-4"},[a("form",{on:{submit:function(s){return s.preventDefault(),t.searchProduct(s)}}},[a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.term,expression:"term"}],staticClass:"form-control",attrs:{type:"search","aria-label":"Search",placeholder:"Search"},domProps:{value:t.term},on:{input:function(s){s.target.composing||(t.term=s.target.value)}}}),a("div",{staticClass:"input-group-btn"},[a("button",{staticClass:"btn btn-default",attrs:{type:"submit"},on:{click:t.searchProduct}},[t._v("Go "),a("span",{staticClass:"fa fa-arrow-right"})])])])])])]),a("div",{staticClass:"hr-line-dashed"}),"list"===t.view?a("div",{staticClass:"table-responsive product-list"},[a("table",{staticClass:"table table-hover"},[t._m(1),a("tbody",[t._l(t.products,function(s,e){return a("tr",{key:e,staticStyle:{cursor:"pointer"}},[t._m(2,!0),a("td",[t._v(t._s(s.name))]),a("td",[t._v(t._s(s.shortDescription))]),a("td",[t._v(t._s(s.sku))]),a("td",[t._v(t._s(s.price))]),a("td",[t._v(t._s(s.salePrice))]),a("td",[t._v(t._s(s.taxClassId))]),a("td",[a("span",{staticClass:"badge",class:s.state?"badge-success":"badge-warning"},[t._v(t._s(s.state?"Available":"Unavailable"))])]),a("td",[t._v(t._s(s.availableFrom))]),a("td",[t._v(t._s(s.availableTo))])])}),a("tr",[t.validator.isEmptyObject(t.products)?a("td",{staticClass:"text-center",attrs:{colspan:"10"}},[a("i",{staticClass:"text-muted"},[t._v("No products found")])]):t._e()])],2)])]):t._e(),"grid"===t.view?a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},t._l(t.products,function(s,e){return a("div",{key:e,staticClass:"file-box"},[a("div",{staticClass:"file"},[a("a",{attrs:{href:"#"}},[a("span",{staticClass:"corner",class:s.state?"available":"unavailable"}),t._m(3,!0),a("div",{staticClass:"file-name"},[t._v("\n                                        "+t._s(s.name)),a("span",{staticClass:"badge badge-info pull-right"},[t._v(t._s(s.salePrice))]),a("br"),a("small",[t._v(t._s(s.shortDescription))])])])])])}),0)]):t._e()],1)])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-sm-3 m-b-xs"},[a("div",{staticClass:"btn-group-xs"},[a("select",{staticClass:"form-control"},[a("option",{attrs:{selected:""}},[t._v("Select Category")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("thead",[a("tr",[a("th",[t._v("Product")]),a("th",[t._v("Name")]),a("th",[t._v("Description")]),a("th",[t._v("SKU")]),a("th",[t._v("Price")]),a("th",[t._v("Sale Price")]),a("th",[t._v("Tax Class")]),a("th",[t._v("State")]),a("th",[t._v("Vailable From")]),a("th",[t._v("Vailable To")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("td",{staticClass:"product-avatar"},[a("img",{attrs:{alt:"image",src:"/img/p1.jpg"}})])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"image"},[a("img",{staticClass:"img-responsive",attrs:{alt:"image",src:"/img/p1.jpg"}})])}],r=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),n=a("2f62"),c=a("2375");function l(t){for(var s=1;s<arguments.length;s++)if(s%2){var a=null!=arguments[s]?arguments[s]:{},e=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),e.forEach(function(s){Object(r["a"])(t,s,a[s])})}else Object.defineProperties(t,Object.getOwnPropertyDescriptors(arguments[s]));return t}var o={name:"Products",components:{Spinner:c["a"]},data:function(){return{term:"",validator:window.validator}},beforeRouteEnter:function(t,s,a){a(function(t){t.$store.dispatch("inventory/getProducts")})},computed:l({},Object(n["b"])("inventory",{products:function(t){return t.products},loading:function(t){return t.loading},view:function(t){return t.view}})),methods:{searchProduct:function(){}}},u=o,d=(a("3f6c"),a("2877")),v=Object(d["a"])(u,e,i,!1,null,"02c65080",null);s["default"]=v.exports}}]);
//# sourceMappingURL=chunk-fdc872cc.8586b875.js.map