class Scope {

    constructor(role) {
        this.setScope(role);
    }

    getScope (){
        return this.scopes;
    }

    setScope(role){
       return  this.scopes = {
           users : {
               view : role.viewUsers,
               update : role.editUsers,
               delete : role.deleteUsers,
               create : role.createUsers,
           },
           roles : {
               view : role.UserRoles,
               update : role.editUserRoles,
               delete : role.UserRoles,
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
    }

}

export default Scope;