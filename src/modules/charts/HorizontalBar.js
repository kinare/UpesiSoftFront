import { HorizontalBar } from 'vue-chartjs'
export default {
    extend : HorizontalBar,
    props : ['data', 'options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}