<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Users</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('companyMgt/getCompanies')"></i>
                        </a>
                        <!-- todo enable permision v-if="canCreate"--><a  class="btn btn-xs btn-primary" data-toggle="modal" data-target="#userCard">
                            <i class="fa fa-user-plus" ></i> New Company
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                   <spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5">
                            <form>
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search">
                                    <div class="input-group-btn">
                                        <button type="submit" class="btn btn-default" >Go <span class="fa fa-arrow-right"></span></button>
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
                                <th>Owner</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Physical Location</th>
                                <th>KRA PIN</th>
                                <th>VAT NO</th>
                                <th>No. of Users</th>
                                <th>Value</th>
                                <th>Date Created</th>
                            </tr>
                            </thead>
                           <tbody>
                            <tr v-for="(company, index) in filteredCompanies" v-bind:key="index" style="cursor: pointer" >
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(companies)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Spinner from "../../components/Spinner";
    import permissions from "../../modules/mixins/Permissions";
    import sanitizer from "../../modules/mixins/SanitizeRecords";
    export default {
        name: "Companies",
        components: {Spinner},
        mixins : [permissions, sanitizer],
        data : function(){
            return {
                scope : 'companies',
                term : '',
                validator : window.validator,
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('companyMgt/getCompanies');
            })
        },
        computed : {
            filteredCompanies(){
                let self = this;
                return this.term === ''
                    ? this.companies
                    : this.sanitize(this.companies).filter(company => {
                        return company.name.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                })
            },

            ...mapState('companyMgt',{
                companies : state => state.companies,
                message : state => state.message,
                status : state => state.status,
                loading : state => state.loading,
            }),
        },
        methods : {

        },
    }
</script>

<style scoped></style>
