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
                                <th>Type</th>
                                <th>Country</th>
                                <th>Physical Location</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>KRA PIN</th>
                                <th>VAT NO</th>
                                <th>Currency</th>
                                <th>Date Created</th>
                            </tr>
                            </thead>
                           <tbody>
                            <tr v-for="(company, index) in filteredCompanies" v-bind:key="index" style="cursor: pointer" @click="openCompany(company)" >
                                <td>{{index + 1}}</td>
                                <td>{{company.businessName}}</td>
                                <td>{{company.businessTypeName}}</td>
                                <td>{{company.businessCountry}}</td>
                                <td>{{company.businessPhysicalAddress}}</td>
                                <td>{{company.businessPhoneNumber}}</td>
                                <td>{{company.businessPostalAddress}}</td>
                                <td>{{company.businessKraPin}}</td>
                                <td>{{company.businessVatNumber}}</td>
                                <td>{{company.businessCurrency}}</td>
                                <td>{{company.createdAt}}</td>
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
                                        <input type="text" class="form-control" v-model="selectedCompany.businessName">
                                        <span class="help-block"></span>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Tagline</label>
                                        <input type="text" class="form-control" v-model="selectedCompany.businessTagline">
                                        <span class="help-block"></span>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">Email</label>
                                            <input type="text" v-model="selectedCompany.businessEmail" class="form-control">
                                            <span class="help-block"></span>
                                        </div></div>
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">Phone</label>
                                            <input type="text" class="form-control" v-model="selectedCompany.businessPhoneNumber">
                                            <span class="help-block"></span>
                                        </div></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6"> <div class="form-group">
                                            <label class="control-label">Address</label>
                                            <input type="text" class="form-control" v-model="selectedCompany.businessPostalAddress">
                                            <span class="help-block"></span>
                                        </div></div>
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">Physical Location</label>
                                            <input type="text" class="form-control" v-model="selectedCompany.businessPhysicalAddress">
                                            <span class="help-block"></span>
                                        </div></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">KRA PIN</label>
                                            <input type="text" class="form-control" v-model="selectedCompany.businessKraPin">
                                            <span class="help-block"></span>
                                        </div></div>
                                        <div class="col-md-6"><div class="form-group">
                                            <label class="control-label">VAT NO.</label>
                                            <input type="text" class="form-control" v-model="selectedCompany.businessVatNumber">
                                            <span class="help-block"></span>
                                        </div></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label">Terms & Conditions</label>
                                        <textarea class="form-control" v-model="selectedCompany.businessTerms"></textarea>
                                        <span class="help-block"></span>
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
                scope : 'business',
                term : '',
                validator : window.validator,
                url : '',
                selectedCompany : {
                    businessName: '',
                    businessTagline: '',
                    businessEmail: '',
                    businessTypeId:'',
                    businessKraPin:'',
                    businessVatNumber:'',
                    businessCurrency:'',
                    businessCountryCode:'',
                    businessPhoneNumber:'',
                    businessCountry:'',
                    businessPhysicalAddress:'',
                    businessPostalAddress:'',
                    businessTerms:'',
                },
                formDataError : {
                    businessName: {
                        status : '',
                        message : '',
                    },
                    businessTypeId:{
                        status : '',
                        message : '',
                    },
                    businessKraPin:{
                        status : '',
                        message : '',
                    },
                    businessVatNumber:{
                        status : '',
                        message : '',
                    },
                    businessCurrency:{
                        status : '',
                        message : '',
                    },
                    businessCountryCode:{
                        status : '',
                        message : '',
                    },
                    businessPhoneNumber:{
                        status : '',
                        message : '',
                    },
                    businessCountry:{
                        status : '',
                        message : '',
                    },
                    businessPhysicalAddress:{
                        status : '',
                        message : '',
                    },
                    businessPostalAddress:{
                        status : '',
                        message : '',
                    },
                },
                rules : {
                    businessName: 'required',
                    businessTypeId:'required',
                    businessKraPin:'required',
                    businessVatNumber:'required',
                    businessCurrency:'required',
                    businessCountryCode:'required',
                    businessPhoneNumber:'required',
                    businessCountry:'required',
                    businessPhysicalAddress:'required',
                    businessPostalAddress:'required',
                }
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
                this.url = company.businessLogoImage;

                // eslint-disable-next-line no-undef
                $("#companyModal").modal('show')
            },
            saveCompanyInfo : function () {
                //validate
                let res = window.validator.fields(this.selectedCompany, this.rules, this.formDataError)
                if (res.hasErrors){
                    this.formDataError = res.errors;
                } else {
                    this.$store.dispatch('companyMgt/updateCompanyInfo', window.helper.prepareFormData(this.selectedCompany));
                    // eslint-disable-next-line no-undef
                    $("#companyModal").modal('hide')
                    this.selectedCompany = {};
                }
            },

            handleFileUpload(){
                this.selectedCompany.businessLogoImage = this.$refs.file.files[0];
                this.url = URL.createObjectURL(this.selectedCompany.businessLogoImage);
            },
        },
    }
</script>

<style scoped>
    input[type="file"] {
        display: none;
    }
</style>
