
class Auth {

    constructor(){
        this.token = window.localStorage.getItem('token');
        this.user = window.localStorage.getItem('user');
        this.businessDetails = window.localStorage.getItem('businessDetails');
        this.userPermissions = window.localStorage.getItem('businessDetails');

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

    persmissions (){
        return this.userPermissions || null;
    }

    business (){
        return this.businessDetails || null
    }

    login (data){
        //persist items to local storage
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data.user));
        window.localStorage.setItem('userPermissions', JSON.stringify(data.userPermissions));
        window.localStorage.setItem('businessDetails', JSON.stringify(data.businessDetails));

        //make items available globally
        this.token = data.token;
        this.user = JSON.stringify(data.user);
        this.businessDetails = JSON.stringify(data.businessDetails);
        this.userPermissions = JSON.stringify(data.userPermissions);

        //redirect to loggedin
        Event.$emit('userLoggedIn');
    }

    logout () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('userPermissions');
        window.localStorage.removeItem('businessDetails');
        window.scopes.clearScopes();
        this.token = null;
        this.user = null;
        this.businessDetails =  null;
        this.userPermissions =  null;

        Event.$emit('userLoggedOut');
    }
}

export default Auth;
