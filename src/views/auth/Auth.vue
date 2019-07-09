<template>
    <router-view/>
</template>

<script>
    import auth from '../../modules/store/auth/store';
    export default {
        name: "Auth",
        beforeRouteEnter(to, from, next){
            next(v => {
                if (window.auth.check()) {
                    v.$router.push(from)
                }
            })
        },
        created (){
            this.$store.registerModule("authModule", auth);
        },
        beforeCreate() {
            document.body.className = 'gray-bg';
        },
    }
</script>

<style scoped>

</style>