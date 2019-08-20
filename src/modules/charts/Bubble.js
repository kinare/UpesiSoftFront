import { Bubble } from 'vue-chartjs'
export default {
    extend : Bubble,
    props : ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}