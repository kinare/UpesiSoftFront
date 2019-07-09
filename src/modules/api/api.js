import * as axios from "axios/index";

class Api {
    baseUrl = 'http://localhost:8080/v1/'
    constructor () {}
    async call(requestType, url, data = null){
        return await axios[requestType](this.baseUrl + url, data);
    }

}
export default Api;
