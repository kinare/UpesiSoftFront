import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        user : {},
        token : '',
        message : '',
        registered : false,
        loading : false,
        status : '',
        businessTypes : []
    },
    mutations: {
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message
            state.status = payload.status || 'alert-warning'
        },
        SET_REGISTERED : (state) => {
            state.registered = true
        },
        SET_LOADING : (state, status) => {
            state.loading = status
        },
        SET_BUSINESS_TYPES  : (state, types) => {
            state.businessTypes = types
        }

    },
    getters : {},
    actions : {
        signIn : (context, data) => {
            context.commit('SET_LOADING', true);
            window.api.call('post',endpoints.login, data).then((res)=> {
                window.auth.login(res.data.data);
                context.commit('SET_LOADING', false);
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
                // window.auth.login("thisismysampletokenfortesting"); //token for local development
            })
        },

        signUp : (context, data) => {
            context.commit('SET_LOADING', true);
            window.api.call('post',endpoints.register, data).then(() => {
                context.commit('SET_REGISTERED')
                Event.$emit('userSignedUp');
                context.commit('SET_LOADING', false);
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        activate : (context, data) => {
            context.commit('SET_LOADING', true);
            window.api.call('post', endpoints.activate, data).then(() => {
                Event.$emit('userActivated');
                context.commit('SET_LOADING', false);
            }).catch((error) => {
                context.commit('SET_MESSAGE',  {  message :error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        setPassword : (context, data) => {
            context.commit('SET_LOADING', true);
            window.api.call('post',endpoints.complete, data).then(() => {
                Event.$emit('userPasswordSet');
                context.commit('SET_LOADING', false);
            }).catch((error) => {
                context.commit('SET_MESSAGE',  {  message : error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },
        reset : (context, data) => {
            context.commit('SET_LOADING', true);
            window.api.call('post',endpoints.reset, data).then(() => {
                context.commit('SET_MESSAGE', {message : "Password reset link has been sent", status : 'alert-info' })
                context.commit('SET_LOADING', false);
            }).catch((error) => {
                context.commit('SET_MESSAGE',  {  message :error.response.data.message, status : 'alert-warning'});
                context.commit('SET_LOADING', false);
            })
        },

        getBusinessTypes : (context) => {
          window.api.call('get', endpoints.businessTypes).then(res => {
              context.commit('SET_BUSINESS_TYPES', res.data.data.businessTypes)
          }).catch(error => {
              alert(error)
          })
        },

        signOut : () => {
            window.auth.logout();
        }
    }
}