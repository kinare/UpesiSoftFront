<template>
    <div class="col-xs-10 col-xs-push-1 m-b-md m-t-md">
        <div class="row">
            <div class="col-xs-3">
                <a @click="$router.go(-1)" class="btn btn-white btn-lg pull-left"><i class="fa fa-arrow-left"></i> Back </a>
            </div>
            <div class="col-xs-6">
                <h2 class="text-center" style="margin-top: 10px">Customers</h2>
            </div>
            <div class="col-xs-3">
                <a class="btn btn-primary btn-lg pull-right" data-toggle="modal" data-target="#customerModal" @click="selectedCustomer = {}; mode = 'new'"> Add Customer <i class="fa fa-user-plus"></i></a>
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
                            <th>Business</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Postal Address</th>
                            <th>Physical Address</th>
                            <th>Physical Address</th>
                            <th>Action</th>
                        </tr>

                        </thead>
                        <tbody>
                        <tr v-for="(customer, index) in filteredCustomers" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{customer.customerFirstName + ' ' + customer.customerLastName}}</td>
                            <td>{{customer.customerBusinessName}}</td>
                            <td><span class="badge" :class="customer.isBusiness ? 'badge-primary' : 'badge-info' ">{{customer.isBusiness ? 'Business' : 'indivisual'}}</span> </td>
                            <td>{{customer.customerEmail}}</td>
                            <td>{{customer.customerPhoneNumber}}</td>
                            <td>{{customer.customerPostalAddress}}</td>
                            <td>{{customer.customerAddress}}</td>
                            <td>{{customer.customerCountryCode}}</td>
                            <td><a class="btn btn-sm btn-default" data-toggle="modal" data-target="#customerModal" @click="selectedCustomer = customer; mode = 'view'"><i class="fa fa-eye"></i> view</a> </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

<!--        customer modal-->
        <div class="modal inmodal fade" id="customerModal" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">{{mode === 'view' ? 'View' : 'New'}} customer</h4>
                    </div>
                    <div class="modal-body">
                       <customer-card :customer="selectedCustomer" :mode="mode"></customer-card>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-if="mode === 'new'" @click="save">Save</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CustomerCard from "./CustomerCard";
    export default {
        name: "Customers",
        components: {CustomerCard},
        data : function(){
            return {
                namespace : '',
                term : '',
                selectedCustomer : {},
                mode : 'view',
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.namespace = to.params.namespace
                v.$store.dispatch('pos/getCustomers');
            })
        },
        computed : {
            filteredCustomers(){
                let self = this
                return this.term === ''
                ? this.customers
                : this.customers.filter(customer => {

                        /*customer.customerFirstName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0*/
                        // || customer.customerLastName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                        /*||*/

                    return  customer.customerBusinessName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                        || customer.customerEmail.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                        || customer.customerPhoneNumber.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                        || customer.customerPostalAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                        || customer.customerAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    })
            },
            ...mapState('pos', {
                customers : state => state.customers,
                message : state => state.message,
                loading : state => state.loading,
            })
        }

    }
</script>

<style scoped>

</style>