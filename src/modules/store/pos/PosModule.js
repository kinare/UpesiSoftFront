import endpoints from "./endpoints";
import { getField, updateField } from 'vuex-map-fields';
const state = () => {
    return {
        items : [],
        name : 'tab module',
        intended : '',
        payment : {
            tendered : 0,
            due : '',
            change : 0,
            method : 'Cash',
            customer : {},
        },
        documentNo : '',
        receipt : [],
        invoice : [],
        quote : [],
        document : {},
        customer : {},
        message : '',
        status : '',
        loading : false
    }
}
const mutations = {
    updateField,
    RESET_STATE : (state) =>{
        state.items  = []
        state.documentNo  = ''
        state.customer  = {}
        state.message  = ''
        state.status  = ''
        state.loading  = ''
    },
    SET_ITEMS :(state, item) => {
        state.items.push(item)
    },
    UNSET_ITEMS :(state, index) => {
        state.items.splice(index, 1)
    },
    UPDATE_SALE : (state, item) => {
        state.items[item.index] = item.item;
    },
    SET_ORDER : (state, receipt) => {
        state.receipt = receipt
    },
    SET_DOCUMENT : (state, data) => {
        state.document = data
    },
    SET_INVOICE : (state, invoice) => {
        state.invoice  = invoice
    },
    SET_QUOTE : (state, quote) => {
        state.quote = quote
    },
    SET_LOADING : (state, status) => {
        state.loading = status
    },
    SET_MESSAGE : (state, payload) => {
        state.message = payload.message || 'Something went wrong'
        state.status = payload.status || 'alert-warning'
    },
    SET_CUSTOMER : (state, customer) =>{
        state.customer = customer
    },
    SET_DOC_NO : (state, no) =>{
        state.documentNo = no
    },
    RESET_DOC_NO : (state) =>{
        state.documentNo = null
    },
    SET_TENDERED : (state, tendered) =>{
        state.payment.tendered = tendered
    },
    SET_INTENDED : (state, link) => {
        state.intended = link
    }
}
const getters = {
    getField,
    totalSales : (state) => {return state.items.reduce((total, item) => parseInt(total) + parseInt(item.price), 0)},
    getItem : (state) => {return (index) =>{return state.items[index]}},
    items : state => {return state.items},
    payment : state => {return state.payment},
    customer : state => {return state.customer},
    loading : state => {return state.loading},
    documentNo : state => {return state.documentNo},
    receipt : state => {return state.receipt.shift()},
    invoice : state => {return state.invoice.shift()},
    quote : state => {return state.quote.shift()},
    document : state => {return state.document},
    tendered : state => {return state.payment.tendered},
    intended : state => {return state.intended}

}
const actions = {
    generateDocument : (context, data) => {
        console.log(data);
        context.commit('SET_LOADING', true);
        window.api.call('post',endpoints.generateReceipt, data).then((res) => {
            context.commit('SET_DOC_NO', res.data.data.orderId)
            context.commit('SET_LOADING', false);
        }).catch((error) => {
            context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            context.commit('SET_LOADING', false);
        })
    },
    getDocument : (context, param) => {
        context.commit('SET_LOADING', true);
        window.api.call('get',endpoints.document(param)).then((res) => {
            context.commit(`SET_${param.type}`, res.data.data)
            context.commit('SET_LOADING', false);
        }).catch((error) => {
            context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            context.commit('SET_LOADING', false);
        })

    },
    mailDoc : (context, param) => {
        context.commit('SET_LOADING', true);
        window.api.call('post',endpoints.mailDoc, param).then(() => {
            context.commit('SET_LOADING', false);
        }).catch((error) => {
            context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            context.commit('SET_LOADING', false);
        })

    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    endpoints
}
