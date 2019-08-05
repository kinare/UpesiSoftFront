import Vue from 'vue'
import Vuex from 'vuex'
import Scope from "./modules/auth/Scope";

const rolesUrl = 'b/roles/get';

Vue.use(Vuex)

export default new Vuex.Store({
  namespace : true,
  state: {
    scope : {}
  },
  mutations: {
    SET_SCOPE : (state, payload) => {
      let user = JSON.parse(window.auth.authUser());
      let role =  payload.filter(role => {
        return role.id === user.roleId
      }).shift()
      state.scope = new Scope(role).getScope();
    }
  },
  getters: {
    roles : state => {return state.roles},
    getScope : (state) => {
      return scope => {
        return scope.indexOf('.') >= 0 ? state.scope[scope.split('.').shift()][scope.split('.').pop()] : state.scope[scope]
      }
    },
  },
  actions: {
    getRoles : (context) => {
      window.api.call('get', rolesUrl).then(res =>{
        context.commit('SET_SCOPE', res.data.data)
      }).catch(error => {
        alert(error.response.message);
      })
    }
  }
})
