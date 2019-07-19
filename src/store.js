import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    moduleA : {
      namespaced : true,
      state: { name : 'moduleA'},
      mutations: {},
      getters: {},
      actions: {}
    }
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {}
})
