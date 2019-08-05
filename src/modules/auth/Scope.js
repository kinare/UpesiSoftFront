class Scope {

    constructor(role) {
        this.setScope(role);
    }

    getScope (){
        return this.scopes;
    }

    setScope(role){
       return  this.scopes = {
            user : {
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
            },
            inventory : {
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
                }
            },
            pos : {
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
            },
            accounting : {
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
            },
        }
    }

}

export default Scope;