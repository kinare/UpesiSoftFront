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
        customers : {},
        message : '',
        status : '',
        loading : false
    }
}
const mutations = {
    updateField,
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
    SET_LOADING : (state, status) => {
        state.loading = status
    },
    SET_MESSAGE : (state, payload) => {
        state.message = payload.message || 'Something went wrong'
        state.status = payload.status || 'alert-warning'
    },
}
const getters = {
    getField,
    totalSales : (state) => {return state.items.reduce((total, item) => parseInt(total) + parseInt(item.salePrice), 0)},
    getItem : (state) => {return (index) =>{return state.items[index]}},
    items : state => {return state.items},
    payment : state => {return state.payment}

}
const actions = {
    generateReceipt : (context, data) => {
        context.commit('SET_LOADING', true);
        window.api.call('post',endpoints.generateReceipt, data).then((res) => {
            context.commit('SET_RECEIPT', res.data.data)
            this.$router.push('/pos/receipt');
            context.commit('SET_LOADING', false);
        }).catch((error) => {
            context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            context.commit('SET_LOADING', false);
        })
    },
}

export default {
    state,
    mutations,
    getters,
    actions,
    endpoints
}