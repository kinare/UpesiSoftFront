const listener = {
    mounted: function () {
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

        Event.$on('ApiError', (status, messsage) => {
            let toastObject = {
                position: "top-right",
                keepOnHover: true,
                iconPack: 'fontawesome',
                duration: 5000,
                type: "error",
                icon: 'exclamation-circle',
                closeOnSwipe: true,

            }

            switch (status) {
                case 200 :
                    toastObject.type = "success"
                    toastObject.icon = "check-circle"
                    break
                case 201 :
                    toastObject.type = "success"
                    toastObject.icon = "check-circle"
                    break
                case 204 :
                    toastObject.type = "default"
                    toastObject.icon = "exclamation-circle"
                    // messsage = 'No content'
                    break
                case 304 :
                    toastObject.type = "default"
                    toastObject.icon = "exclamation-circle"
                    // messsage = 'Not modified'
                    break
                case 400 :
                    toastObject.type = "error"
                    toastObject.icon = "exclamation-circle"
                    // messsage = 'Bad request'
                    break
                case 403 :
                    toastObject.type = "error"
                    toastObject.icon = "exclamation-circle"
                    messsage = 'Unauthorized'
                    break
                case 404 :
                    toastObject.type = "error"
                    toastObject.icon = "exclamation-circle"
                    messsage = 'Forbidden'
                    break
                case 500 :
                    toastObject.type = "error"
                    toastObject.icon = "exclamation-circle"
                    messsage = 'Not found'
                    break
                default :
                    toastObject.type = "info"
                    toastObject.icon = "exclamation-circle"
                    messsage = 'something went wrong'
            }


            this.$toasted.show(messsage, toastObject)
        });
    }
}

export default listener