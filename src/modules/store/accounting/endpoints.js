let endpoint = {
    documents : param => `orders/get${param}`,
    measurements :'products/measurementUnits',
    update :'order/state/update',
    mail :'orders/customer/email',
}

export default endpoint;
