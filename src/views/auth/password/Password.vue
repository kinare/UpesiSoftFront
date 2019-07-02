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
            <form class="m-t" role="form" action="#">
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" required="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Confirm Password" required="">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Set Password</button>
            </form>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Password",
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