const sanitizer = {
    methods : {
        sanitize : function (payload) {
            let excludeFields = ['productImage', 'profilePicture'];



            return payload.map(item => {
                for (let key in item){
                    if (!excludeFields.includes(key)) {
                        if (item[key] === null)
                            item[key] = ''
                    }
                }
                return item
            })
        }
    }
}

export default sanitizer