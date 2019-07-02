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
            <form class="m-t" role="form" action="#">
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="Username" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

                <router-link to="/reset"><small>Forgot password?</small></router-link>
                <p class="text-muted text-center"><small>Do not have an account?</small></p>
                <router-link class="btn btn-sm btn-white btn-block" to="/register">Create an account</router-link>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
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