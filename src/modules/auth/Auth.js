
class Auth {

    constructor(){
        this.token = window.localStorage.getItem('token');

        if (this.check()){
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            window.axios.defaults.headers.common['Accept'] = 'Application/json';
        }else {
            window.axios.defaults.headers.common['Accept'] = 'Application/json';
        }
    }

    check (){
        return !!this.authToken();
    }

    authToken (){
        return this.token;
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
