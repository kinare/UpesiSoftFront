let endpoint = {
    // products
    products : 'products/get/all',
    insert : 'products/new',

    // categories
    categories : 'categories/get/all',
    generateReceipt : 'orders/new',

    // customers
    customers : 'customers/get/all',
    deleteCustomers : 'customer',
    insertCustomer : 'customers/new',

    // get document
    document : param => `orders/get?orderType=${param.type}&orderId=${param.id}&orderStatus=${param.status}`

}

export default endpoint;