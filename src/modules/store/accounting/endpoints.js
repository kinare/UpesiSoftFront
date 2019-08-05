let endpoint = {
    document : param => `orders/get?orderType=${param.type}`
}

export default endpoint;