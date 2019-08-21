let endpoint = {
    documents : param => `orders/get${param}`,
    measurements :'products/measurementUnits',
}

export default endpoint;