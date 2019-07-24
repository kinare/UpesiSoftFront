let endpoint = {
    products : 'products/get/all',
    subProducts : id => `product/subProducts/all?productId=${id}`,
    insert : 'products/new',
    categories : 'products/categories',
    newCategory : 'products/createCategory',
    measurementUnits : 'products/measurementUnits',

}

export default endpoint;