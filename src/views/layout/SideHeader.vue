<template>
    <li class="nav-header">
        <div class="dropdown profile-element"> <span>
                            <img alt="image" class="img-circle" :src="baseUrl + 'img/profile_small.png'" width="50">
                             </span>
            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">{{user.firstName + ' ' + user.lastName}}</strong>
                             </span> <span class="text-muted text-xs block">{{user.roleType}}<b class="caret"></b></span> </span> </a>
            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li><a href="profile.html">Profile</a></li>
                <li><a href="contacts.html">Contacts</a></li>
            </ul>
        </div>
        <div class="logo-element navy-bg" @click="$router.push('/')" style="cursor: pointer">
            FOCUS
        </div>
    </li>
</template>

<script>
    export default {
        name: "SideHeader",
        data : function () {
            return {
                baseUrl: process.env.BASE_URL,
                auth : window.auth
            }
        },
        computed : {
            user(){
                return JSON.parse(this.auth.authUser());
            }
        }
    }
</script>

<style scoped>

</style>