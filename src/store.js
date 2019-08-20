import Vue from 'vue'
import Vuex from 'vuex'
import endpoints from "./modules/store/auth/endpoints";
Vue.use(Vuex)
export default new Vuex.Store({
  namespace : true,
  state: {
    loading : false,
    hasScopes : '',
    scopes : {}
  },
  mutations: {
    LOADING : (state, loading) => {
      state.loading = loading
    },
    HAS_SCOPES : (state, payload) => {
      state.hasScopes  = payload
    },
    SET_SCOPES : (state, payload) => {
      state.scopes  = payload
    }
  },
  getters: {
    loading : state => state.loading
  },
  actions: {
    //get roles for user persmissions
    getRoles : (context) => {
      context.commit('LOADING', true);
      window.api.call('get', endpoints.roles).then(res =>{
        let scopes = res.data.data
        let user = JSON.parse(window.auth.authUser());
        let role =  scopes.filter(role => role.id === user.roleId).shift()
        window.scopes.setScopes(role)
        context.commit('LOADING', false);
        context.commit('HAS_SCOPES',window.scopes.hasScopes());
        context.commit('SET_SCOPES', window.scopes.getScopes());
      })
    },
  }
})
