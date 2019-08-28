<template>
    <div id="page-wrapper" class="gray-bg" style="min-height: 635px;">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#" @click="toggle"><i class="fa fa-bars"></i> </a>

                </div>
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
                        <a title="Sign out" @click="signOut">
                            <i class="fa fa-sign-out-alt"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-6">
                <h2 class="text-capitalize">{{sanitizeHeaders($route.path)}}</h2>
                <ol class="breadcrumb" v-if="crumbs.length">
                    <li v-for="(crumb, key) in crumbs" :key="key">
                        <small class="text-muted">
                            <router-link :to="crumb.to" >{{ crumb.text}}</router-link>
                        </small>
                    </li>
                </ol>
            </div>
            <div class="col-lg-6">
                <router-view name="action"></router-view>
            </div>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <router-view name="view"></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        name: "Page",
        data : function(){
            return {
                today : new Date(),
                options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            }
        },
        beforeCreate() {
            document.body.className = '';
        },
        computed : {
            crumbs : function() {
                let pathArray = this.$route.path.split("/")
                pathArray.shift()
                let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                    breadcrumbArray.push({
                        path: path,
                        to: this.$route.matched[idx + 1].path,
                        text: this.$route.matched[idx + 1].meta.breadcrumb || path,
                    });
                    return breadcrumbArray;
                }, [])
                return breadcrumbs;
            }
        },
        methods : {
            sanitizeHeaders : function (heading){
                let arr =  heading.split('/');
                return arr[2].replace('-', ' ');
            },
            toggle : function () {
                document.body.classList.toggle('mini-navbar');
            },
            signOut : function () {
                window.auth.logout();
            }

        },
    }
</script>

<style scoped>
    .router-link-exact-active {
        font-weight: bold;
    }
</style>