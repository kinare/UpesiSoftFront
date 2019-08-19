const listener = {
    mounted() {
        //Global Event Listeners
        Event.$on('userLoggedIn', () => {
            window.location = '/'
        });

        Event.$on('userLoggedOut', () => {
            this.$router.push('/auth/login')
        });

        Event.$on('userSignedUp', () => {
            this.$router.push('/auth/success')
        });

        Event.$on('userActivated', () => {
            this.$router.push('/auth/login')
        });

        Event.$on('userPasswordSet', () => {
            this.$router.push('/auth/login')
        });

        Event.$on('customerAdded', () => {
            this.$router.push('/pos/customers')
        });

        Event.$on('ApiError', () => {

        });
    }
}

export default listener