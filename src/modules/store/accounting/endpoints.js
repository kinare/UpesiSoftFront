let endpoint = {
    documents : param => `orders/get${param}`,
    measurements :'products/measurementUnits',
    update :'order/state/update',
    delete :'',
}

export default endpoint;
