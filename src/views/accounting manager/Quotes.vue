<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Quotes</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('accounting/getDocuments', param)"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5">
                            <form>
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search order">
                                    <div class="input-group-btn">
                                        <a @click="term ='' " class="btn btn-default" ><span class="fa fa-times"></span></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="table-responsive product-list">
                        <table class="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Date Created</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doc, index) in filteredDocuments" v-bind:key="index" style="cursor: pointer" @click="openDocument(doc)">
                                    <td>{{index + 1}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(quotes)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--document modal-->
        <div class="modal  in fade" id="docCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Document Card</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders">

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Spinner from "../../components/Spinner";
    export default {
        name: "Invoice",
        components: {Spinner},
        data : function () {
            return {
                param : {
                    type : 'QUOTE',
                },
                term : '',
                selectedDocument : {},
                validator : window.validator
            }
        },
        beforeRouteEnter(to, from, next){
            next(v =>{
                v.$store.dispatch('accounting/getDocuments', v.param);
            })
        },
        computed : {
            filteredDocuments(){
                let self = this;
                return this.term === ''
                    ? this.quotes
                    : this.quotes.filter(order =>{
                        return order
                    })
            },

            ...mapState('accounting',{
                quotes : state => state.orders,
                loading : state => state.loading,
                message : state => state.message,
                status : state => state.status,
            })
        },
        methods : {
            openDocument : function (doc) {
                this.selectedDocument = doc;
                // eslint-disable-next-line no-undef
                $("#docCard").modal('show');
            },
        }
    }
</script>

<style scoped>

</style>