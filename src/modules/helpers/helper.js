import moment from "moment/moment";

class Helper {
    constructor(){

    }

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

    sanitizeHeaders (heading){
        let arr =  heading.split('/');
        return arr[1].replace('-', ' ');
    }

    getApiPath (rawPath, data){
        if (data.length === 0) {
            return rawPath.replace('@', '/')
        } else {
            return  rawPath.substr(rawPath.length - 1) === '@' ? rawPath.replace('@', '/' + data) : rawPath.replace('@', '/' + data + '/') ;
        }
    }

    // getAttachment(type, id, filename = 'file.pdf'){
    //     let url = '';
    //     switch (type) {
    //         case 'academic' :
    //             url = endpoints.academicAttachment;
    //             break;
    //         case    'qualification' :
    //             url = endpoints.qualificationAttachment;
    //             break;
    //     }
    //     axios({
    //         url: url + '/' + id ,
    //         method: 'GET',
    //         responseType: 'blob', // important
    //     }).then((response) => {
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', filename); //or any other extension
    //         document.body.appendChild(link);
    //         link.click();
    //     });
    //
    // }

    getFileIconColor(fileName){
        if (!fileName) return '#727071';
        let fileExtension = fileName.split('.').pop();
        switch (fileExtension) {
            case 'docx' :
                return '#0276c0'
            case 'pdf' :
                return '#e62f34'
            case 'pptx' :
                return '#f39301'
            case 'xls' :
                return '#82bd8d'
            case 'png' :
                return '#a7ce59'
            case 'jpg' :
                return '#a7ce59'
            default :
                return '#727071'
        }
    }

    getFileIcon(fileName){
        if (!fileName) return 'fa fa-file-o';
        let fileExtension = fileName.split('.').pop();
        switch (fileExtension) {
            case 'docx' :
                return 'fa fa-file-word-o'
            case 'pdf' :
                return 'fa fa-file-pdf-o'
            case 'pptx' :
                return 'fa fa-file-powerpoint-o'
            case 'xls' :
                return 'fa fa-file-excel-o'
            case 'png' :
                return 'fa fa-file-photo-o'
            case 'jpg' :
                return 'fa fa-file-photo-o'
            default :
                return 'fa fa-file-o'
        }
    }

    getStatus (status){
        status = parseInt(status)
        switch (status){
            case 0 :
                return 'New';
            case 1 :
                return 'Received';
            case 2 :
                return 'Application';
            case 3 :
                return 'Review';
            case 4 :
                return 'Current';
            case 5 :
                return 'Inactive';
            case 6 :
                return 'Blocked';
            case 7 :
                return 'Deceased';
            case 8 :
                return 'Rejected';
            default :
                return 'Unknown';
        }
    }

    getStatusClass (status){
        status = parseInt(status)
        switch (status){
            case 0 :
                return 'gray-bg';
            case 1 :
                return 'gray-bg';
            case 2 :
                return 'gray-bg';
            case 3 :
                return 'gray-bg';
            case 4 :
                return 'navy-bg';
            case 5 :
                return 'red-bg';
            case 6 :
                return 'red-bg';
            case 7 :
                return 'black-bg';
            case 8 :
                return 'red-bg';
            default :
                return 'white-bg';
        }
    }

    getStatusLabelClass (status){
        status = parseInt(status)
        switch (status){
            case 0 :
                return 'label-default';
            case 1 :
                return 'label-default';
            case 2 :
                return 'label-default';
            case 3 :
                return 'label-default';
            case 4 :
                return 'label-primary';
            case 5 :
                return 'label-danger';
            case 6 :
                return 'label-danger';
            case 7 :
                return 'label-inverse';
            case 8 :
                return 'label-danger';
            default :
                return 'label-warning';
        }
    }

    getStatusIcon (status){
        status = parseInt(status)
        switch (status){
            case 0 :
                return 'fa-hourglass-start';
            case 1 :
                return 'fa-hourglass-half';
            case 2 :
                return 'fa-hourglass-1';
            case 3 :
                return 'fa-hourglass-end';
            case 4 :
                return 'fa-check';
            case 5 :
                return 'fa-times';
            case 6 :
                return 'fa-warning';
            case 7 :
                return 'fa-user-times';
            case 8 :
                return 'fa-warning';
            default :
                return 'fa-question';
        }
    }

    getGender (code){
        code = parseInt(code)
        switch (code){
            case 0 :
                return 'Male';
            case 1 :
                return 'Female';
            default :
                return 'Other';
        }
    }

    getMaritalStatus (code){
        code = parseInt(code)
        switch (code){
            case 0 :
                return 'Not Saying';
            case 1 :
                return 'Single';
            case 2 :
                return 'Married';
            case 3 :
                return 'Widowed';
            case 4 :
                return 'Divorced';
            case 5 :
                return 'Separated';
            default :
                return 'Unspecified';
        }
    }

    justKidding (){
        alert("Relax, you're safe it will take billions of years before they collide");
    }
}
export default Helper;
