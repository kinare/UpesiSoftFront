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


Vue.config.productionTip = false;
Vue.use(fullscreen);
Vue.use(PrettyCheckbox);

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

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        //Global Event Listeners
        Event.$on('userLoggedIn', () => {
            window.location = '/'
            // this.$router.push('/')
        });
        Event.$on('userLoggedOut', () => {
            this.$router.push('/auth/login')
        });
        Event.$on('userSignedUp', () => {
            this.$router.push('/auth/success')
        });
        Event.$on('userActivated', () => {
            this.$router.push('/auth/login')
        });
        Event.$on('userPasswordSet', () => {
            this.$router.push('/auth/login')
        });
        Event.$on('customerAdded', () => {
            this.$router.push('/pos/customers')
        });
        Event.$on('ApiError', () => {

        });
    }
}).$mount('#app')

