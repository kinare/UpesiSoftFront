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
        }

        return sale;
    }
}

export default Pos