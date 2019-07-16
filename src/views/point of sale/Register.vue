<template>
    <div class="container-fluid p-sm">
        <div class="row">
            <div class="tabs-container">
                <ul class="nav nav-tabs">
                    <li v-for="(tab, index) in tabs" :key="index" :class="tab.active ? 'active' : ''"><a data-toggle="tab" :href="'#' + tab.id" aria-expanded="true">{{tab.name}} <i @click="closeTab(index)" class="fa fa-times text-danger text-right"></i> </a></li>
                    <li><a @click="newTab"><i class="fa fa-plus"></i></a></li>
                </ul>
                <div class="tab-content">
                    <div :id="tab.id" class="tab-pane" :class="tab.active ? 'active' : ''" v-for="(tab, index) in tabs" :key="index">
                        <div class="panel-body">
                            <multi-modules :mymodule="tab.namespace"></multi-modules>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import MultiModules from "./MultiModules";
    import PosModule from "../../modules/store/pos/PosModule";
    const {state, mutations, getters, actions } = PosModule
    export default {
        name: "Register",
        components: {MultiModules},
        data : function () {
            return {
                tabs : [
                    {
                        name: 'tab one',
                        id: 'tab-1',
                        namespace: 'moduleA',
                        active : true,
                    }
                ]
            }
        },
        methods : {
            newTab : function () {
                let cTab = this.tabs.length + 1
                let tab = {
                    name: 'tab' + cTab,
                    id: 'tab-' + cTab,
                    namespace: 'module' + cTab,
                    active : true,
                }

                //register module

                this.$store.registerModule(`module${cTab}`,{
                    state,
                    mutations,
                    getters,
                    actions,
                    namespaced : true
                })

                this.tabs.forEach(tab => {
                    tab.active = ''
                })

                this.tabs.push(tab);
            },

            closeTab : function (index) {
                this.tabs.splice(index, 1);
                this.$store.unregisterModule(`module${index}`)
                this.tabs[index - 1].active = true
            }
        }
    }
</script>
<style scoped>

</style>