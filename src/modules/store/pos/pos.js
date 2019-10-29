class Pos {

    constructor(){

    }

    updateSale (sale, type){

        switch (type) {
            case 'QTY':
                if (sale.sellAs === 'CUSTOM' && (parseFloat(sale.measurement) === parseFloat(sale.soldMeasurement))){
                    sale.price =  (sale.salePrice * sale.qty) + (sale.discount * sale.qty) ;
                } else {
                    sale.price = ((sale.soldMeasurement * sale.unitPrice) * sale.qty) +  (sale.discount * sale.qty) ;
                }
                break;
            case 'UNIT':
                sale.price = (sale.soldMeasurement * sale.unitPrice) * sale.qty;
                sale.measurementAfter = sale.measurementBefore - sale.soldMeasurement;
                break;
            case 'UNIT_PRICE':
                sale.price = (sale.soldMeasurement * sale.unitPrice) * sale.qty;
                sale.measurementAfter = sale.measurementBefore - sale.soldMeasurement;
                break;

            case 'DISCOUNT':
                if (sale.sellAs === 'CUSTOM' && (parseFloat(sale.measurement) === parseFloat(sale.soldMeasurement))){
                    sale.price =  (sale.salePrice * sale.qty) + (sale.discount * sale.qty) ;
                } else {
                    sale.price = ((sale.soldMeasurement * sale.unitPrice) * sale.qty) +  (sale.discount * sale.qty) ;
                }
                break;
        }
        return sale;
    }

    performOperation (formulae){
        switch (formulae.operation) {
            case "QTY":
                if (formulae.operand.sellAs !== 'CUSTOM') {
                    formulae.operand.qty = parseInt(formulae.operand.qty + '' + formulae.input);
                }
                break;
            case 'UNIT':
                if (formulae.operand.sellAs !== 'FULL') {
                    formulae.operand.soldMeasurement = parseInt(formulae.operand.soldMeasurement + '' + formulae.input);
                }
                break;
            case 'PRICE':
                formulae.operand.price = parseInt(formulae.operand.price + '' + formulae.input);
                break;
        }

        return this.updateSale(formulae.operand, formulae.operation)
    }

    prepareDocument(type = 'ORDER', customer, items, payment){
        let data = {
            customerId : customer.id,
            customerDetails : JSON.stringify(customer),
            orderType : type,
            orderStatus : type === 'ORDER' ? 'PAID' : 'PENDING',
            orderItems : JSON.stringify(items),
            total : payment.total,
            paymentMethod : payment.method,
            tendered : payment.tendered,
            change : payment.change,
        };

        return data;
    }
}
export default Pos
