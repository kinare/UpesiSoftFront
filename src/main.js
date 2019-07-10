window._ = require('lodash');
window.axios = require('axios');
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

Vue.config.productionTip = false
Vue.use(fullscreen)

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
window.validator = new Validator();
window.helper = new Helper();
window.api = new Api();

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

        Event.$on('completed', () => {
            this.$router.push('/auth/login')
        });

        Event.$on('ApiError', () => {

        });
    }
}).$mount('#app')

