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
            <form class="m-t" role="form" action="#">
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="email" required="">
                </div>
                <router-link class="btn btn-sm btn-primary btn-block" to="/password">Send Link</router-link>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Email",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
            }
        },
        beforeCreate() {
            document.body.className = 'gray-bg';
        }
    }
</script>

<style scoped>

</style>