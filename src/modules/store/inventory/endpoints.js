let endpoint = {
    products : 'products/get/all',
    removeProduct : 'product',
    subProducts : id => `product/subProducts/all?productId=${id}`,
    insert : 'products/new',
    restock : 'product/restock',
    categories : 'products/categories',
    removeCategory : 'products/category',
    newCategory : 'products/createCategory',
    measurementUnits : 'products/measurementUnits',

}

export default endpoint;