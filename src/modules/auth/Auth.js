
class Auth {

    constructor(){
        this.token = window.localStorage.getItem('token');
        this.user = window.localStorage.getItem('user');
        this.paymentPlan = window.localStorage.getItem('paymentPlan');

        //Set axios global headers
        window.axios.defaults.headers.common['Accept'] = 'Application/json';
        window.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // window.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        //set token if present
        if (this.check()){
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }

    check (){
        return !!this.authToken();
    }

    authToken (){
        return this.token || null;
    }

    authUser (){
        return this.user || null
    }

    login (data){
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data.user));
        window.localStorage.setItem('paymentPlan', JSON.stringify(data.paymentPlan));
        this.token = data.token;
        this.user = JSON.stringify(data.user);

        //todo check for active plan
        if (!data.paymentPlan) {
            Event.$emit('businessPricing');
        }else {
            Event.$emit('userLoggedIn');
        }

    }

    logout () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('paymentPlan');
        window.scopes.clearScopes();
        this.token = null;
        this.user = null;
        Event.$emit('userLoggedOut');
    }
}

export default Auth;
