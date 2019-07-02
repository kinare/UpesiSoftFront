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
            <form class="m-t" role="form" action="#">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Name" required="">
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" placeholder="email" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Confirm Password" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Sign Up</button>
                <p class="text-muted text-center"><small>Have an account?</small></p>
                <router-link class="btn btn-sm btn-white btn-block" to="/login">Log In</router-link>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
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