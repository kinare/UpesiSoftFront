import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        message : '',
        status : '',
        loading : true,
        salesDocuments : [],
        measurementUnits : []
    },
    mutations: {
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message || 'Something went wrong'
            state.status = payload.status || 'alert-warning'
        },
        SET_LOADING : (state, loading) => {
            state.loading = loading;
        },
        SET_SALES_DOCUMENTS : (state, sales) => {
            state.salesDocuments = sales;
        },
        SET_MEASUREMENT_UNIT : (state, units) => {
            state.measurementUnits = units;
        },
    },
    getters : {
        //get total income from  orders
        totalIncome : (state) =>{
            let total = 0
            state.salesDocuments.forEach(sales => {
                total = parseFloat(total) + parseFloat(sales.total)
            })
            return total.toFixed(2)
        },

        //return function to get total per document type
        total : (state) => {
            return (type) =>{
                let total = 0

                //filter to order type
                let orders = state.salesDocuments.filter(sales => {
                   return  sales.orderType === type
                })

                //get total
                orders.forEach(sales => {
                    total = parseFloat(total) + parseFloat(sales.total)
                })
                return {total : total, count :  orders.length , documents : orders}
            }
        },

        //get unit measurement abbreviation by id
        getUnit : state => {
            return (id) => {
                return state.measurementUnits.filter( unit => unit.id === parseInt(id)).shift().measurementAbbreviation
            }
        }
    },
    actions: {
        getSalesDocuments : (context, param) => {
            context.commit('SET_LOADING', true)
            window.api.call('get', endpoints.documents(param)).then((res)=> {
                context.commit('SET_SALES_DOCUMENTS', res.data.data);
                context.commit('SET_LOADING', false)
            }).catch((error) => {
                context.commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false)
            })
        },

        updateSalesDocuments : ({commit, dispatch}, data) => {
            commit('SET_LOADING', true)
            window.api.call('post', endpoints.update, data).then(()=> {
                dispatch('getSalesDocuments', data.params)
                commit('SET_LOADING', false)
            }).catch((error) => {
                commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false)
            })
        },

        deleteSalesDocuments : ({commit, dispatch}, data) => {
            commit('SET_LOADING', true)
            window.api.call('delete', endpoints.delete, data).then(()=> {
                dispatch('getSalesDocuments', data.params)
                commit('SET_LOADING', false)
            }).catch((error) => {
                commit('SET_MESSAGE',{  message : error.response.data.message, status : 'alert-warning'});
                commit('SET_LOADING', false)
            })
        },

        getMeasurementUnit : (context) => {
            window.api.call('get', endpoints.measurements).then(res =>{
                context.commit('SET_MEASUREMENT_UNIT', res.data.data)
            })
        }
    }
}
