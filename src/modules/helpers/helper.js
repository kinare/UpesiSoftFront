import moment from "moment/moment";

class Helper {
    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    prepareFormData (formData){
        let data = new FormData();
        for(let key in formData){
            data.append(key, formData[key]);
        }
        return data;
    }

    dateFix (date){
        if (date){
            if (moment(date, "YYYY-MM-DD").format("YYYY-MM-DD") === date) return date;
            let d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            return moment(d).format("YYYY-MM-DD");
        }
        return '';
    }
}
export default Helper;
