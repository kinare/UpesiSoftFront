<template>
    <div class="title-action">
        <div class="btn-group">
            <button class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i> New product</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "menu"
    }
</script>

<style scoped>
    a.router-link-active {
        background-color : #1E824C;
        color: #ffffff;
        padding-left: 10px;
    }
    a.router-link-active i {
        color: #ffffff !important;
    }
    a.router-link-active i:hover{
        color: #1E824C !important;
    }
</style>