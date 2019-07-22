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
                            <th>Business</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Postal Address</th>
                            <th>Physical Address</th>
                            <th>Country Code</th>
                            <th>Action</th>
                        </tr>

                        </thead>
                        <tbody>
                        <tr v-for="(customer, index) in filteredCustomers" :key="index" style="cursor: pointer">
                            <td>{{index + 1}}</td>
                            <td>{{customer.customerFirstName + ' ' + customer.customerLastName}}</td>
                            <td>{{customer.customerBusinessName}}</td>
                            <td><span class="badge" :class="customer.isBusiness ? 'badge-primary' : 'badge-info' ">{{customer.isBusiness ? 'Business' : 'indivisual'}}</span> </td>
                            <td>{{customer.customerEmail}}</td>
                            <td>{{customer.customerPhoneNumber}}</td>
                            <td>{{customer.customerPostalAddress}}</td>
                            <td>{{customer.customerAddress}}</td>
                            <td>{{customer.customerCountryCode}}</td>
                            <td><a class="btn btn-sm btn-default" @click="selectCustomer(customer)" ><i class="fa fa-mouse-pointer"></i> select</a> </td>
                            <td><router-link :to="'/pos/customers/card/' + customer.id" class="btn btn-sm btn-default" ><i class="fa fa-eye"></i> view</router-link> </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    export default {
        name: "Customers",
        data : function(){
            return {
                namespace : '',
                term : '',
                selectedCustomer : {},
                mode : 'view',
                save : false,
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
                this.$router.go(-1); //go where you came from
                // this.$router.push('/pos/payment/' + this.getCurrentTab.namespace.split('/').pop())
            }
        }

    }
</script>

<style scoped>

</style>