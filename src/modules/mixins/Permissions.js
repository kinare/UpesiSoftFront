const permissions = {
    data : function(){
        return {
            scope : 'all'
        }
    },
    computed : {
        getScope (){
            if (this.scope){
                return this.$store.getters.getScope(this.scope);
                // eslint-disable-next-line no-console
            } else { console.log('scope not set')}
        },
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
        can : function (ability, scope = null) {
            return this.getScope ? this.scope !== 'all' ?  !!this.getScope[ability] : scope ? !!this.getScope[scope][ability]  : false : false
        }
    }
};

export default permissions;