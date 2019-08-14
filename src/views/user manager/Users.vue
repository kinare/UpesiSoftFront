<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Users</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('userMgt/getUsers')"></i>
                        </a>
                        <a v-if="canCreate" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#userCard">
                            <i class="fa fa-user-plus" ></i> New User
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
                                        <button type="submit" class="btn btn-default" >Go <span class="fa fa-arrow-right"></span></button>
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
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Date Created</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(user, index) in filteredUsers" v-bind:key="index" style="cursor: pointer" >
                                <td @click="openUser(user)" >{{index + 1}}</td>
                                <td @click="openUser(user)" >{{user.firstName + ' ' + user.lastName}}</td>
                                <td @click="openUser(user)" >{{user.roleName}}</td>
                                <td @click="openUser(user)" >{{user.email}}</td>
                                <td @click="openUser(user)" >{{user.createdAt}}</td>
                                <td><a v-if="canDelete" class="btn btn-white btn-xs" @click="confirmDelete(user.id)"><i class="fa fa-trash text-danger"></i> Remove</a> </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="validator.isEmptyObject(users)" class="alert text-center" :class="status">{{message}}</div>
                    </div>
                </div>
            </div>
        </div>


        <!--        user modal-->
        <div class="modal  in fade" id="userCard" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">User Card</h4>
                    </div>
                    <div class="modal-body">
                        <div class="ibox-content no-borders" :class="loading ? 'sk-loading' : ''">
                            <Spinner v-if="loading"/>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="ibox">
                                        <div class="ibox-content product-box">
                                            <div class="product-imitation" :style="'background-image : url(' + url + ')'" style="background-repeat: no-repeat; background-size: cover; background-position: top center">
                                                {{url === '' ? '[ UPLOAD PHOTO ]' : ''}}
                                            </div>
                                            <div class="product-desc">

                                                <label class="btn btn-block btn-white">
                                                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                                    <i class="fa fa-image" ></i> upload image
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <form>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group" :class="formDataError.firstName.status">
                                                    <label class="control-label">First Name</label>
                                                    <input type="text" class="form-control" v-model="formData.firstName" placeholder="Alice">
                                                    <span class="help-block">{{formDataError.firstName.message}}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group" :class="formDataError.lastName.status">
                                                    <label class="control-label">Last Name</label>
                                                    <input type="text" class="form-control" v-model="formData.lastName" placeholder="Wanjiku">
                                                    <span class="help-block">{{formDataError.lastName.message}}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group" :class="formDataError.email.status">
                                            <label class="control-label">Email</label>
                                            <input type="email" class="form-control" v-model="formData.email" placeholder="example@email.com">
                                            <span class="help-block">{{formDataError.email.message}}</span>
                                        </div>
                                        <div class="form-group" :class="formDataError.roleId.status">
                                            <label class="control-label">User Role</label>
                                            <select class="form-control" v-model="formData.roleId">
                                                <option :value="role.id" v-for="(role, index) in roles" :key="index">{{role.roleName}} {{role.roleDescription ? '(' + role.roleDescription + ')': '' }}</option>
                                            </select>
                                            <span class="help-block">{{formDataError.roleId.message}}</span>
                                        </div>
                                        <div class="form-group" :class="formDataError.password.status">
                                            <label class="control-label">Password</label>
                                            <input type="password" class="form-control" v-model="formData.password" placeholder="********">
                                            <span class="help-block">{{formDataError.password.message}}</span>
                                        </div>
                                        <div class="form-group" :class="formDataError.confirmPassword.status">
                                            <label class="control-label">Confirm Password</label>
                                            <input type="password" class="form-control" v-model="formData.confirmPassword" placeholder="********">
                                            <span class="help-block">{{formDataError.confirmPassword.message}}</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="alert text-center" :class="status">
                                {{message}}
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                        <button v-if="canUpdate || canCreate" type="button" class="btn btn-primary" @click="saveUser">Save</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Role Modal-->
        <div class="modal fadeIn" id="confirmUserDelete" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
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
                            <a class="btn btn-primary btn-block" @click="removeUser(selectedUserId)">Yes</a>
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
        name: "Users",
        components: {Spinner},
        mixins : [permissions],
        data : function(){
            return {
                scope : 'users',
                url : '',
                formData : {
                    firstName : '',
                    lastName : '',
                    email : '',
                    password : '',
                    confirmPassword : '',
                    roleId : '',
                    profilePicture : {},
                },
                formDataError : {
                    firstName : {
                        message : '',
                        status : '',
                    },
                    lastName : {
                        message : '',
                        status : '',
                    },
                    email : {
                        message : '',
                        status : '',
                    },
                    password : {
                        message : '',
                        status : '',
                    },
                    confirmPassword : {
                        message : '',
                        status : '',
                    },
                    roleId : {
                        message : '',
                        status : '',
                    },
                },
                rules : {
                    firstName : 'required',
                    lastName : 'required',
                    email : 'email|required',
                    password : 'required|min:6',
                    confirmPassword : 'required|min:6',
                    roleId : 'required',
                },
                term : '',
                validator : window.validator,
                selectedUserId : ''
            }
        },
        computed : {
            filteredUsers(){
                let self = this;
                return this.term === ''
                    ? this.users
                    : this.users.filter(user => {
                        return user.firstName ? user.firstName.toLowerCase().indexOf(self.term) >= 0 : ''
                            || user.lastName ? user.lastName.toLowerCase().indexOf(self.term) >= 0 : ''
                            || user.roleId ? user.roleId.toLowerCase().indexOf(self.term) >= 0 : ''
                            || user.email ? user.email.toLowerCase().indexOf(self.term) >= 0 : ''
                })
            },

            ...mapState('userMgt',{
                users : state => state.users,
                roles : state => state.roles,
                message : state => state.message,
                status : state => state.status,
                loading : state => state.loading,
            }),
        },
        methods : {
            openUser : function (user) {
                this.formData = user;
                // eslint-disable-next-line no-undef
                $("#userCard").modal('show');
            },
            saveUser : function () {
                //validation
                let res = this.validator.fields(this.formData, this.rules, this.formDataError);
                if (res.hasErrors){
                    this.formDataError = res.errors;
                } else if (this.formData.password !== this.formData.confirmPassword) {
                    this.formDataError.confirmPassword = {
                        status : 'has-error',
                        message : 'passwords do not match'
                    }
                }else {
                    this.$store.dispatch('userMgt/saveUser', window.helper.prepareFormData(this.formData));
                }
            },
            confirmDelete : function(id){
                this.selectedUserId = id
                // eslint-disable-next-line no-undef
                $("#confirmUserDelete").modal({backdrop:'static',keyboard:false, show:true});
            },
            removeUser : function (id) {
                this.$store.dispatch('userMgt/removeUser',  { data : {userId : id}})
                // eslint-disable-next-line no-undef
                $("#confirmUserDelete").modal('hide');
            },
            handleFileUpload(){
                this.formData.profilePicture = this.$refs.file.files[0];
                this.url = URL.createObjectURL(this.formData.profilePicture);
            }
        },
        watch : {
            message : {
                // eslint-disable-next-line no-unused-vars
                handler : function (n, o) {
                    //get users if successfully save new user
                    if (n === 'success'){
                        this.$store.dispatch('userMgt/getUsers');
                        // eslint-disable-next-line no-undef
                        $("#userCard").modal('hide');
                        this.formData = {}; //reset formData

                    }
                }
            }
        }
    }
</script>

<style scoped>
    input[type="file"] {
        display: none;
    }
</style>