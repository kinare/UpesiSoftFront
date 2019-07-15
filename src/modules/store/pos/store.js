import endpoints from "./endpoints";
import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state : {
        items : [],
        payment : {
           tendered : 0,
           due : '',
           change : 0,
           method : 'Cash',
           customer : {},
        },
        receipt : {
            header : {},
            lines : [],
        },
        invoice : {
            header : {},
            lines : [],
        },
        quote : {
            header : {},
            lines : [],
        },
        message : '',
        status : '',
    },
    mutations: {
        updateField,
        REFRESH_STORE() {},
        SET_ITEMS :(state, item) => {
            state.items.push(item)
        },
        UNSET_ITEMS :(state, index) => {
            state.items.splice(index, 1)
        },
        SET_RECEIPT : (state, receipt) => {
            state.receipt.header = receipt.header
            state.receipt.lines = receipt.lines
        },
        SET_INVOICE : (state, invoice) => {
            state.invoice.header = invoice.header
            state.invoice.lines = invoice.lines
        },
        SET_QUOTE : (state, quote) => {
            state.quote.header = quote.header
            state.quote.lines = quote.lines
        },
    },
    getters : {
        getField,
        totalSales : (state) => {
            return state.items.reduce((total, item) => parseInt(total) + parseInt(item.salePrice), 0)
        }
    },
    actions: {
        newProduct : ({context, dispatch}, data) => {
            window.api.call('post',endpoints.insert, data).then(() => {
                dispatch('getProducts');
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
        generateReceipt : (context, data) => {
            window.api.call('post',endpoints.insert, data).then((res) => {
                context.commit('SET_RECEIPT', res.data.data)
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },

    }
}