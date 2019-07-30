<template>
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <div>
                    <img :src="'/img/Focus Logo.png'" width="250">
                    <br>
                    <br>
                    <br>
                </div>
            </div>
            <h3>Account Registration Successful</h3>
            <div  class="alert alert-success text-center">
                Please check your email for an activation code
            </div>
            <p class="m-t"> <small>Focus Glass & Aluminium © 2019</small> </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RegistrationSuccess"
    }
</script>

<style scoped>

</style>