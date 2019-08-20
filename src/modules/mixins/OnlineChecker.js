const isOnline = {
    data : function () {
        return{
            online : navigator.onLine
        }
    },

    mounted() {
        setInterval(() =>{
            if (!this.online)
                Event.$emit('noInternet')
        }, 5000)
    }
}

export default isOnline