class Api {
    baseUrl = 'https://api.upesisoft.com/v1/'

    constructor () {
        this.intercept()
    }


    async call(requestType, url, data = null){
        return await window.axios[requestType](this.baseUrl + url, data);
    }

    intercept(){
        //Intercept axios for toast
        window.axios.interceptors.response.use(res =>{
            return Promise.resolve(res)
        }, error => {
            Event.$emit('ApiError', error.response.status, error.response.data.message);
            return Promise.reject(error)
        })
    }

}
export default Api;
