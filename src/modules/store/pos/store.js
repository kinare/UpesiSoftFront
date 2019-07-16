import endpoints from "./endpoints";
import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state : () => ({
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
        loading : false
    }),
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
        SET_LOADING : (state, status) => {
            state.loading = status
        },
        UPDATE_SALE : (state, item) => {
            state.items[item.index] = item.item;
        },
    },
    getters : {
        getField,
        totalSales : (state) => {
            return state.items.reduce((total, item) => parseInt(total) + parseInt(item.salePrice), 0)
        },
        getItem : (state) => {
            return (index) =>{
                return state.items[index]
            }
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

        performOperation : ({state}, formulae) =>{
            let item = state.items[formulae.operand]

            switch (formulae.operation){
                case 'QTY' :
                    item.qty = parseInt(item.qty + '' + formulae.input);
                     break;
                case 'UNIT' :
                    break
                case 'PRICE' :
                    break

            }
            // context.commit('UPDATE_SALE', {item : item, index : formulae.operand})
        },
        backSpace : ({commit, state}, formulae) =>{
            let item = state.items[formulae.operand]
            switch (formulae.operation){
                case 'QTY' :
                    if (item.qty.toString().length === 1){
                        alert('islessthan1')
                        commit('UNSET_ITEMS', formulae.operand)
                        return;
                    }else {
                        alert(item.qty.toString().length)
                        item.qty = parseInt(item.qty.toString().slice(0, -1));
                        // context.commit('UPDATE_SALE', {item : item, index : formulae.operand})
                    }
                    return;
                case 'UNIT' :
                    return
                case 'PRICE' :
                    return
            }



        }

    }
}