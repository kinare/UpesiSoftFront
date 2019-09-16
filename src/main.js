window._ = require('lodash');
window.axios = require('axios');
window.jQuery = window.$ = require('jquery');
import "bootstrap";
import 'metismenu'
import 'jquery-slimscroll/jquery.slimscroll.min'
import 'pace-js'
import './assets/js/inspinia'
import PrettyCheckbox from 'pretty-checkbox-vue';


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fullscreen from 'vue-fullscreen';
import VueHtmlToPaper from 'vue-html-to-paper';
import Auth from './modules/auth/Auth';
import Validator from './modules/validation/validate'
import Helper from './modules/helpers/helper'
import Api from './modules/api/api'
import Filters from './modules/filters/filters'
import Scopes from './modules/auth/Scope'
import listener from './modules/mixins/Listener'
import isOnline from './modules/mixins/OnlineChecker'
import Toasted from 'vue-toasted';
import ConfirmationModal from './components/Confirmation';


Vue.config.productionTip = false;
Vue.use(fullscreen);
Vue.use(PrettyCheckbox);
Vue.use(Toasted)

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
window.scopes = new Scopes;
window.Event = new Vue;
window.validator = new Validator();
window.helper = new Helper();
window.api = new Api();

Filters.forEach(f => {
    Vue.filter(f.name, f.execute);
})

// Vue.component('confirmation-modal', ConfirmationModal).default;

new Vue({
    router,
    store,
    components : {ConfirmationModal},
    render: h => h(App),
    mixins : [listener, isOnline],
}).$mount('#app')

