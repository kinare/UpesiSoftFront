import { Bar } from 'vue-chartjs'
export default {
    extend : Bar,
    props : ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}