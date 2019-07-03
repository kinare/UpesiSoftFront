import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/layout/Home.vue'
import Dashboard from './views/layout/Dashboard'
import Auth from './views/auth/Auth';
import Landing from './views/layout/landing';
import Login from './views/auth/Login';
import Reset from './views/auth/password/Email';
import Confirmation from './views/auth/Confirmation';
import Register from './views/auth/Register';
import Password from './views/auth/password/Password';


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Dashboard routes
    {
      path: '/',
      component: Home,
        children : [
            {
                path : '',
                name : 'home',
                component: Landing,
                meta : { breadCrumb : 'home'}
            },
            {
                path : 'pos',
                name : 'pos',
                component: () => import('./views/layout/point of sale/Pos'),
                meta : { breadCrumb : 'point of sale'}
            },
            {
                path: '/dashboard',
                component : Dashboard,
                meta : { breadCrumb : 'dashboard'},
                children : [
                    {
                        path : '',
                        name: 'dashboard',
                        redirect : '/dashboard/user-management'
                    },
                    {
                        path : 'user-management',
                        components : {
                            side : () => import('./views/layout/user manager/UserMgtSide'),
                            content : () => import('./views/layout/user manager/UserManager')
                        }
                    },
                    {
                        path : 'inventory-management',
                        components : {
                            side : () => import('./views/layout/inventory manager/InventoryMgtSide'),
                            content : () => import('./views/layout/inventory manager/InventoryManager'),
                        }
                    },
                    {
                        path : 'accounting-management',
                        components : {
                            side : () => import('./views/layout/accounting manager/AccountingMgtSide'),
                            content : () => import('./views/layout/accounting manager/AccountingManager'),
                        }
                    },
                    {
                        path : 'integration-management',
                        components : {
                            side : () => import('./views/layout/integration manager/IntegrationMgtSide'),
                            content : () => import('./views/layout/integration manager/IntegrationManager'),
                        }
                    },
                    {
                        path : 'resource-management',
                        components : {
                            side : () => import('./views/layout/resource manager/ResourceMgtSide'),
                            content : () => import('./views/layout/resource manager/ResourceManager'),
                        }
                    },
                    {
                        path : 'supplier-management',
                        components : {
                            side : () => import('./views/layout/supplier manager/SupplierMgtSide'),
                            content : () => import('./views/layout/supplier manager/SupplierManager'),
                        }
                    },
                ]
            },
        ],
        meta : {
            middlewareAuth : true
        }
    },

    // Auth routes
    {
      path : '/auth',
      component : Auth,
      children : [
              {
                  path: 'login',
                  name: 'login',
                  component: Login,
                  meta : { breadCrumb : 'login'}
              },
              {
                  path: 'Register',
                  name: 'register',
                  component: Register,
                  meta : { breadCrumb : 'register'}
              },
              {
                  path: 'confirmation',
                  name: 'confirmation',
                  component: Confirmation,
                  meta : { breadCrumb : 'confirmation'}
              },
              {
                  path: 'reset',
                  name: 'reset password',
                  component: Reset,
                  meta : { breadCrumb : 'reset password'}
              },
              {
                  path: 'password',
                  name: 'password',
                  component: Password,
                  meta : { breadCrumb : 'password'}
              },
          ],
      meta : {
          middlewareAuth : false
      }
    },
   ]
})
