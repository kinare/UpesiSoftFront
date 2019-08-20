const isOnline = {
    data : function () {
        return{
            online : navigator.onLine
        }
    },

    mounted() {
        setInterval(() =>{
            if (!this.online)
                this.$toasted.show('No internet connection', {
                    position: "bottom-right",
                    keepOnHover: true,
                    iconPack: 'fontawesome',
                    duration: 500,
                    type: "error",
                    icon: 'unlink',
                    closeOnSwipe: true,
                    singleton : true
                })
        }, 5000)
    }
}

export default isOnline