<template>
    <div class="row">
        <div class="role" :class="mode === 'edit' ? 'col-md-8': 'col-md-9'">
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
                                <th>Products</th>
                                <th>Users</th>
                                <th>Roles</th>
                                <th>Sales</th>
                                <th>Make Sales</th>
                                <th>Customers</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(role, index) in filteredRoles" v-bind:key="index" style="cursor: pointer">
                                <td @click="mode = ''">{{index + 1}}</td>
                                <td @click="mode = ''">{{role.roleName}}</td>
                                <td @click="mode = ''">{{role.roleDescription}}</td>
                                <td @click="mode = ''"><i class="fa fa-1x" :class="role.viewProducts ? 'fa-check text-info' : 'fa-times text-danger'"></i></td>
                                <td @click="mode = ''"><i class="fa" :class="role.viewUsers ? 'fa-check text-info' : 'fa-times text-danger'"></i></td>
                                <td @click="mode = ''"><i class="fa" :class="role.viewUserRoles ? 'fa-check text-info' : 'fa-times text-danger'"></i></td>
                                <td @click="mode = ''"><i class="fa" :class="role.viewSales ? 'fa-check text-info' : 'fa-times text-danger'"></i></td>
                                <td @click="mode = ''"><i class="fa" :class="role.makeSales ? 'fa-check text-info' : 'fa-times text-danger'"></i></td>
                                <td @click="mode = ''"><i class="fa" :class="role.viewCustomers ? 'fa-check text-info' : 'fa-times text-danger'"></i></td>
                                <td>
                                    <div class="btn-group-xs">
                                        <button v-if="canUpdate" title="edit" @click="editRole(role)" class="btn btn-white" type="button" :class="mode === 'edit' ? formData.id === role.id ? 'btn-primary' : 'btn-default' : 'btn-default'"><i class="fa fa-edit"></i></button>
                                        <button v-if="canDelete" title="remove" @click="roleToDelete = role; confirmDelete()" class="btn btn-white" type="button"><i class="text-danger fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(roles)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="role" :class="mode === 'edit' ? 'col-md-4': 'col-md-3'">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>{{mode === 'edit' ? 'Edit' : 'New'}} Role</h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <form>
                                <div class="form-group" :class="formDataError.roleName.status">
                                    <label class="control-label">Role Name</label>
                                    <input @focus="mode = 'edit'" type="text" ref="RoleName" class="form-control" v-model="formData.roleName" placeholder="Cashier">
                                    <span class="help-block">{{formDataError.roleName.message}}</span>
                                </div>
                                <div class="form-group" :class="formDataError.roleDescription.status">
                                    <label class="control-label">Description</label>
                                    <textarea @focus="mode = 'edit'" class="form-control" v-model="formData.roleDescription" placeholder="selling items at the teller">

                                    </textarea>
                                    <span class="help-block">{{formDataError.roleDescription.message}}</span>
                                </div>
                                <div class="form-group">
                                    <div class="row">

                                        <div class="col-xs-12">
                                            <div :class="mode === 'edit' ? 'col-xs-6': 'col-md-12'">
                                                <h4>Users</h4>
                                                <div><label><input type="checkbox" v-model="formData.viewUsers"> Can view</label></div>
                                                <div><label><input type="checkbox" v-model="formData.createUsers"> Can create</label></div>
                                                <div><label><input type="checkbox" v-model="formData.editUsers"> Can edit</label></div>
                                                <div><label><input type="checkbox" v-model="formData.deleteUsers"> Can delete</label></div>
                                                <br>
                                                <h4>Roles</h4>
                                                <div><label><input type="checkbox" v-model="formData.viewUserRoles"> Can view</label></div>
                                                <div><label><input type="checkbox" v-model="formData.createUserRoles"> Can create</label></div>
                                                <div><label><input type="checkbox" v-model="formData.editUserRoles"> Can edit</label></div>
                                                <div><label><input type="checkbox" v-model="formData.deleteUserRoles"> Can delete</label></div>
                                                <br>
                                                <h4>Sales</h4>
                                                <div><label><input type="checkbox" v-model="formData.viewSales"> Can view</label></div>
                                                <div><label><input type="checkbox" v-model="formData.makeSales"> Can create</label></div>
                                            </div>
                                            <div :class="mode === 'edit' ? 'col-xs-6': 'col-md-12'">
                                                <h4>Products</h4>
                                                <div><label><input type="checkbox" v-model="formData.viewProducts"> Can view</label></div>
                                                <div><label><input type="checkbox" v-model="formData.createProducts"> Can create</label></div>
                                                <div><label><input type="checkbox" v-model="formData.editProducts"> Can edit</label></div>
                                                <div><label><input type="checkbox" v-model="formData.deleteProducts"> Can delete</label></div>
                                                <br>
                                                <h4>Customers</h4>
                                                <div><label><input type="checkbox" v-model="formData.viewCustomers"> Can view</label></div>
                                                <div><label><input type="checkbox" v-model="formData.createCustomers"> Can create</label></div>
                                                <div><label><input type="checkbox" v-model="formData.editCustomers"> Can edit</label></div>
                                                <div><label><input type="checkbox" v-model="formData.deleteCustomers"> Can delete</label></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <a v-if="canCreate" class="btn btn-md btn-primary btn-block" @click="saveRole">{{mode === 'edit' ? 'Save' : 'Add'}} role</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Role Modal-->
        <div class="modal fadeIn" id="confirmDelete" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title text-center">Confirmation</h4>
                    </div>
                    <div class="modal-body text-center">
                        <h1>Are you sure to delete?</h1>
                        <br>
                        <div class="row ">
                            <a class="btn btn-primary btn-block" @click="removeRole(roleToDelete)">Yes</a>
                            <a class="btn btn-white btn-block" data-dismiss="modal">No</a> &nbsp;&nbsp;
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
    import permissions from "../../modules/mixins/Permissions";
    export default {
        name: "Roles",
        components: {Spinner},
        mixins : [permissions],
        data : function(){
            return {
                scope : 'roles',
                mode : '',
                formData : {
                    roleName : '',
                    roleDescription : '',
                    createUsers : 0,
                    editUsers : 0,
                    viewUsers : 0,
                    deleteUsers : 0,
                    createUserRoles : 0,
                    viewUserRoles : 0,
                    deleteUserRoles : 0,
                    editUserRoles : 0,
                    createProducts : 0,
                    editProducts : 0,
                    viewProducts : 0,
                    deleteProducts : 0,
                    createCustomers : 0,
                    editCustomers : 0,
                    viewCustomers : 0,
                    deleteCustomers : 0,
                    makeSales : 0,
                    viewSales : 0,
                },
                formDataError : {
                    roleName : {
                        message : '',
                        status : '',
                    },
                    roleDescription : {
                        message : '',
                        status : '',
                    },

                },
                rules : {
                    roleName : 'required',
                    roleDescription : 'required',
                },
                term : '',
                validator : window.validator,
                helper : window.helper,
                roleToDelete : {}
            }
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
            confirmDelete : function(){
                // eslint-disable-next-line no-undef
                $("#confirmDelete").modal({backdrop:'static',keyboard:false, show:true});
            },
            removeRole : function (role) {
                this.$store.dispatch('userMgt/removeRole',  { data : {userRoleId : role.id}})
                // eslint-disable-next-line no-undef
                $("#confirmDelete").modal('hide');
            },
            editRole : function (role) {
                this.formData = role;
                this.mode = 'edit';
                this.$refs.RoleName.focus();
            },
            saveRole : function () {
                //validation
                let res = this.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors;
                }else {
                    this.$store.dispatch('userMgt/saveRole', this.formData);
                    this.mode = '';
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
    .role{
        transition: all 0.5s ease;
    }
</style>