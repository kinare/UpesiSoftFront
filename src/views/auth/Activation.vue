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
            <h3>Activate Account</h3>
            <div v-if="message !== ''" class="alert" :class="status">
                {{message}}
            </div>
            <p>Before proceeding, please check your email for a activation Code.
            If you did not receive the email, <a href="#">click here to request another</a>.</p>
            <div class="form-group" :class="formDataError.email.status">
                <input type="email" class="form-control" placeholder="Email" v-model="formData.email" required="">
                <span class="help-block m-b-none">
                        {{formDataError.email.message}}
                </span>
            </div>
            <div class="form-group" :class="formDataError.activationCode.status">
                <input type="text" class="form-control" placeholder="Last Name" v-model="formData.activationCode" required="">
                <span class="help-block m-b-none">
                        {{formDataError.activationCode.message}}
                </span>
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b" @click.prevent="activate">Activate</button>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Activation",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
                formData : {
                    email : '',
                    activationCode : ''
                },
                formDataError : {
                    email : {
                        status : '',
                        message : ''
                    },
                    activationCode : {
                        status : '',
                        message : ''
                    }
                },
                rules : {
                    email : 'required',
                    activationCode : 'required'
                }
            }
        },

        beforeRouteEnter(to, from, next){
            next(v =>{
                //todo remove sample token
                let token = /*to.params.token;*/ 'bmlja0Bkb29yc3RlcC5jby5rZSs5MTM1NjA%3D';
                token = decodeURIComponent(token);
                token = atob(token);
                token = token.split('+');

                v.formData.email = token[0];
                v.formData.activationCode = token[1];
            })
        },
        beforeCreate() {
            document.body.className = 'gray-bg';
        },
        computed : {
            ...mapState('authModule', {
                message : state => state.message,
                status : state => state.status
            }),
        },
        methods : {
            activate : function () {
                let res =  window.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors
                }else {
                    this.$store.dispatch('authModule/avtivate', this.formData)
                }
            }
        }
    }
</script>

<style scoped>

</style>