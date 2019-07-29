<template>
    <div class="row">
        <div class="col-md-9">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Roles</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('userMgt/getRoles')"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5">
                            <form>
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search">
                                    <div class="input-group-btn">
                                        <a class="btn btn-default" >Go <span class="fa fa-arrow-right"></span></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="table-responsive product-list">
                        <table class="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Role</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(role, index) in filteredRoles" v-bind:key="index" style="cursor: pointer" @click="openUser(user)">
                                <td>{{index + 1}}</td>
                                <td>{{role.roleName}}</td>
                                <td>{{role.description}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(roles)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>New Role</h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <form>
                                <div class="form-group" :class="formDataError.roleName.status">
                                    <label class="control-label">Role Name</label>
                                    <input type="text" class="form-control" v-model="formData.roleName" placeholder="Cashier">
                                    <span class="help-block">{{formDataError.roleName.message}}</span>
                                </div>
                                <div class="form-group" :class="formDataError.description.status">
                                    <label class="control-label">Description</label>
                                    <textarea class="form-control" v-model="formData.description" placeholder="selling items at the teller">

                                    </textarea>
                                    <span class="help-block">{{formDataError.description.message}}</span>
                                </div>
                                <div class="form-group">
                                    <a class="btn btn-md btn-primary btn-block" @click="saveRole">Add role</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Spinner from "../../components/Spinner";
    export default {
        name: "Roles",
        components: {Spinner},
        data : function(){
            return {
                formData : {
                    roleName : '',
                    description : '',
                },
                formDataError : {
                    roleName : {
                        message : '',
                        status : '',
                    },
                    description : {
                        message : '',
                        status : '',
                    },

                },
                rules : {
                    roleName : 'required',
                    description : 'required',
                },
                term : '',
                validator : window.validator
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('userMgt/getRoles');
            })
        },
        computed : {
            filteredRoles(){
                let self = this;
                return this.term === ''
                    ? this.roles
                    : this.roles.filter(user => {
                        return user.roleName ? user.roleName.toLowerCase().indexOf(self.term) >= 0 : ''
                        || user.description ? user.description.toLowerCase().indexOf(self.term) >= 0 : ''
                    })
            },

            ...mapState('userMgt',{
                roles : state => state.roles,
                message : state => state.message,
                status : state => state.status,
                loading : state => state.loading,
            }),
        },
        methods : {
            deleteRole : function (role) {
                //todo handle delete
            },
            openRole : function (role) {
                this.formData = role;
            },
            saveRole : function () {
                //validation
                let res = this.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors;
                }else {
                    this.$store.dispatch('userMgt/saveRole', this.formData);
                }
            }
        },
        watch : {
            message : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    //get users if successfully save new user
                    if (n === 'success'){
                        this.$store.dispatch('userMgt/getRoles');
                        this.formData = {}; //reset formData

                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>