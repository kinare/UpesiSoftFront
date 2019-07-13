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
            <h3>Log In</h3>
            <div v-if="message !== ''" class="alert" :class="status">
                {{message}}
            </div>
            <form class="m-t text-left" >
                <div class="form-group" :class="formDataError.email.status">
                    <input type="email" v-model="formData.email" class="form-control" placeholder="Username" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.email.message}}
                    </span>
                </div>
                <div class="form-group" :class="formDataError.password.status">
                    <input type="password" v-model="formData.password" class="form-control" placeholder="Password" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.password.message}}
                    </span>
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b" @click.prevent="submit">Login</button>

                <router-link to="/auth/reset"><small>Forgot password?</small></router-link>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <router-link class="btn btn-sm btn-white btn-block" to="/auth/register">Create an account</router-link>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Login",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
                formData : {
                    email : '',
                    password : ''
                },
                formDataError : {
                    email : {
                        status : '',
                        message : ''
                    },
                    password : {
                        status : '',
                        message : ''
                    }
                },
                rules : {
                    email : 'required|email',
                    password : 'required|min:4'
                }
            }
        },
        beforeRouteEnter(to, from, next){
            next(v =>{
                v.$store.commit('authModule/SET_MESSAGE', {message : '' , status : ''});
            })
        },
        methods : {
            submit : function () {
                //validate form data
               let res =  window.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors
                }else {
                    this.$store.dispatch('authModule/signIn', this.formData)
                }
            }
        },
        computed : {
            ...mapState('authModule', {
                message : state => state.message,
                status : state => state.status,
            }),
        },
    }
</script>

<style scoped>

</style>