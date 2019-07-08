
class Auth {

    constructor(){
        this.token = window.localStorage.getItem('token');
        this.user = window.localStorage.getItem('user') !== 'undefined' ? JSON.parse(window.localStorage.getItem('user')) : null;
        if (this.check()){
            // eslint-disable-next-line no-undef
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            // eslint-disable-next-line no-undef
            axios.defaults.headers.common['Accept'] = 'Application/json';
        }else {
            // eslint-disable-next-line no-undef
            axios.defaults.headers.common['Accept'] = 'Application/json';
        }
    }

    check (){
        return !!(this.AuthUser() && this.AuthToken());
    }

    AuthUser (){
        return this.user !== null;
    }

    AuthToken (){
        return this.token !== 'null';
    }

    login (token, user){
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        this.token = token;
        this.user = user;
        Event.$emit('userLoggedIn');
    }

    logout () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        this.token = null;
        this.user = null;
        Event.$emit('userLoggedOut');
    }
}

export default Auth;
