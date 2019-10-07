let endpoint = {
    documents : param => `orders/get${param}`,
    measurements :'products/measurementUnits',
    update :'order/state/update',
    delete :'',
    mailDoc : 'orders/customer/email',

}

export default endpoint;
