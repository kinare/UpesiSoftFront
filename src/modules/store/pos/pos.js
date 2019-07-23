class Pos {

    constructor(){

    }

    updateSale (sale, type){

        switch (type) {
            case 'QTY':
                sale.price = sale.qty * sale.itemPrice
                break;
            case 'UNIT':
                sale.price = sale.soldMeasurement * sale.itemPrice
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
}
export default Pos