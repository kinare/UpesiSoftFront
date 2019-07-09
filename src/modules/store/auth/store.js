import endpoints from "./endpoints";
export default {
    namespaced: true,
    state : {
        user : {},
        token : '',
        message : '',
        registered : false
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
                window.auth.login("thisismysampletokenfortesting");
            })
        },

        signUp : (context, data) => {
            window.api.call('post',endpoints.register, data).then(() => {
                context.commit('SET_SREGISTERED')
            }).catch((error) => {
                context.commit('SET_MESSAGE', error.message)
            })
        },

        signOut : () => {
            window.auth.logout()
        }
    }
}