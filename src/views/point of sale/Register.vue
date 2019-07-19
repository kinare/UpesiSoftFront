<template>
    <div class="container-fluid p-sm">
        <div class="row">
            <div class="tabs-container">
                <ul class="nav nav-tabs">
                    <li  v-for="(tab, index) in tabs" :key="index" :class="tab.status">
                        <a @click="switchTab(index)">
                            {{tab.name}} &nbsp;&nbsp;
                        </a>
                        <span v-if="tab.status === 'active' && tabs.length > 1" class="badge close-tab">
                             <i  @click="closeTab(index, tab.no)" class="fa fa-times text-white "> </i>
                        </span>
                    </li>

                    <li><a ><i class="fa fa-plus" @click="newTab"></i></a></li>
                </ul>
                <div class="tab-content">
                    <div :id="tab.id" class="tab-pane" :class="tab.status" v-for="(tab, index) in tabs" :key="index">
                        <div class="panel-body">
                            <pos-instance :namespace="tab.namespace"></pos-instance>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Tab from '../../modules/store/pos/Tab';
    import PosModule from "../../modules/store/pos/PosModule";
    import PosInstance from "./PosInstance";
    const { state, mutations, getters, actions, endpoints } = PosModule;
    export default {
        name: "Register",
        components: {PosInstance},
        data : function () {
            return {
                tab : Tab
            }
        },
        beforeRouteEnter(to, from, next){
            next(v => {
                if (v.tabs.length === 0){
                    v.newTab()
                }
            })
        },
        computed : {
            ...mapState('pos', {
                tabs : state => state.tabs,
                tabCount : state => state.tabCount
            }),
        },
        methods : {
            newTab : function () {
                //init tab
                this.tab.name = 'tab' + this.tabCount,
                this.tab.id =  'tab-' + this.tabCount,
                this.tab.namespace = 'pos/tab' + this.tabCount,
                this.tab.status = 'active',
                this.tab.no = this.tabCount,

                //register module
                this.$store.registerModule(['pos', `tab${this.tab.no}`],{
                    state,
                    mutations,
                    getters,
                    actions,
                    namespaced : true,
                    endpoints
                });

                //add tab
                this.$store.commit('pos/ADD_TAB', Object.assign({}, this.tab))
                // reset tab variable
                this.tab = {}
            },

            closeTab : function (index, no) {

                // close all but last tab
                if (this.tabs.length > 0){
                    this.$store.commit('pos/REMOVE_TAB', index);  // remove tab
                    this.$store.unregisterModule(['pos', `tab${no}`]);  // Unregister tab module from pos store
                }

            },
            switchTab : function (index) {
                this.$store.commit('pos/SWITCH_TAB', index);  // remove tab
            }
        }
    }
</script>
<style scoped>
    .close-tab{
        position: absolute;
        top: -6px;
        right: -5px;
    }
    .close-tab:hover {
        background-color : #ed5565;
    }
    .tabs-container .tab-pane .panel-body{
        background-color: #FAFBFB;
    }
    .tabs-container .nav-tabs > li.active > a{
        background-color: #FAFBFB;
    }
</style>