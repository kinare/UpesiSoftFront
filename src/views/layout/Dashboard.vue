<template>
    <div>
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="sidebar-collapse">
                <router-view name="side"/>
            </div>
        </nav>
       <router-view name="content"/>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
    }
</script>

<style scoped>

</style>