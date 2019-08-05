var filterItems = {
    computed : {
        filteredItems(){
            let self = this;
            return this.term === ''
                ? this.documents
                : this.documents.filter(doc => {
                    return doc.customerAddress ? doc.customerAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    || doc.customerBusinessName ? doc.customerBusinessName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    || doc.customerEmail ? doc.customerEmail.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    || doc.customerFirstName ? doc.customerFirstName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    || doc.customerPhoneNumber ? doc.customerPhoneNumber.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    || doc.customerPostalAddress ? doc.customerPostalAddress.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                    || doc.orderItems.productName ? doc.orderItems.productName.toLowerCase().indexOf(self.term.toLowerCase()) >= 0 : ''
                });

        }
    }
}

export default filterItems;
