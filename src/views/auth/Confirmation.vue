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
            <h3>Email Verification</h3>
            <p>Before proceeding, please check your email for a verification link.
            If you did not receive the email, <a href="#">click here to request another</a>.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Confirmation",
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