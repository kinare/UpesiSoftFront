<template>
    <div>
        <router-link to="/" class="btn btn-block btn-primary side-home" style="padding: 20px 25px;"><i class="fa fa-arrow-left"></i> &nbsp;&nbsp;FOCUS</router-link>

        <ul class="nav metismenu" id="side-menu" style="">
            <side-header/>
            <li>
                <a href="layouts.html"><i class="fa fa-users"></i> <span class="nav-label">Users</span></a>
            </li>
            <li>
                <a href="layouts.html"><i class="fa fa-group"></i> <span class="nav-label">User Groups</span></a>
            </li>
            <li>
                <a href="layouts.html"><i class="fa fa-unlock"></i> <span class="nav-label">Roles</span></a>
            </li>
        </ul>
    </div>
</template>

<script>
    import SideHeader from "../layout/SideHeader";
    export default {
        name: "ResourceMgtSide",
        components: {SideHeader}
    }
</script>

<style scoped>

</style>
