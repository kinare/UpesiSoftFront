const permissions = {
    data : function(){
        return {
            scope : 'all'
        }
    },
    computed : {
        getScope (){
            if (typeof this.scope !== 'undefined')
                return this.$store.getters.getScope(this.scope);
        },
        getAllScopes (){
            return this.$store.getters.getAllScope;
        }
    },

    methods : {
        canView : function () {
            return this.getScope ? !!this.getScope.view : false
        },
        canCreate : function () {
            return this.getScope ? !!this.getScope.create : false
        },
        
        canDelete : function () {
            return this.getScope ? !!this.getScope.delete : false
        },
        
        canUpdate : function () {
            return this.getScope ? !!this.getScope.update : false
        },

        // gets scope and ability
        can : function (ability, scope) {
            return typeof this.getAllScopes[scope] !== "undefined" ? this.getAllScopes[scope][ability] : false
        }
    }
};

export default permissions;