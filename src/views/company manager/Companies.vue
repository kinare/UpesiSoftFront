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
                            <tr v-for="(company, index) in filteredCompanies" v-bind:key="index" style="cursor: pointer" @click="openCompany(company.id)">
                                <td>{{index + 1}}</td>
                                <td>{{company.name}}</td>
                                <td>{{company.owner}}</td>
                                <td>{{company.email}}</td>
                                <td>{{company.phone}}</td>
                                <td>{{company.address}}</td>
                                <td>{{company.physicalLocation}}</td>
                                <td>{{company.kraPin}}</td>
                                <td>{{company.vatNo}}</td>
                                <td>{{company.users}}</td>
                                <td>{{company.value}}</td>
                                <td>{{company.dateCreated}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(companies)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--        company modal-->
        <div class="modal in fade" id="companyModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Edit Company</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="ibox">
                                    <div class="ibox-content product-box">
                                        <div class="product-imitation" :style="'background-image : url(' + url + ')'" style="background-repeat: no-repeat; background-size: cover; background-position: top center">
                                            {{url === '' ? '[ UPLOAD LOGO ]' : ''}}
                                        </div>
                                        <div class="product-desc">
                                            <label class="btn btn-block btn-white">
                                                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                                <i class="fa fa-image" ></i> upload image
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <form>
                                    <div class="form-group">
                                        <label class="control-label">Name</label>
                                        <input type="text" class="form-control">
                                        <span class="help-block"></span>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">Email</label>
                                            <input type="text" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">Phone</label>
                                            <input type="text" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6"> <div class="form-group">
                                            <label class="control-label">Address</label>
                                            <input type="text" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">Physical Location</label>
                                            <input type="text" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">KRA PIN</label>
                                            <input type="text" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">VAT NO.</label>
                                            <input type="text" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                    </div>
                                </form>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveCompanyInfo()">Save</button>
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
                url : '',
                scope : 'companies',
                term : '',
                selectedCompany : '',
                validator : window.validator,
                formData :{
                    logo : ''
                },
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
            openCompany : function(company){
                this.selectedCompany = company;

                // eslint-disable-next-line no-undef
                $("#companyModal").modal('show')
            },
            saveCompanyInfo : function () {

            },

            handleFileUpload(){
                this.formData.logo = this.$refs.file.files[0];
                this.url = URL.createObjectURL(this.formData.logo);
            },
        },
    }
</script>

<style scoped>
    input[type="file"] {
        display: none;
    }
</style>
