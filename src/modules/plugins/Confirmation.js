import ConfirmationModal from '../../components/Confirmation'

const  Confirm = {

    install(Vue){

        this.EventBus = new Vue();

        Vue.component('confirmation-modal', ConfirmationModal);

        Vue.prototype.$confirm = {
            show(params) {
                Confirm.EventBus.$emit('show', params);
            }
        }
    }
};

export default Confirm;
