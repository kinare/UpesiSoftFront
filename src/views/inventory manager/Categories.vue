<template>
    <div class="row">
        <div class="category" :class="mode === 'edit' ? 'col-lg-8' : 'col-lg-9'">
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
                                        <button @click="term = ''" type="submit" class="btn btn-default" > <span class="fa fa-times"></span></button>
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
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(category, index) in filteredCategories" v-bind:key="index" style="cursor: pointer">
                                <td>{{index + 1}}</td>
                                <td>{{category.productCategoryName}}</td>
                                <td>{{category.productCategoryDesc}}</td>
                                <td><a @click="editCategory(category)" class="btn btn-sm " :class="mode === 'edit' ? formData.id === category.id ? 'btn-primary' : 'btn-default' : 'btn-default'"><i class="fa fa-edit"></i> Edit</a></td>
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
        <div class="category" :class="mode === 'edit' ? 'col-lg-4' : 'col-lg-3'">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>{{mode === 'edit' ? 'Edit' : 'Add'}} Category</h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <form>
                                <div class="form-group" :class="formDataError.productCategoryName.status">
                                    <label class="control-label">Name</label>
                                    <input type="text" class="form-control" ref="categName" v-model="formData.productCategoryName">
                                    <span class="help-block">
                                        {{formDataError.productCategoryName.message}}
                                    </span>
                                </div>
                                <div class="form-group" :class="formDataError.productCategoryDesc.status">
                                    <label class="control-label">Description</label>
                                    <input type="text" class="form-control" v-model="formData.productCategoryDesc">
                                    <span class="help-block">
                                        {{formDataError.productCategoryDesc.message}}
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
                                    <button class="btn btn-block btn-primary" @click.prevent="addCategory">{{mode === 'edit' ? 'Save Category' : 'Add Category'}}</button>
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
                mode : '',
                term : '',
                formData : {
                    productCategoryName : '',
                    productCategoryDesc : '',
                    parentId : '',
                },
                formDataError : {
                    productCategoryName : {
                        status : '',
                        message : '',
                    },
                    productCategoryDesc : {
                        status : '',
                        message : '',
                    },
                    parentId : {
                        status : '',
                        message : '',
                    },
                },
                rules : {
                    productCategoryName : 'required',
                    productCategoryDesc : 'required',
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
                if (res.hasErrors){
                    this.formDataError = res.errors;
                } else {
                    this.$store.dispatch('inventory/newCategory', this.formData);
                    this.mode = '';
                    this.formData = {
                        productCategoryName : '',
                        productCategoryDesc : '',
                        parentId : '',
                    }
                }
            },
            editCategory : function (category) {
                this.subCateg = !!category.parentId;
                this.mode = 'edit';
                this.formData = category;
                this.$refs.categName.focus();
            }
        },
        computed : {
            filteredCategories(){
              let self = this;
              return this.term === ''
                ? this.categories
                  : this.categories.filter(cat => {
                      return cat.productCategoryName ? cat.productCategoryName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                      || cat.productCategoryDesc ? cat.productCategoryDesc.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                      || cat.parentId ? cat.parentId.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                  })
            },
            ...mapState('inventory',{
                categories : state => state.categories,
                loading : state => state.loading,
                view : state => state.view
            }),
        },
    }
</script>

<style scoped>
    .category{
        transition: all 0.5s ease;
    }
</style>