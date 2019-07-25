import endpoints from "./endpoints";
import { getField, updateField } from 'vuex-map-fields';
const state = () => {
    return {
        items : [],
        name : 'tab module',
        payment : {
            tendered : 0,
            due : '',
            change : 0,
            method : 'Cash',
            customer : {},
        },
        oderNo : '',
        receipt : [],
        invoice : {
            header : {},
            lines : [],
        },
        quote : {
            header : {},
            lines : [],
        },
        customer : '',
        message : '',
        status : '',
        loading : false
    }
}
const mutations = {
    updateField,
    RESET_STATE : (state, defaultState) =>{
        state = defaultState
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
    SET_RECEIPT : (state, receipt) => {
        state.receipt = receipt
    },
    SET_INVOICE : (state, invoice) => {
        state.invoice.header = invoice.header
        state.invoice.lines = invoice.lines
    },
    SET_QUOTE : (state, quote) => {
        state.quote.header = quote.header
        state.quote.lines = quote.lines
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
    SET_ORDER_NO : (state, no) =>{
        state.oderNo = no
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
    oderNo : state => {return state.oderNo},
    receipt : state => {return state.receipt.shift()},
    invoice : state => {return state.invoice},
    quote : state => {return state.quote}

}
const actions = {
    generateReceipt : (context, data) => {
        context.commit('SET_LOADING', true);
        window.api.call('post',endpoints.generateReceipt, data).then((res) => {
            context.commit('SET_ORDER_NO', res.data.data.orderId)
            context.commit('SET_LOADING', false);
        }).catch((error) => {
            context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            context.commit('SET_LOADING', false);
        })
    },
    getDocument : (context, param) => {
        context.commit('SET_LOADING', true);
        window.api.call('get',endpoints.document(param)).then((res) => {
            context.commit('SET_RECEIPT', res.data.data)
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