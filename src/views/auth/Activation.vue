<template>
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div :class="{'sk-loading' : loading}" style="border: none">
            <spinner v-if="loading"/>
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
            <div class="form-group" :class="formDataError.email.status">
                <input type="hidden" class="form-control" placeholder="Email" v-model="formData.email" required="">
                <span v-show="false" class="help-block m-b-none">
                        {{formDataError.email.message}}
                </span>
            </div>
            <div class="form-group" :class="formDataError.activationCode.status">
                <input type="text" class="form-control" placeholder="Code" v-model="formData.activationCode" required="">
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
    import Spinner from "../../components/Spinner";
    export default {
        name: "Activation",
        components: {Spinner},
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
                v.$store.commit('authModule/SET_MESSAGE', {message : '' , status : ''});
                let token = to.params.token;
                token = decodeURIComponent(token);
                token = atob(token);
                token = token.split(':');


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
                status : state => state.status,
                loading : state => state.loading,
            }),
        },
        methods : {
            activate : function () {
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