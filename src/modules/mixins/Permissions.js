import { mapState } from "vuex";

const permissions = {
    beforeCreate(){
        if (!this.hasScopes)
            this.$store.dispatch('getRoles');
    },
    computed : {
        getScope(){return this.scopes[this.scope]},
        hasLocalScope(){return !!this.scope},
        canView(){ return this.hasScopes && this.hasLocalScope ? !!this.getScope.view : false},
        canCreate(){return this.hasScopes && this.hasLocalScope ? !!this.getScope.create : false},
        canDelete(){return this.hasScopes && this.hasLocalScope ? !!this.getScope.delete : false},
        canUpdate(){return this.hasScopes && this.hasLocalScope ? !!this.getScope.update : false},

        ...mapState({
            hasScopes : state => state.hasScopes,
            scopes : state => state.scopes
        })
    },
    methods : {
         can : function(ability, scope){
            return this.hasScopes ? !!this.scopes[scope][ability] : true
        }
    }
};

export default permissions;