import * as axios from "axios";

class Api {
    constructor () {}

    async call(requestType, url, data = null){
        return await axios[requestType](url, data);
    }

}
export default Api;
