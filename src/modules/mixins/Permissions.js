const permissions = {
    data : function(){
        return {
            // scope : 'inventory'
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
            // return this.getS
        },
        canCreate : function () {
            
        },
        
        canDelete : function () {
            
        },
        
        canUpdate : function () {
            
        }
    }
};

export default permissions;