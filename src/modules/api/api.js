class Api {
    baseUrl = 'https://api.upesisoft.com/v1/'
    constructor () {}
    async call(requestType, url, data = null){
        return await window.axios[requestType](this.baseUrl + url, data);
    }

}
export default Api;
