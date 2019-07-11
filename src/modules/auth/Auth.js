
class Auth {

    constructor(){
        this.token = window.localStorage.getItem('token');

        //Set axios global headers
        window.axios.defaults.headers.common['Accept'] = 'Application/json';
        window.axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        window.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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

    login (token){
        window.localStorage.setItem('token', token);
        this.token = token;
        Event.$emit('userLoggedIn');
    }

    logout () {
        window.localStorage.removeItem('token');
        this.token = null;
        Event.$emit('userLoggedOut');
    }
}

export default Auth;
