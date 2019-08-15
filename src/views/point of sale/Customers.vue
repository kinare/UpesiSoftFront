<template>
    <div class="col-xs-10 col-xs-push-1 m-b-md m-t-md">
        <div class="row">
            <div class="col-xs-3">
                <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
            </div>
            <div class="col-xs-6">
                <h2 class="text-center" style="margin-top: 10px">Customers</h2>
            </div>
            <div v-if="canCreate" class="col-xs-3">
                <router-link to="/pos/customers/card" class="btn btn-primary btn-lg pull-right"> Add Customer <i class="fa fa-user-plus"></i></router-link>
            </div>
        </div>
        <div class="hr-line-dashed"></div>
        <div class="row m-b-md">
            <div class="col-xs-8 col-xs-push-2">
                <form>
                    <div class="input-group">
                        <input type="text" placeholder="Search Customer" v-model="term" class="form-control">
                        <div class="input-group-btn">
                            <button class="btn  btn-primary" type="submit">
                                Search
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
        <div class="row">
            <div class="ibox-content" style="border:  1px solid #e7eaec;">
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
                            <td @click="selectCustomer(customer)">{{index + 1}}</td>
                            <td @click="selectCustomer(customer)">{{customer.isBusiness ? customer.customerBusinessName : customer.customerFirstName + ' ' + customer.customerLastName}}</td>
                            <td @click="selectCustomer(customer)">+{{customer.customerCountryCode + ' ' + customer.customerPhoneNumber}}</td>
                            <td @click="selectCustomer(customer)">{{customer.customerEmail}}</td>
                            <td @click="selectCustomer(customer)"><span class="badge" :class="customer.isBusiness ? 'badge-primary' : 'badge-info' ">{{customer.isBusiness ? 'Business' : 'individual'}}</span> </td>
                            <td >
                                <a v-if="canView" @click="selectedCustomer = customer" class="btn btn-xs btn-white"  data-toggle="modal" data-target="#customerCard"><i class="fa fa-eye text-success"></i> &nbsp; view</a>
                                <a v-if="canDelete" @click="selectedCustomerId = customer.id" class="btn btn-xs btn-white"  data-toggle="modal" data-target="#customerDeleteCard" data-backdrop="static" data-keyboard="false"><i class="fa fa-trash text-danger"></i> &nbsp; remove</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
                                <a class="btn btn-primary" data-dismiss="modal" @click="selectCustomer(selectedCustomer)"><i class="fa fa-user-check"></i> Select</a> &nbsp;
                                <router-link data-dismiss="modal" :to="'/pos/customers/card/' + selectedCustomer.id" class="btn btn-white" ><i class="fa fa-edit"></i> Edit</router-link>
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

        <!-- confirm remove Modal-->
        <div class="modal fadeIn" id="customerDeleteCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title text-center">Confirmation</h4>
                    </div>
                    <div class="modal-body text-center">
                        <h1>Are you sure to delete?</h1>
                        <br>
                        <div class="row ">
                            <a class="btn btn-primary btn-block" @click="removeCustomer(selectedCustomerId)">Yes</a>
                            <a class="btn btn-white btn-block" data-dismiss="modal">No</a> &nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import permissions from "../../modules/mixins/Permissions";

    export default {
        name: "Customers",
        mixins : [permissions],
        data : function(){
            return {
                scope : 'customers',
                namespace : '',
                term : '',
                selectedCustomer : {},
                mode : 'view',
                save : false,
                selectedCustomerId : ''
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.namespace = to.params.namespace;
                v.$store.dispatch('pos/getCustomers');
            })
        },
        computed : {
            filteredCustomers(){
                let self = this
                return this.term === ''
                ? this.customers
                : this.customers.filter(customer => {

                        return customer.customerFirstName   ? customer.customerFirstName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0        : ''
                        || customer.customerLastName        ? customer.customerLastName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0         : ''
                        || customer.customerBusinessName    ? customer.customerBusinessName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0     : ''
                        || customer.customerEmail           ? customer.customerEmail.toLowerCase().indexOf(self.term.toLowerCase()) >= 0            : ''
                        || customer.customerPhoneNumber     ? customer.customerPhoneNumber.toLowerCase().indexOf(self.term.toLowerCase()) >= 0      : ''
                        || customer.customerPostalAddress   ? customer.customerPostalAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0    : ''
                        || customer.customerAddress         ? customer.customerAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0          : ''
                    })
            },
            ...mapState('pos', {
                customers : state => state.customers,
                message : state => state.message,
                loading : state => state.loading,
            }),
            ...mapGetters('pos',[
                'getCurrentTab'
            ])
        },
        methods : {
            selectCustomer : function (customer) {
                this.$store.commit(this.getCurrentTab.namespace + '/SET_CUSTOMER', customer);
                // this.$router
                this.$router.go(-1); //go where you came from
                // this.$router.push('/pos/payment/' + this.getCurrentTab.namespace.split('/').pop())
            },

            removeCustomer : function (id) {
                this.$store.dispatch('pos/removeCustomer',  { data : {customerId : id}})
                // eslint-disable-next-line no-undef
                $("#customerDeleteCard").modal('hide');
            }
        }

    }
</script>

<style scoped>

</style>