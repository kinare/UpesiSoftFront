<template>
    <h1>Module : {{namespace}} with state name {{name}} </h1>
</template>

<script>
    export default {
        name: "MultiModules",
        props : ['namespace'],
        computed  :{
            name(){ return this.$store.getters[this.namespace + '/getName']},
        },
    }
</script>

<style scoped>

</style>