<template>
    <div class="row">
        <div class="col-lg-7">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Categories</h5>
                    <div class="ibox-tools">
                        <a class="btn btn-xs btn-white">
                            <i class="fa fa-sync-alt" @click="$store.dispatch('inventory/getCategories')"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content" :class="loading ? 'sk-loading' : ''">
                    <Spinner v-if="loading"/>
                    <div class="row">
                        <div class="col-sm-7 col-sm-push-5">
                            <form v-on:submit.prevent="searchProduct">
                                <div class="input-group">
                                    <input  type="search" class="form-control" v-model="term" aria-label="Search" placeholder="Search">
                                    <div class="input-group-btn">
                                        <button @click="searchProduct" type="submit" class="btn btn-default" >Go <span class="fa fa-arrow-right"></span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="hr-line-dashed"></div>
                    <div class="table-responsive product-list">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Desc</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(category, index) in categories" v-bind:key="index" style="cursor: pointer">
                                <td>{{index + 1}}</td>
                                <td>{{category.productCategoryName}}</td>
                                <td>{{category.productCategoryDesc}}</td>
                            </tr>

<!--                            <tr>-->
<!--                                <td colspan="4" v-if="validator.isEmptyObject(categories)" class="text-center"><i class="text-muted">No category found</i> </td>-->
<!--                            </tr>-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-5">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Add Category</h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <form>
                                <div class="form-group" :class="formDataError.name.status">
                                    <label class="control-label">Name</label>
                                    <input type="text" class="form-control" v-model="formData.name">
                                    <span class="help-block">
                                        {{formDataError.name.message}}
                                    </span>
                                </div>
                                <div class="form-group" :class="formDataError.description.status">
                                    <label class="control-label">Description</label>
                                    <input type="text" class="form-control" v-model="formData.description">
                                    <span class="help-block">
                                        {{formDataError.description.message}}
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" value="option1" id="inlineCheckbox1" v-model="subCateg">
                                        Sub Category
                                    </label>
                                </div>
                                <div v-if="subCateg" class="form-group" :class="formDataError.parentId.status">
                                   <label class="control-label">Parent Category</label>
                                    <select class="form-control" v-model="formData.parentId">
                                        <option v-for="(category, index) in categories" :value="category.id" :key="index">{{category.productCategoryName}}</option>
                                    </select>
                                    <span class="help-block">
                                        {{formDataError.parentId.message}}
                                    </span>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-block btn-primary" @click.prevent="addCategory">Add Category</button>
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
        name: "Categories",
        components: {Spinner},
        data : function(){
            return {
                subCateg : false,
                term : '',
                formData : {
                    name : '',
                    description : '',
                    parentId : '',
                },
                formDataError : {
                    name : {
                        status : '',
                        message : '',
                    },
                    description : {
                        status : '',
                        message : '',
                    },
                    parentId : {
                        status : '',
                        message : '',
                    },
                },
                rules : {
                    name : 'required',
                    description : 'required',
                    parentId : 'optional',
                }
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('inventory/getCategories')
            })
        },
        methods : {
            addCategory : function(){
                let res = window.validator.fields(this.formData, this.rules, this.formDataError);
                // eslint-disable-next-line no-console
                console.log(res)
                if (res.hasErrors){
                    this.formDataError = res.errors;
                } else {
                    this.$store.dispatch('inventory/newCategory', this.formData)
                }
            },
            searchProduct : function () {
                
            },

        },
        computed : {
            ...mapState('inventory',{
                categories : state => state.categories,
                loading : state => state.loading,
                view : state => state.view
            }),
        },
    }
</script>

<style scoped>
</style>