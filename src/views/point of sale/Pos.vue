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
                        <li class="active">
                            <a aria-expanded="false" role="button" href="https://digital4africa.com"> Go to website</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <a @click="toggle">
                                <i class="fa fa-expand-arrows-alt"></i> Fullscreen
                            </a>
                        </li>
                        <li>
                            <a @click="signOut">
                                <i class="fa fa-sign-out"></i> Sign out
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
                    Made with <i class="fa fa-heart text-danger"></i>  <a href="https://digital4africa.com/" > by Digital 4 Africa</a>
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
                fullscreen: false
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
            if (!(this.$store && this.$store.state && this.$store.state["inventory"])) {
                this.$store.registerModule('inventory', inventory)
            }
            if (!(this.$store && this.$store.state && this.$store.state["pos"])) {
                this.$store.registerModule('pos', pos)
            }
        }
    }
</script>

<style scoped>

</style>