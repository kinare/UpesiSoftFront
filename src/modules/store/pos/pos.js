class Pos {

    constructor(){

    }

    updateSale (sale, type){

        switch (type) {
            case 'QTY':
                sale.price = sale.qty * sale.unitPrice
                break;
            case 'UNIT':
                sale.price = sale.soldMeasurement * sale.unitPrice
                sale.measurementAfter = sale.measurementBefore - sale.soldMeasurement
                break;
            case 'PRICE':
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