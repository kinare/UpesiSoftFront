
/*
* Permissins mixin
*
*
*/


import { mapState } from "vuex";

const permissions = {

    beforeCreate(){
        //check if has scopes and fetch if not
        if (!this.hasScopes)
            this.$store.dispatch('getRoles');
    },

    computed : {
       // get the scope by scope data property
        getScope() {
            return this.scopes[this.scope]
        },

        //check if component has local scope set
        hasLocalScope() {
            return !!this.scope
        },

        /*
        * check for abilities with local scope set
        */
        canView() {
            return this.hasScopes && this.hasLocalScope ? !!this.getScope.view : false
        },
        canCreate() {
            return this.hasScopes && this.hasLocalScope ? !!this.getScope.create : false
        },
        canDelete() {
            return this.hasScopes && this.hasLocalScope ? !!this.getScope.delete : false
        },
        canUpdate() {
            return this.hasScopes && this.hasLocalScope ? !!this.getScope.update : false
        },

        /*
        * get store values
        * */
        ...mapState({
            hasScopes: state => state.hasScopes,
            scopes: state => state.scopes
        })
    },
    methods : {
        /*
        * check for ability with passed scope
        */
         can : function(ability, scope){
            return this.hasScopes ? !!this.scopes[scope][ability] : true
        }
    }
};

export default permissions;