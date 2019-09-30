class Scope {

    constructor() {
        this.scopes = JSON.parse(localStorage.getItem('scopes'));
    }

    getScopes (){
        return this.hasScopes() ? this.scopes : false
    }

    setScopes(role){
        let scopes = {
            business : {
                view : role.viewBusinessDetails,
                update : role.editBusinessDetails,
                delete : role.editBusinessDetails,
                create : role.editBusinessDetails,
            },
           users : {
               view : role.viewUsers,
               update : role.editUsers,
               delete : role.deleteUsers,
               create : role.createUsers,
           },
           roles : {
               view : role.viewUserRoles,
               update : role.editUserRoles,
               delete : role.deleteUserRoles,
               create : role.createUserRoles,
           },
           products : {
               view : role.viewProducts,
               update : role.editProducts,
               delete : role.deleteProducts,
               create : role.createProducts,
           },
           categories : {
               view : true,
               update : true,
               delete : true,
               create : true,
           },
           sales : {
               view : role.makeSales,
               update : role.makeSales,
               delete : role.makeSales,
               create : role.makeSales,
           },
           customers : {
               view : role.viewCustomers,
               update : role.editCustomers,
               delete : role.deleteCustomers,
               create : role.createCustomers,
           },
           invoices : {
               view : true,
               update : true,
               delete : true,
               create : true,
           },
           quotes : {
               view : true,
               update : true,
               delete : true,
               create : true,
           },
           orders : {
               view : true,
               update : true,
               delete : true,
               create : true,
           },
        }
        window.localStorage.setItem('scopes', JSON.stringify(scopes));
        this.scopes = scopes;
    }

    clearScopes(){
        localStorage.removeItem('scopes');
    }

    hasScopes(){
        return !!this.scopes;
    }
}
export default Scope;
