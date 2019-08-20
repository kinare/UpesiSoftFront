import { Line } from 'vue-chartjs'
export default {
    extends : Line,
    props: {
        data: {
            type: Object,
            default: null
        },
        options: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.renderChart(this.data, this.options)
    },
    watch : {
        data : {
            // eslint-disable-next-line no-unused-vars
            handler : function (n, o) {
                this.renderChart(n, this.options);
            },
            deep : true
        }
    }
}