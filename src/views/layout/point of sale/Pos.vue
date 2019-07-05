<template>
    <fullscreen ref="fullscreen" @change="fullscreenChange" style="background-color: #ffffff">
        <div class="pos-container white-bg">
            <div class="pos-bar">
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
                                <a @click="toggle">
                                    <i class="fa fa-expand-arrows-alt"></i> Fullscreen
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i class="fa fa-sign-out-alt"></i> Log out
                                </a>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </div>
            <router-view/>
            <div class="pos-footer">
                <div class="footer">
                <div class="pull-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> Example Company © 2014-2017
                </div>
            </div>
            </div>
        </div>
    </fullscreen>
</template>

<script>
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
            }
        },
        beforeCreate() {
            document.body.className = 'top-navigation white-bg';
        }
    }
</script>

<style scoped>

</style>