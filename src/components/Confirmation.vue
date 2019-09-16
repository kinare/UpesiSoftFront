<template>
    <div class="modal fadeIn" id="confirmationModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
<!--                    title-->
                    <h4 class="modal-title text-center">{{params.title}}</h4>
                </div>
                <div class="modal-body text-center">
<!--                    action name-->
                    <h1>{{params.text}}</h1>
                    <br>
                    <div class="row">
                        <div class="col-xs-6">
                            <a class="btn btn-lg btn-white btn-block" data-dismiss="modal">No</a>
                        </div>
                        <div class="col-xs-6">
                            <a class="btn btn-lg btn-primary btn-block" @click="confirm()">Yes</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Confirm from '../modules/plugins/Confirmation'
    export default {
        name: "Confirmation",
        data : function(){
            return {
                params : {
                    title : '',
                    text : '',
                    onConfirm : {}
                }
            }
        },

        mounted(){
            Confirm.EventBus.$on('show', (params) => {
                this.show(params);
            });
        },

        methods : {
            show : function(params){
                this.params = params;
                // eslint-disable-next-line no-undef
                $("#confirmationModal").modal({backdrop:'static',keyboard:false, show:true});
            },

            hide : function () {
                // eslint-disable-next-line no-undef
                $("#confirmationModal").modal('hide');
            },

            confirm : function () {
                if (typeof this.params.onConfirm === "function"){
                    this.params.onConfirm();
                    this.hide();
                } else {
                    this.hide();
                }
            }
        }
    }
</script>

<style scoped>

</style>
