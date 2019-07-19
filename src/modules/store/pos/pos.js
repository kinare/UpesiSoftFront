class Pos {

    constructor(){

    }

    updateSale (sale, type){

        switch (type) {
            case 'QTY':
                sale.salePrice = sale.qty * sale.itemPrice
                break;
            case 'UNIT':
                sale.salePrice = sale.measurement * sale.itemPrice
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
                    formulae.operand.measurement = parseInt(formulae.operand.measurement + '' + formulae.input);
                }
                break;
            case 'PRICE':
                formulae.operand.salePrice = parseInt(formulae.operand.salePrice + '' + formulae.input);
                break;
        }

        return this.updateSale(formulae.operand, formulae.operation)
    }
}
export default Pos