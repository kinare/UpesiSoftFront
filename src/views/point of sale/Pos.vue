<template>
    <fullscreen ref="fullscreen" @change="fullscreenChange" style="background-color: #ffffff">
        <div id="page-wrapper" class="">
        <div class="row border-bottom white-bg">
            <nav class="navbar navbar-static-top" role="navigation">
                <div class="navbar-header">
                    <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                        <i class="fa fa-bars"></i>
                    </button>
                    <router-link to="/" class="navbar-brand" >FOCUS</router-link>
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
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i class="fa fa-envelope"></i>  <span class="label label-warning"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">

                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                <i class="fa fa-bell"></i>  <span class="label label-primary"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-alerts">

                            </ul>
                        </li>
                        <li>
                            <a title="Fullscreen" @click="toggle">
                                <i class="fa fa-expand-arrows-alt"></i>
                            </a>
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
        <div class="wrapper wrapper-content" style="padding-top: 0">
            <div class="container-fluid">
                <router-view/>
            </div>
        </div>
        <div class="footer">
            <div class="footer">
                <div class="pull-right">
                    Made with <i class="fa fa-heart text-danger"></i>  <a href="https://digital4africa.com/" target="_blank" > by Digital 4 Africa</a>
                </div>
                <div>
                    <strong>Copyright</strong> Focus Glass & Alluminium © 2019
                </div>
            </div>
        </div>
    </div>
    </fullscreen>
</template>

<script>
    import inventory from '../../modules/store/inventory/store';
    import pos from '../../modules/store/pos/store';
        export default {
        name: "Pos",
        data : function(){
            return {
                fullscreen: false,
                auth : window.auth,
                today : new Date(),
                options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            }
        },
        computed : {
            user(){
                return JSON.parse(this.auth.authUser());
            }
        },
        methods : {
            toggle () {
                this.$refs['fullscreen'].toggle() // recommended
                // this.fullscreen = !this.fullscreen // deprecated
            },
            fullscreenChange (fullscreen) {
                this.fullscreen = fullscreen
            },
            signOut : function () {
                window.auth.logout();
            }
        },
        beforeCreate() {
            document.body.className = 'top-navigation white-bg';
        },
        created() {
            if(!this.$store._modules.root._children[`inventory`]) {
                this.$store.registerModule('inventory', inventory)
            }

            if(!this.$store._modules.root._children[`pos`]) {
                this.$store.registerModule('pos', pos)
            }
        }
    }
</script>

<style scoped>
    .navbar-static-top li a {
        padding: 15px 10px!important;
    }
</style>