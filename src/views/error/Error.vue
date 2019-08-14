<template>
    <div class="middle-box text-center animated fadeInDown">
        <h1>Whoops!</h1>
        <h3 class="font-bold">Something went wrong</h3>

        <div class="error-desc">
            The page your looking for is not found
            <form class="form-inline m-t" role="form">
                <router-link to="/" class="btn btn-primary">Home</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error",
        beforeCreate() {
            document.body.className = 'white-bg';
        },
    }
</script>

<style scoped>

</style>