<template>
    <h1>Module : {{mymodule}} with state : {{getName}}</h1>
</template>

<script>
    export default {
        name: "MultiModules",
        props : ['mymodule'],
        computed  :{
            getName(){
                return this.$store.state[this.mymodule].name
            }

        }
    }
</script>

<style scoped>

</style>