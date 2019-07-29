import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        user : {},
        token : '',
        message : '',
        registered : false,
        status : ''
    },
    mutations: {
        REFRESH_STORE() {},
        SET_USER :(state, user) => {
            state.user = user
        },
        SET_TOKEN :(state, token) => {
            state.token = token
        },
        SET_MESSAGE : (state, payload) => {
            state.message = payload.message
            state.status = payload.status || 'alert-warning'
        },

        SET_REGISTERED : (state) => {
            state.registered = true
        }
    },
    getters : {},
    actions: {
        signIn : (context, data) => {
            window.api.call('post',endpoints.login, data).then((res)=> {
                window.auth.login(res.data.data)
                context.commit('SET_USER', res.data.data.user);
                context.commit('SET_TOKEN', res.data.data.token);
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
                // window.auth.login("thisismysampletokenfortesting"); //token for local development
            })
        },

        signUp : (context, data) => {
            window.api.call('post',endpoints.register, data).then(() => {
                context.commit('SET_REGISTERED')
                Event.$emit('userSignedUp');
            }).catch((error) => {
                context.commit('SET_MESSAGE', {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
        activate : (context, data) => {
            window.api.call('post', endpoints.activate, data).then(() => {
                Event.$emit('userActivated');
            }).catch((error) => {
                context.commit('SET_MESSAGE',  {  message :error.response.data.message, status : 'alert-warning'});
            })
        },
        setPassword : (context, data) => {
            window.api.call('post',endpoints.complete, data).then(() => {
                Event.$emit('userPasswordSet');
            }).catch((error) => {
                context.commit('SET_MESSAGE',  {  message : error.response.data.message, status : 'alert-warning'});
            })
        },
        reset : (context, data) => {
            window.api.call('post',endpoints.reset, data).then(() => {
                context.commit('SET_MESSAGE', {message : "Password reset link has been sent", status : 'alert-info' })
            }).catch((error) => {
                context.commit('SET_MESSAGE',  {  message :error.response.data.message, status : 'alert-warning'});
            })
        },

        signOut : () => {
            window.auth.logout();
        }
    }
}