import { mapState, mapGetters } from "vuex";
import sanitizer from "./SanitizeRecords";

let sales = {
    mixins : [sanitizer],
    data : function(){
        return {
            type : '',
            term : '',
            validator : window.validator
        }
    },
    beforeRouteEnter(to, from, next){
        next(v =>{
            v.$store.dispatch('accounting/getSalesDocuments', v.type ? `?orderType=${v.type}` : '');
            v.$store.dispatch('accounting/getMeasurementUnit');
        })
    },

    computed : {
        filteredItems(){
            let self = this;
            return this.term === ''
                ? this.documents
                : this.sanitize(this.documents).filter(doc => {
                    return doc.orderType.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerBusinessName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerEmail.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerFirstName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerLastName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerPhoneNumber.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerPostalAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.cashierEmail.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.cashierFirstName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.cashierLastName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.orderStatus.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.paymentMethod.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.total.toString().toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || doc.customerPostalAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                    || JSON.stringify(doc.orderItems).toLowerCase().indexOf(self.term.toLowerCase()) >= 0
                });
        },

        ...mapState('accounting',{
            documents : state => state.salesDocuments,
            loading : state => state.loading,
            message : state => state.message,
            status : state => state.status,
        }),

        ...mapGetters('accounting',[
            'totalIncome',
            'total',
            'getUnit'
        ])
    }
}

export default sales;
