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
const  router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
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
                component: () => import('./views/point of sale/Pos'),
                children : [
                    {
                        path : '',
                        component : () => import('./views/point of sale/Register'),
                    },
                    {
                        path : 'payment',
                        component : () => import('./views/point of sale/Payment'),
                    },
                    {
                        path : 'receipt',
                        component : () => import('./views/point of sale/Receipt'),
                    },
                    {
                        path : 'invoice',
                        component : () => import('./views/point of sale/Invoice'),
                    },
                    {
                        path : 'quote',
                        component : () => import('./views/point of sale/Quote'),
                    },
                    {
                        path : 'customers',
                        component : () => import('./views/point of sale/Customers'),
                    },
                    {
                        path : 'payment',
                        component : () => import('./views/point of sale/Payment'),
                    }
                ],
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
                            side : () => import('./views/user manager/UserMgtSide'),
                            content : () => import('./views/user manager/UserManager')
                        },
                        children : [
                            {
                                path : '',
                                redirect : '/dashboard/user-management/users'
                            },
                            {
                                path : 'users',
                                component : () => import('./views/user manager/Users')
                            },
                            {
                                path : 'groups',
                                component : () => import('./views/user manager/Groups')
                            },
                            {
                                path : 'roles',
                                component : () => import('./views/user manager/Roles')
                            }
                        ]
                    },
                    {
                        path : 'inventory-management',
                        components : {
                            side : () => import('./views/inventory manager/InventoryMgtSide'),
                            content : () => import('./views/inventory manager/InventoryManager'),
                        },
                        children : [
                            {
                                path : '',
                                redirect : '/dashboard/inventory-management/products'
                            },
                            {
                                path : 'products',
                                component : () => import('./views/inventory manager/Products'),
                            },
                            {
                                path : 'categories',
                                component : () => import('./views/inventory manager/Categories'),
                            },
                            {
                                path : 'import',
                                component : () => import('./views/inventory manager/Import'),
                            },
                            {
                                path : 'reports',
                                component : () => import('./views/inventory manager/Reports'),
                            },
                        ],
                    },
                    {
                        path : 'accounting-management',
                        components : {
                            side : () => import('./views/accounting manager/AccountingMgtSide'),
                            content : () => import('./views/accounting manager/AccountingManager'),
                        },
                        children : [
                            {
                                path : '',
                                redirect : '/dashboard/accounting-management/quotes'
                            },
                            {
                                path : 'quotes',
                                component : () => import('./views/accounting manager/Quotes'),
                            },
                            {
                                path : 'invoice',
                                component : () => import('./views/accounting manager/Invoice'),
                            },
                            {
                                path : 'receipts',
                                component : () => import('./views/accounting manager/Receipts'),
                            },
                            {
                                path : 'orders',
                                component : () => import('./views/accounting manager/Orders'),
                            },
                            {
                                path : 'sales',
                                component : () => import('./views/accounting manager/Sales'),
                            }
                        ]
                    },
                    {
                        path : 'integration-management',
                        components : {
                            side : () => import('./views/integration manager/IntegrationMgtSide'),
                            content : () => import('./views/integration manager/IntegrationManager'),
                        }
                    },
                    {
                        path : 'resource-management',
                        components : {
                            side : () => import('./views/resource manager/ResourceMgtSide'),
                            content : () => import('./views/resource manager/ResourceManager'),
                        }
                    },
                    {
                        path : 'supplier-management',
                        components : {
                            side : () => import('./views/supplier manager/SupplierMgtSide'),
                            content : () => import('./views/supplier manager/SupplierManager'),
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

router.beforeEach((to, from, next) => {
    // TODO handle multiple middleware
    if(to.matched.some(record => record.meta.middlewareAuth)){
        // eslint-disable-next-line no-undef
        // if(!auth.check()){
        //     next({
        //         path : '/auth/login',
        //         query : { redirect: to.fullPath }
        //     });
        //     return;
        // }
    }

    next();

});

export default router;
