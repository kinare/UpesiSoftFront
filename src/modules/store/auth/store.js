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
        SET_MESSAGE : (state, message) => {
            state.message = message
        },
        SET_STATUS : (state, status) => {
            state.status = status
        },
        SET_SREGISTERED : (state) => {
            state.registered = true
        }
    },
    getters : {},
    actions: {
        signIn : (context, data) => {
            window.api.call('post',endpoints.login, data).then((res)=> {
                context.commit('SET_USER', res.data.user);
                context.commit('SET_TOKEN', res.data.token);
                window.auth.login(res.data.token);
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message);
                context.commit('SET_STATUS', 'alert-warning');
                window.auth.login("thisismysampletokenfortesting");
            })
        },

        signUp : (context, data) => {
            window.api.call('post',endpoints.register, data).then(() => {
                context.commit('SET_SREGISTERED')
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message);
                context.commit('SET_STATUS', 'alert-warning');            })
        },
        activate : (context, data) => {
            window.api.call('post',endpoints.activate, data).then(() => {
                Event.$emit('accountActivated');
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message);
                context.commit('SET_STATUS', 'alert-danger');            })
        },
        setPassword : (context, data) => {
            window.api.call('post',endpoints.complete, data).then(() => {
                Event.$emit('completed');
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message);
                context.commit('SET_STATUS', 'alert-warning');
            })
        },
        reset : (context, data) => {
            window.api.call('post',endpoints.reset, data).then(() => {
                context.commit('SET_MESSAGE', "Password reset link has been sent")
                context.commit('SET_STATUS', 'alert-info');
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message);
                context.commit('SET_STATUS', 'alert-danger');
            })
        },

        signOut : () => {
            window.auth.logout()
        }
    }
}