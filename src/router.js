import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/layout/Home.vue'
import Dashboard from './views/layout/Dashboard'
import Auth from './views/auth/Auth';
import Landing from './views/layout/landing';
import Login from './views/auth/Login';
import Reset from './views/auth/password/Email';
import Activation from './views/auth/Activation';
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
                meta : { breadcrumb : 'home'}
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
                meta : { breadcrumb : 'point of sale'}
            },
            {
                path: '/dashboard',
                component : Dashboard,
                meta : { breadcrumb : 'dashboard'},
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
                        meta : { breadcrumb : 'user management'},
                        children : [
                            {
                                path : '',
                                redirect : '/dashboard/user-management/users'
                            },
                            {
                                path : 'users',
                                component : () => import('./views/user manager/Users'),
                                meta : { breadcrumb : 'users'},
                            },
                            {
                                path : 'groups',
                                component : () => import('./views/user manager/Groups'),
                                meta : { breadcrumb : 'groups'},
                            },
                            {
                                path : 'roles',
                                component : () => import('./views/user manager/Roles'),
                                meta : { breadcrumb : 'roles'},
                            }
                        ]
                    },
                    {
                        path : 'inventory-management',
                        components : {
                            side : () => import('./views/inventory manager/InventoryMgtSide'),
                            content : () => import('./views/inventory manager/InventoryManager'),
                            menu : () => import('./views/inventory manager/Menu'),
                        },
                        meta : { breadcrumb : 'inventory'},
                        children : [
                            {
                                path : '',
                                redirect : '/dashboard/inventory-management/products'
                            },
                            {
                                path : 'products',
                                component : () => import('./views/inventory manager/Products'),
                                meta : { breadcrumb : 'products'},
                            },
                            {
                                path : 'categories',
                                component : () => import('./views/inventory manager/Categories'),
                                meta : { breadcrumb : 'categories'},
                            },
                            {
                                path : 'import',
                                component : () => import('./views/inventory manager/Import'),
                                meta : { breadcrumb : 'import'},
                            },
                            {
                                path : 'reports',
                                component : () => import('./views/inventory manager/Reports'),
                                meta : { breadcrumb : 'reports'},
                            },
                        ],
                    },
                    {
                        path : 'accounting-management',
                        components : {
                            side : () => import('./views/accounting manager/AccountingMgtSide'),
                            content : () => import('./views/accounting manager/AccountingManager'),
                        },
                        meta : { breadcrumb : 'accounting'},
                        children : [
                            {
                                path : '',
                                redirect : '/dashboard/accounting-management/quotes'
                            },
                            {
                                path : 'quotes',
                                component : () => import('./views/accounting manager/Quotes'),
                                meta : { breadcrumb : 'quotes'},
                            },
                            {
                                path : 'invoice',
                                component : () => import('./views/accounting manager/Invoice'),
                                meta : { breadcrumb : 'invoice'},
                            },
                            {
                                path : 'receipts',
                                component : () => import('./views/accounting manager/Receipts'),
                                meta : { breadcrumb : 'receipts'},
                            },
                            {
                                path : 'orders',
                                component : () => import('./views/accounting manager/Orders'),
                                meta : { breadcrumb : 'orders'},
                            },
                            {
                                path : 'sales',
                                component : () => import('./views/accounting manager/Sales'),
                                meta : { breadcrumb : 'sales'},
                            }
                        ]
                    },
                    {
                        path : 'integration-management',
                        components : {
                            side : () => import('./views/integration manager/IntegrationMgtSide'),
                            content : () => import('./views/integration manager/IntegrationManager'),
                        },
                        meta : { breadcrumb : 'integration'},
                    },
                    {
                        path : 'resource-management',
                        components : {
                            side : () => import('./views/resource manager/ResourceMgtSide'),
                            content : () => import('./views/resource manager/ResourceManager'),
                        },
                        meta : { breadcrumb : 'resource'},
                    },
                    {
                        path : 'supplier-management',
                        components : {
                            side : () => import('./views/supplier manager/SupplierMgtSide'),
                            content : () => import('./views/supplier manager/SupplierManager'),
                        },
                        meta : { breadcrumb : 'suppliers'},
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
                  meta : { breadcrumb : 'login'}
              },
              {
                  path: 'Register',
                  name: 'register',
                  component: Register,
                  meta : { breadcrumb : 'register'}
              },
              {
                  path: 'activation/:token?',
                  name: 'activation',
                  component: Activation,
                  meta : { breadcrumb : 'activation'},
                  params : true
              },
              {
                  path: 'reset',
                  name: 'reset password',
                  component: Reset,
                  meta : { breadcrumb : 'reset password'}
              },
              {
                  path: 'password/:token?',
                  name: 'password',
                  component: Password,
                  meta : { breadcrumb : 'password'}
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
        if(!window.auth.check()){
            next({
                path : '/auth/login',
                query : { redirect: to.fullPath }
            });
            return;
        }
    }

    next();

});

export default router;
