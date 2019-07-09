<template>
    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom white-bg">
            <nav class="navbar navbar-static-top" role="navigation">
                <div class="navbar-header">
                    <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                        <i class="fa fa-reorder"></i>
                    </button>
                    <a href="#" class="navbar-brand">FOCUS</a>
                </div>
                <div class="navbar-collapse collapse" id="navbar">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a aria-expanded="false" role="button" href="https://digital4africa.com"> Go to website</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <a @click="signOut">
                                <i class="fa fa-sign-out"></i> Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="wrapper wrapper-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/dashboard/user-management')">
                            <div class="m-b-md">
                                <i class="fa fa-users fa-4x"></i>
                                <h3 class="p-xs">User Manager</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/dashboard/inventory-management')">
                            <div class="m-b-md">
                                <i class="fa fa-list-alt fa-4x"></i>
                                <h3 class="p-xs">Inventory Manager</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/dashboard/accounting-management')" >
                            <div class="m-b-md">
                                <i class="fa fa-file-invoice-dollar fa-4x"></i>
                                <h3 class="p-xs">Sales & Accounting</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/pos')" >
                            <div class="m-b-md">
                                <i class="fa fa-cash-register fa-4x"></i>
                                <h3 class="p-xs">Point of Sale</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/dashboard/supplier-management')">
                            <div class="m-b-md">
                                <i class="fa fa-truck fa-4x"></i>
                                <h3 class="p-xs">Suppliers Manager</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/dashboard/integration-management')">
                            <div class="m-b-md">
                                <i class="fa fa-plug fa-4x"></i>
                                <h3 class="p-xs">Integration Manager</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget navy-bg p-lg text-center" @click="$router.push('/dashboard/resource-management')">
                            <div class="m-b-md">
                                <i class="fa fa-shopping-cart fa-4x"></i>
                                <h3 class="p-xs">Resource Manager</h3>
                                <small>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
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
    export default {
        name: "landing",
        components: {
            Footer
        },
        beforeCreate() {
            document.body.className = 'top-navigation';
        },
        methods : {
           signOut : function () {
               window.auth.logout();
           }
        }
    }
</script>

<style scoped>
    .navy-bg{
        cursor: pointer;
    }
   .navy-bg:hover{
       background-color: #7B171A!important;
   }
</style>