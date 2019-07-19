<template>
    <div class="container-fluid">
        <div class="row">
            <div v-if="mode === 'view'" class="col-md-12 text-right">
<!--                <a class="btn btn-primary"><i class="fa fa-user-check"></i> Select</a> &nbsp;-->
                <a class="btn btn-white"><i class="fa fa-edit"></i> Edit</a>
            </div>
        </div>
        <div v-if="mode === 'view'" class="row">
            <div class="col-md-6">
                <div class="profile-image">
                    <img src="/img/a4.jpg" class="img-circle circle-border m-b-md" alt="profile">
                </div>
                <div class="profile-info">
                    <div class="">
                        <div>
                            <h2 class="">
                               {{customer.customerFirstName + ' ' + customer.customerLastName}}
                            </h2>
                            <h4>{{customer.customerBusinessName}}</h4>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <dl class="dl-horizontal" style="margin-top: 20px">
                    <dt>Phone:</dt> <dd>{{customer.customerPhoneNumber}}</dd>
                    <dt>Email:</dt> <dd>{{customer.customerEmail}}</dd>
                    <dt>Postal Address:</dt> <dd> {{customer.customerPostalAddress}}</dd>
                    <dt>Physical Address:</dt> <dd>{{customer.customerAddress}}</dd>
                </dl>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-md-4">
                <div class="ibox">
                    <div class="ibox-content product-box">
                        <div class="product-imitation">
                            [ IMAGE ]
                        </div>
                        <div class="product-desc">
                            <div class="">
                                <a class="btn btn-sm btn-outline btn-block btn-primary"><i class="fa fa-image"></i>  select image </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <form>
                    <div class="form-group " :class="formDataError.isBusiness.status">
                        <label class="control-label">Customer Type</label>
                        <div class="col-sm-12 m-b">
                            <label class="radio-inline">
                                <input type="radio" value="0" v-model="formData.isBusiness"> Individual
                            </label>
                            <label class="radio-inline">
                                <input type="radio" value="1" v-model="formData.isBusiness"> Business
                            </label>
                        </div>
                        <span class="help-block">{{formDataError.isBusiness.message}}</span>
                    </div>

                    <div class="form-group" v-if="formData.isBusiness === '1'" :class="formDataError.businessName.status">
                        <label class="control-label">Buiness Name</label>
                        <input type="text" class="form-control" v-model="formData.businessName">
                        <span class="help-block">{{formDataError.businessName.message}}</span>
                    </div>

                    <div class="row" v-if="formData.isBusiness === '0'">
                        <div class="col-md-6">
                            <div class="form-group" :class="formDataError.customerFirstName.status">
                                <label class="control-label">First Name</label>
                                <input type="text" class="form-control" v-model="formData.customerFirstName">
                                <span class="help-block">{{formDataError.customerFirstName.message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" :class="formDataError.customerLastName.status">
                                <label class="control-label">First Name</label>
                                <input type="text" class="form-control" v-model="formData.customerLastName">
                                <span class="help-block">{{formDataError.customerLastName.message}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group" :class="formDataError.customerEmail.status">
                                <label class="control-label">Email</label>
                                <input type="email" class="form-control" v-model="formData.customerEmail">
                                <span class="help-block">{{formDataError.customerEmail.message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" :class="formDataError.customerPhoneNumber.status">
                                <label class="control-label">Phone</label>
                                <input type="tel" class="form-control" v-model="formData.customerPhoneNumber">
                                <span class="help-block">{{formDataError.customerPhoneNumber.message}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group" :class="formDataError.customerPostalAddress.status">
                                <label class="control-label">Postal Address</label>
                                <input type="text" class="form-control" v-model="formData.customerPostalAddress">
                                <span class="help-block">{{formDataError.customerPostalAddress.message}}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group" :class="formDataError.customerAddress.status">
                                <label class="control-label">Physical Address</label>
                                <input type="text" class="form-control" v-model="formData.customerAddress">
                                <span class="help-block">{{formDataError.customerAddress.message}}</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomerCard",
        props : ['customer', 'mode'],
        data : function () {
            return {
                formData : {
                    customerFirstName : '',
                    customerLastName : '',
                    customerBusinessName : '',
                    customerEmail : '',
                    customerCountryCode : '',
                    customerPhoneNumber : '',
                    customerPostalAddress : '',
                    customerAddress : '',
                    isBusiness : '0',
                    customerImage : {},
                },
                formDataError : {
                    customerFirstName : {
                        status : '',
                        message : '',
                    },
                    customerLastName : {
                        status : '',
                        message : '',
                    },
                    customerBusinessName : {
                        status : '',
                        message : '',
                    },
                    customerEmail : {
                        status : '',
                        message : '',
                    },
                    customerCountryCode : {
                        status : '',
                        message : '',
                    },
                    customerPhoneNumber : {
                        status : '',
                        message : '',
                    },
                    customerPostalAddress : {
                        status : '',
                        message : '',
                    },
                    customerAddress : {
                        status : '',
                        message : '',
                    },
                    isBusiness : {
                        status : '',
                        message : '',
                    },
                },
                rules : {
                    customerFirstName : '',
                    customerLastName : '',
                    customerBusinessName : '',
                    customerEmail : 'required|email',
                    customerCountryCode : '',
                    customerPhoneNumber : 'required',
                    customerPostalAddress : 'required',
                    customerAddress : 'required',
                    isBusiness : 'required',
                }
            }
        },
    }
</script>

<style scoped>

</style>