<template>
    <div class="row">
        <div class="col-lg-12">
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
                        <div class="col-sm-5 col-sm-push-7">
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
                                <th>Handle</th>
                                <th>Handle</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(row, index) in rows" v-bind:key="index" style="cursor: pointer" @click="toggle(row.id)" :class="{ opened: opened.includes(row.id) }">
                                <td>{{index + 1}}</td>
                                <td>{{ row.name }}</td>
                                <td>{{ row.handle }}</td>
                            </tr>
                            <tr v-if="opened.includes(row.id)">
                                <td colspan="3">ON!</td>
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
                opened: [],
                rows: [
                    { id: 1, name: 'Bill', handle: 'bill' },
                    { id: 2, name: 'Bob', handle: 'bob' },
                    { id: 3, name: 'Jim', handle: 'jim' },
                    { id: 4, name: 'Leroy', handle: 'leroy' }
                ],
                term : '',
                validator : window.validator
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                v.$store.dispatch('inventory/getCategories')
            })
        },
        methods : {
            searchProduct : function () {
                
            },
            toggle(id) {
                const index = this.opened.indexOf(id);
                if (index > -1) {
                    this.opened.splice(index, 1)
                } else {
                    this.opened.push(id)
                }
            }
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
    table {
        width: 100%;
        border: 1px solid #ccc;
    }

    td {
        padding: 2px;
        border: 1px solid #ccc;
    }

    .opened {
        background-color: yellow;
    }
</style>