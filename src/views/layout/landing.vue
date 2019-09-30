<template>
    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom white-bg">
            <nav class="navbar navbar-static-top" role="navigation">
                <div class="navbar-header">
                    <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                        <i class="fa fa-reorder"></i>
                    </button>
                    <a class="navbar-brand">{{ appName }}</a>
                </div>
                <div class="navbar-collapse collapse" id="navbar">
                    <ul class="nav navbar-nav">
                        <li>
                            <a>
                                <i class="fa fa-user-circle"></i> {{user.firstName + ' ' + user.lastName}}
                            </a>
                        </li>
                        <li class="active">
                            <a aria-expanded="false" role="button" target="_blank" href="/"> Go to mail</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <span class="m-r-sm text-muted welcome-message">{{today.toLocaleDateString("en-US", options)}}</span>
                        </li>

                        <li class="dropdown">
                            <a title="messages" class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i class="fa fa-envelope"></i>  <span class="label label-warning"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">

                            </ul>
                        </li>
                        <li class="dropdown">
                            <a title="Notifications" class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i class="fa fa-bell"></i>  <span class="label label-primary"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-alerts">

                            </ul>
                        </li>
                        <li>
                            <a title="Sign out" @click="signOut">
                                <i class="fa fa-sign-out-alt"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="wrapper wrapper-content">
            <div class="container">
                <div class="ibox-content" style="background: none; border: none; padding: 0; min-height: 75vh" :class="{'sk-loading' : loading}">
                    <spinner v-if="loading"/>
                    <div v-if="hasScopes" class="row">
                        <!--pos-->
                        <div v-if="can('view', 'sales')" class="col-lg-3">
                            <div class="widget white-bg  pos-tile p-lg text-center" @click="$router.push('/pos')" >
                                <div class="m-b-md">
                                    <i class="fa fa-cash-register fa-4x" style="color: #0091EA"></i>
                                    <h3 class="p-xs">Point of Sale</h3>
                                    <small class="tile-subtext">Make a sale, or send a quote/invoice</small>
                                </div>
                            </div>
                        </div>

                        <!--inventory-->
                        <div v-if="can('view', 'products')" class="col-lg-3">
                            <div class="widget white-bg inventory-tile p-lg text-center" @click="$router.push('/dashboard/inventory-management')">
                                <div class="m-b-md">
                                    <i class="fa fa-clipboard-list fa-4x" style="color: #FF6D00"></i>
                                    <h3 class="p-xs">Inventory</h3>
                                    <small class="tile-subtext">Add new stock, check what’s left and more</small>
                                </div>
                            </div>
                        </div>

                        <!--commpanies-->
                        <div class="col-lg-3"><!-- todo persmission for company v-if="can('view', 'users')"-->
                            <div class="widget white-bg user-tile p-lg text-center" @click="$router.push('/dashboard/company-management')">
                                <div class="m-b-md">
                                    <i class="fa fa-building fa-4x" style="color: #42b983"></i>
                                    <h3 class="p-xs">Companies</h3>
                                    <small class="tile-subtext">Manage and create company information</small>
                                </div>
                            </div>
                        </div>

                        <!--user-->
                        <div v-if="can('view', 'users')"  class="col-lg-3"><!-- -->
                            <div class="widget white-bg user-tile p-lg text-center" @click="$router.push('/dashboard/user-management')">
                                <div class="m-b-md">
                                    <i class="fa fa-users fa-4x" style="color: #AEEA00"></i>
                                    <h3 class="p-xs">Users</h3>
                                    <small class="tile-subtext">Create new users and manage specific roles</small>
                                </div>
                            </div>
                        </div>

                        <!--accounting-->
                        <div v-if="can('view', 'orders')" class="col-lg-3">
                            <div class="widget white-bg accounting-tile p-lg text-center" @click="$router.push('/dashboard/accounting-management')">
                                <div class="m-b-md">
                                    <i class="fa fa-file-invoice-dollar fa-4x" style="color: #AA00FF"></i>
                                    <h3 class="p-xs">Sales & Accounting</h3>
                                    <small class="tile-subtext">Study how the business is performing financially</small>
                                </div>
                            </div>
                        </div>

                        <!--supplier-->
                        <div v-if="canView"  class="col-lg-3">
                            <div class="widget white-bg supplier-tile p-lg text-center" > <!--@click="$router.push('/dashboard/supplier-management')"-->
                                <div class="m-b-md">
                                    <i class="fa fa-truck fa-4x" style="color: #0091EA"></i>
                                    <h3 class="p-xs">Suppliers</h3>
                                    <small class="tile-subtext">Mange aspects regarding your suppliers</small>
                                </div>
                            </div>
                        </div>
                        <!--integration-->

                        <div v-if="canView" class="col-lg-3">
                            <div class="widget white-bg integration-tile p-lg text-center" > <!--@click="$router.push('/dashboard/integration-management')"-->
                                <div class="m-b-md">
                                    <i class="fa fa-plug fa-4x" style="color: #DD2C00"></i>
                                    <h3 class="p-xs">Integrations</h3>
                                    <small class="tile-subtext">Mange aspects of integration such as with your website</small>
                                </div>
                            </div>
                        </div>

                        <!--resource-->
                        <div v-if="canView" class="col-lg-3">
                            <div class="widget white-bg resource-tile p-lg text-center" > <!--@click="$router.push('/dashboard/resource-management')"-->
                                <div class="m-b-md">
                                    <i class="fa fa-shopping-cart fa-4x" style="color: #0091EA"></i>
                                    <h3 class="p-xs">Resource</h3>
                                    <small class="tile-subtext">Mange resources and other third party elements</small>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Footer from '@/views/layout/Footer.vue'
    import permissions from "../../modules/mixins/Permissions";
    import Spinner from "../../components/Spinner";
    import { mapState } from 'vuex'

    export default {
        name: "landing",
        mixins : [permissions],
        components: {Spinner, Footer},
        data : function(){
            return {
                auth : window.auth,
                today : new Date(),
                options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            }
        },
        // beforeRouteEnter(to, from, next){
        //     next(v => {
        //         //todo check for active plan
        //          if (v.user.plan) {
        //              Event.$emit('businessPricing');
        //          }else {
        //              Event.$emit('userLoggedIn');
        //          }
        //     })
        // },
        computed : {
            user(){
                return JSON.parse(this.auth.authUser());
            },

            ...mapState({
                loading : state => state.loading
            })
        },

        beforeCreate() {
            document.body.className = 'top-navigation';
        },
        created(){
            //set page title
            document.title = `${this.appName} - ${this.user.firstName}`
        },
        methods : {
           signOut : function () {
               window.auth.logout();
           }
        },
    }
</script>

<style scoped>
    .navbar-static-top li a {
        padding: 15px 10px!important;
    }
    .tile-subtext{
        color: grey!important;
    }
    .tile-subtext{

    }
    .pos-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .pos-tile:hover{
        border: 1px solid #7B171A;
    }
    .inventory-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .inventory-tile:hover{
        border: 1px solid #7B171A;
    }
    .user-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .user-tile:hover{
        border: 1px solid #7B171A;
    }
    .accounting-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .accounting-tile:hover{
        border: 1px solid #7B171A;
    }
    .supplier-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .supplier-tile:hover{
        border: 1px solid #7B171A;
    }
    .integration-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .integration-tile:hover{
        border: 1px solid #7B171A;
    }
    .resource-tile {
        color: #7B171A;
        border: 1px solid #ffffff;
    }
    .resource-tile:hover{
        border: 1px solid #7B171A;
    }

    .widget{
        cursor: pointer;
        height: 200px;
        overflow: hidden;
    }
   .navy-bg:hover{
       background-color: #7B171A!important;
   }
</style>
