class Auth {

    constructor(){
        this.user = window.localStorage.getItem('user') !== 'undefined' ? JSON.parse(window.localStorage.getItem('user')) : null;
    }

    check (){
        return !!(this.user);
    }

    AuthUser (){
        return this.user;
    }

    login (user){
        window.localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    logout (){
        localStorage.clear();
    }
}

export default Auth;
