import { Pie } from 'vue-chartjs'
export default {
    extend : Pie,
    props : ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}