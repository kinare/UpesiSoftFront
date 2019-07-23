(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d95183a"],{2375:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"sk-spinner sk-spinner-double-bounce"},[e("div",{staticClass:"sk-double-bounce1"}),e("div",{staticClass:"sk-double-bounce2"})])}],i={name:"Spinner"},n=i,c=e("2877"),o=Object(c["a"])(n,a,r,!1,null,"5cbedca4",null);s["a"]=o.exports},"5ba7":function(t,s,e){},"5f05":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container-fluid p-sm"},[e("div",{staticClass:"col-lg-10 col-lg-push-1 col-xs-12"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-3"},[e("a",{staticClass:"btn btn-white btn-lg pull-left",on:{click:function(s){return t.$router.go(-1)}}},[e("i",{staticClass:"fa fa-arrow-left"}),t._v(" Back ")])]),t._m(0)]),e("div",{staticClass:"hr-line-dashed"}),e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-8 border-right"},[e("div",{staticClass:"row",attrs:{id:"receipt"}},[e("div",{staticClass:"col-xs-6 col-xs-push-3"},[e("div",{staticClass:"ibox-content",class:t.loading?"sk-loading":"",staticStyle:{border:"none",width:"340px"}},[t.loading?e("spinner"):t._e(),e("div",{staticClass:"row"},[t.validator.isEmptyObject(t.receipt)?t._e():e("div",{staticClass:"pos-receipt",staticStyle:{border:"1px solid #e7eaec",padding:"10px 20px","font-family":"monospace, sans-serif","line-height":"1"}},[e("div",{staticClass:"pos-receipt-header"},[e("h5",{staticClass:"text-center"},[t._v("\n                                            Receipt No: "+t._s(t.receipt.id)),e("br"),t._v("\n                                            Date : "+t._s(t.receipt.createdAt)+"\n                                        ")]),e("p",[t._v("Name : "+t._s(t.receipt.customerIsBusiness?t.receipt.customerBusinessName:t.receipt.customerFirstName+" "+t.receipt.customerLastName))]),e("p",[t._v("Phone : "+t._s(t.receipt.customerPhoneNumber))]),e("p",[t._v("Email : "+t._s(t.receipt.customerEmail))])]),e("div",{staticClass:"hr-line-dashed"}),e("div",{staticClass:"pos-receipt-content"},[e("table",{staticClass:"table small table-condensed"},[t._m(1),e("tbody",[t._l(t.receipt.orderItems,function(s,a){return e("tr",{key:a},[e("td",{staticClass:"no-borders"},[t._v("\n                                                   "+t._s(s.productName)+"\n                                                ")]),e("td",{staticClass:"no-borders"},[t._v("\n                                                    "+t._s(s.qty||1)+"\n                                                ")]),e("td",{staticClass:"no-borders"},[t._v("\n                                                   "+t._s(s.soldMeasurement?s.soldMeasurement+" "+t.measurmentAbbreviation(s.measurementUnitId):"")+"\n                                                ")]),e("td",{staticClass:"no-borders"},[t._v("\n                                                   Ksh "+t._s(s.price)+"\n                                                ")])])}),e("tr",[t._m(2),e("td",{staticClass:"no-borders"},[e("strong",[t._v("Ksh "+t._s(t.receipt.total))])])]),e("tr",[t._m(3),e("td",{staticClass:"no-borders"},[e("strong",[t._v("Ksh "+t._s(t.receipt.tenderedAmount))])])]),e("tr",[t._m(4),e("td",{staticClass:"no-borders"},[e("strong",[t._v("Ksh "+t._s(t.receipt.changeAmount))])])])],2)])]),e("div",{staticClass:"hr-line-dashed"}),e("div",{staticClass:"pos-receipt-footer"},[e("p",[t._v(" Served by : "+t._s(t.receipt.cashierLastName+", "+t.receipt.cashierPhoneNumber)+" ")]),e("h3",{staticClass:"text-center"},[t._v("Thank You")])])])])],1)])])]),e("div",{staticClass:"col-xs-4 "},[e("div",{staticClass:"ibox-content pos-calc",staticStyle:{border:"none"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-xs-12"},[e("button",{staticClass:"btn btn-block btn-lg btn-white",on:{click:t.printDoc}},[e("i",{staticClass:"fa fa-print"}),t._v("  Print Receipt")])])])])])])])])},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col-xs-6"},[e("h2",{staticClass:"text-center",staticStyle:{"margin-top":"10px"}},[t._v("Receipt")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",[e("th",[t._v("Item")]),e("th",[t._v("QTY")]),e("th",[t._v("Unit")]),e("th",[t._v("Price")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("td",{staticClass:"no-borders",attrs:{colspan:"3"}},[e("strong",[t._v("Total")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("td",{staticClass:"no-borders",attrs:{colspan:"3"}},[e("strong",[t._v("Cash")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("td",{staticClass:"no-borders",attrs:{colspan:"3"}},[e("strong",[t._v("Change")])])}],i=e("2375"),n={name:"Receipt",components:{Spinner:i["a"]},data:function(){return{validator:window.validator,namespace:"",orderId:""}},methods:{printDoc:function(){this.$htmlToPaper("receipt")}},beforeRouteEnter:function(t,s,e){e(function(s){s.namespace=t.params.namespace,s.orderId=t.params.orderId;var e={type:"ORDER",id:s.orderId,status:"PAID"};s.$store.dispatch("pos/".concat(s.namespace,"/getDocument"),e)})},computed:{receipt:function(){return this.$store.getters["pos/".concat(this.namespace,"/receipt")]},loading:function(){return this.$store.getters["pos/".concat(this.namespace,"/loading")]},measurmentAbbreviation:function(){return this.$store.getters["inventory/getMeasurmentAbbreviation"]}}},c=n,o=(e("6c50"),e("2877")),l=Object(o["a"])(c,a,r,!1,null,"6c0b10eb",null);s["default"]=l.exports},"6c50":function(t,s,e){"use strict";var a=e("5ba7"),r=e.n(a);r.a}}]);
//# sourceMappingURL=chunk-4d95183a.cb37a51c.js.map