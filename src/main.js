window._ = require('lodash');
window.axios = require('axios');
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBreadcrumbs from 'vue-breadcrumbs';
import fullscreen from 'vue-fullscreen';
import VueHtmlToPaper from 'vue-html-to-paper';
import Auth from './modules/auth/Auth';

Vue.config.productionTip = false
Vue.use(fullscreen)
Vue.use(VueBreadcrumbs, {
  template: ' <ol class="breadcrumb" v-if="$breadcrumbs.length">' +
      '<li v-for="(crumb, key) in $breadcrumbs">' +
      '<small class="text-muted">' +
      '<router-link   :to="linkProp(crumb)"  :key="key">{{ crumb | crumbText }}</router-link>' +
      '</small>' +
      '</li>' +
      '</ol>'
});
Vue.use(VueHtmlToPaper, {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'http://localhost:8080/css/bootstrap.min.css',
        'http://localhost:8080/css/style.css',
    ]
});
window.auth = new Auth;
window.Event = new Vue;

new Vue({
  router,
  store,
  render: h => h(App),
    mounted() {
        Event.$on('userLoggedIn', () => {
            this.$router.push('/')
        });

        Event.$on('userLoggedOut', () => {
            this.$router.push('/auth/login')
        });

        Event.$on('ApiError', () => {

        });
    }
}).$mount('#app')
