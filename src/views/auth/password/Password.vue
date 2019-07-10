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
            <h3>Password</h3>
            <div v-if="message !== ''" class="alert" :class="status">
                {{message}}
            </div>
            <form class="m-t" role="form" action="#">
                <div class="form-group" :class="formDataError.email.status">
                    <input type="email" class="form-control" placeholder="Email" v-model="formData.email" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.email.message}}
                </span>
                </div>
                <div class="form-group" :class="formDataError.resetPasswordCode.status">
                    <input type="text" class="form-control" placeholder="Last Name" v-model="formData.resetPasswordCode" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.resetPasswordCode.message}}
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
                <button type="submit" class="btn btn-primary block full-width m-b" @click.prevent="submit">Set Password</button>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Password",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
                formData : {
                    email : '',
                    resetPasswordCode : '',
                    password : '',
                    confirmPassword : ''
                },
                formDataError : {
                    email : {
                        status : '',
                        message : ''
                    },
                    resetPasswordCode : {
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
                },
                rules : {
                    email : 'required',
                    resetPasswordCode : 'required',
                    password : 'required',
                    confirmPassword : 'required'
                }
            }

        },
        beforeRouteEnter(to, from, next){
            next(v =>{
                //todo remove sample token
                let token = to.params.token; //'bmlja0Bkb29yc3RlcC5jby5rZSs5MTM1NjA%3D';
                token = decodeURIComponent(token);
                token = atob(token);
                token = token.split('+');

                v.formData.email = token[0];
                v.formData.resetPasswordCode = token[1];
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
                status : state => state.status
            }),
        },
        beforeCreate() {
            document.body.className = 'gray-bg';
        }
    }
</script>

<style scoped>

</style>