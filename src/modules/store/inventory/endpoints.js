let endpoint = {
    products : 'products/get/all',
    removeProduct : 'product',
    subProducts : id => `product/subProducts/all?productId=${id}`,
    insert : 'products/new',
    categories : 'products/categories',
    removeCategory : 'products/category',
    newCategory : 'products/createCategory',
    measurementUnits : 'products/measurementUnits',

}

export default endpoint;