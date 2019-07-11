<template>
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <div>
                    <img :src="baseUrl + 'img/Focus Logo.png'" width="250">
                    <br>
                    <br>
                    <br>
                </div>
            </div>
            <h3>Sign Up</h3>
            <div v-if="message !== ''" class="alert" :class="status">
                {{message}}
            </div>
            <form class="m-t text-left" role="form" action="#">
                <div class="form-group" :class="formDataError.firstName.status">
                    <input type="text" class="form-control" placeholder="First Name" v-model="formData.firstName" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.firstName.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.lastName.status">
                    <input type="text" class="form-control" placeholder="Last Name" v-model="formData.lastName" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.lastName.message}}
                    </span>
                </div>

                <div class="form-group" :class="formDataError.email.status">
                    <input type="email" class="form-control" placeholder="email" v-model="formData.email" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.email.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.userRoleId.status">
                    <input type="text" class="form-control" placeholder="Role" v-model="formData.userRoleId"  required="">
                    <span class="help-block m-b-none">
                        {{formDataError.userRoleId.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.businessName.status">
                    <input type="text" class="form-control" placeholder="Business Name" v-model="formData.businessName"  required="">
                    <span class="help-block m-b-none">
                        {{formDataError.businessName.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.businessTypeId.status">
                    <input type="text" class="form-control" placeholder="Business Type" v-model="formData.businessTypeId"  required="">
                    <span class="help-block m-b-none">
                        {{formDataError.businessTypeId.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.password.status">
                    <input type="password" class="form-control" placeholder="Password" v-model="formData.password" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.password.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.confirmPassword.status">
                    <input type="password" class="form-control" placeholder="Confirm Password" v-model="formData.confirmPassword" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.confirmPassword.message}}
                    </span>
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b" @click.prevent="signUp">Sign Up</button>
                <p class="text-muted text-center"><small>Have an account?</small></p>
                <router-link class="btn btn-sm btn-white btn-block" to="/auth/login">Log In</router-link>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Register",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
                formData : {
                    firstName : '',
                    lastName : '',
                    email : '',
                    password : '',
                    confirmPassword : '',
                    userRoleId : '',
                    businessName : '',
                    businessTypeId : '',
                },
                formDataError : {
                    firstName : {
                        status : '',
                        message : ''
                    },
                    lastName : {
                        status : '',
                        message : ''
                    },
                    email : {
                        status : '',
                        message : ''
                    },
                    password : {
                        status : '',
                        message : ''
                    },
                    confirmPassword : {
                        status : '',
                        message : ''
                    },
                    userRoleId : {
                        status : '',
                        message : ''
                    },
                    businessName : {
                        status : '',
                        message : ''
                    },
                    businessTypeId : {
                        status : '',
                        message : ''
                    },
                },
                rules : {
                    firstName : 'required',
                    lastName : 'required',
                    email : 'required|email',
                    password : 'required|min:8',
                    confirmPassword : 'required|min:8',
                    userRoleId : 'required',
                    businessName : 'required',
                    businessTypeId : 'required',
                }
            }
        },
        beforeRouteEnter(to, from, next){
          next(v =>{
              v.$store.commit('authModule/SET_MESSAGE', {message : '' , status : ''});
          })
        },
        computed : {
            ...mapState('authModule', {
                message : state => state.message,
                status : state => state.status
            }),
        },
       methods : {
            signUp : function () {
                //validate form data
                let res =  window.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors
                }else {
                    this.$store.dispatch('authModule/signUp', this.formData)
                }
            }
       }
    }
</script>

<style scoped>

</style>