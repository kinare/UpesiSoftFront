let rules = {
    delegateData : {
        Membership_Type : 'optional',
        Member_No : 'optional',
        Local_Professional_Body : 'required',
        organisation : 'required',
        Status : 'optional',
        Names : 'required',
        ID_Number : 'optional',
        PIN_Registration_No : 'optional',
        E_mail : 'required|email|max:100',
        Phone_No : 'required',
        Address : 'required',
        City : 'required',
        Country : 'required',
        Post_Code : 'required',
        County : 'optional',
        Amount_Excl_VAT : 'optional',
        VAT_Amount : 'optional',
        Amount_Incl_VAT : 'optional',
        Cost : 'optional',
        Pricing : 'optional',
        Event_Code : 'optional',
        Registration_No : 'optional',
        Delegate_No : 'optional',
        Currency : 'optional',
    },

    billTo : {
        Address : 'required',
        Local_Affiliated_Body : 'required',
        City    : 'required',
        County  : 'optional',
        E_mail  : 'required|email|max:100',
        Event_Code  : 'optional',
        ID_Number  : 'optional',
        Member_No  : 'optional',
        Membership_Type  : 'optional',
        Names  : 'required',
        Country  : 'required',
        PIN_Registration_No  : 'kra',
        Phone_No  : 'required',
        Post_Code  : 'required',
        Registration_No  : 'optional',
        Registration_Type  : 'optional',
        Contact_Person : 'required',
        Currency : 'optional'
    },
}

export default rules;


// /*
// * requires|optional|blank(i.e skip check)
// *
// * string numeric email kra passport date min max url array object size
// * bool  1 true 0 false 2 optional
// *
//
// *
//  /
