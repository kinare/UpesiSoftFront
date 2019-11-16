<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Customers</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('customer/getCustomers')"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5">
                            <form>
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search Customer">
                                    <div class="input-group-btn">
                                        <a @click="term ='' " class="btn btn-default" ><span class="fa fa-times"></span></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th >Action</th>
                            </tr>

                            </thead>
                            <tbody>
                            <tr v-for="(customer, index) in filteredCustomers" :key="index"  style="cursor: pointer" title="Click to select customer">
                                <td @click="selectCustomer(customer)" >{{index + 1}}</td>
                                <td @click="selectCustomer(customer)" >{{customer.isBusiness ? customer.customerBusinessName : customer.customerFirstName + ' ' + customer.customerLastName}}</td>
                                <td @click="selectCustomer(customer)" >+{{customer.customerCountryCode + ' ' + customer.customerPhoneNumber}}</td>
                                <td @click="selectCustomer(customer)" >{{customer.customerEmail}}</td>
                                <td @click="selectCustomer(customer)" ><span class="badge" :class="customer.isBusiness ? 'badge-primary' : 'badge-info' ">{{customer.isBusiness ? 'Business' : 'individual'}}</span> </td>
                                <td >
                                    <a v-if="canView" @click="selectedCustomer = customer" class="btn btn-xs btn-white"  data-toggle="modal" data-target="#customerCard"><i class="fa fa-eye text-success"></i> &nbsp; view</a>
                                    <a v-if="canDelete" @click="removeCustomer(customer.id)" class="btn btn-xs btn-white" ><i class="fa fa-trash text-danger"></i> &nbsp; remove</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!--        customer modal-->
        <div class="modal inmodal fadeIn" id="customerCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Customer Card</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 text-right">
                                <router-link data-dismiss="modal" :to="'/dashboard/customer-management/customer/card/' + selectedCustomer.id" class="btn btn-white" ><i class="fa fa-edit"></i> Edit</router-link>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="profile-image">
                                    <img :src="selectedCustomer.customerProfilePicture || '/img/placeholder.jpg'" class="img-circle circle-border m-b-md" alt="profile">
                                </div>
                                <div class="profile-info">
                                    <div class="">
                                        <div>
                                            <h1 class="">
                                                {{selectedCustomer.isBusiness ? selectedCustomer.customerBusinessName : selectedCustomer.customerFirstName + ' ' + selectedCustomer.customerLastName}}
                                            </h1>
                                            <h4><i class="fa fa-phone"></i>   + {{selectedCustomer.customerCountryCode + ' ' + selectedCustomer.customerPhoneNumber}}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <dl class="dl-horizontal" style="margin-top: 20px">
                                    <dt>Email:</dt> <dd>{{selectedCustomer.customerEmail}}</dd>
                                    <dt>Postal Address:</dt> <dd> {{selectedCustomer.customerPostalAddress}}</dd>
                                    <dt>Physical Address:</dt> <dd>{{selectedCustomer.customerAddress}}</dd>
                                </dl>
                            </div>
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
    import Spinner from "../../components/Spinner";
    import permissions from "../../modules/mixins/Permissions";
    import sanitizer from "../../modules/mixins/SanitizeRecords";
    import {mapState} from "vuex";
    export default {
        name: "Customer",
        components: {Spinner},
        mixins : [permissions, sanitizer],
        data : function(){
            return {
                scope : 'customers',
                term : '',
                validator : window.validator,
                selectedCustomer : {},
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('customer/getCustomers');
            })
        },
        computed : {
            filteredCustomers(){
                let self = this
                return this.term === ''
                    ? this.customers
                    : this.sanitize(this.customers).filter(customer => {
                        return  customer.customerFirstName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || customer.customerLastName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || customer.customerBusinessName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || customer.customerEmail.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || customer.customerPhoneNumber.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || customer.customerPostalAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                            || customer.customerAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    })
            },

            ...mapState('customer',{
                customers : state => state.customers,
                message : state => state.message,
                status : state => state.status,
                loading : state => state.loading,
            }),
        },
        methods : {
            selectCustomer : function (customer) {
                this.$router.push(`/dashboard/customer-management/customer/card/${customer.id}`);
            },

            removeCustomer : function (id) {
                this.$confirm.show({
                    title : 'Confirmation',
                    text : 'Are you sure to remove customer',
                    onConfirm : () => {
                        this.$store.dispatch('customer/removeCustomer',  { data : {customerId : id}})
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>