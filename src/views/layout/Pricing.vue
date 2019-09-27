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
                        <div class="row">
                            <router-view/>
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
    import Spinner from "../../components/Spinner";
    import { mapState } from 'vuex'
    export default {
        name: "Pricing",
        components: {Spinner, Footer},
        data : function(){
            return {
                auth : window.auth,
                today : new Date(),
                options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            }
        },
        beforeRouteEnter(to, from, next){
          next(v => {
              v.$store.dispatch('getPricingPlans');
          })
        },
        computed : {
            user(){
                return JSON.parse(this.auth.authUser());
            },

            ...mapState({
                loading : state => state.loading
            })
        },
        beforeCreate() {
            document.body.className = 'top-navigation landing-page no-skin-config  pace-done';
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

</style>
