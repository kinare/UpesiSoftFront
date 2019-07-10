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
            <h3>Reset Password</h3>
            <div v-if="message !== ''" class="alert" :class="status">
                {{message}}
            </div>
            <form class="m-t" role="form" action="#">
                <div class="form-group" :class="formDataError.email.status">
                    <input type="email" class="form-control" placeholder="email" v-model="formData.email" required="">
                    <span class="help-block m-b-none">
                        {{formDataError.email.message}}
                </span>
                </div>
                <a class="btn btn-sm btn-primary btn-block" @click.prevent="initiate">Send Link</a>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "Email",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
                formData : {
                    email : '',
                },
                formDataError : {
                    email : {
                        status : '',
                        message : ''
                    },
                },
                rules : {
                    email : 'required|email',
                }
            }
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
            initiate : function () {
                let res =  window.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors
                }else {
                    this.$store.dispatch('authModule/activate', this.formData)
                }
            }
        }
    }
</script>

<style scoped>

</style>