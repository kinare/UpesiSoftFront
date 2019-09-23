import SalesTemplate from '../../components/SalesDocument'

const SalesDoc = {

    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        this.DocEvent = new Vue();

        Vue.component('sales-document', SalesTemplate);

        Vue.prototype.$salesDoc = {
            initDoc(params) {
                SalesDoc.DocEvent.$emit('InitSalesDocument', params);
            }
        }
    }
};

export default SalesDoc;
