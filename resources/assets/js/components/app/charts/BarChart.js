import { Bar , mixins} from 'vue-chartjs'
const { reactiveProp } = mixins


export default {
  extends: Bar,
  mixins: [reactiveProp],
  
  data() {
    return {
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Audits due'
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        
                        beginAtZero: true   // minimum value will be 0.
                    }
                }]
            }
          }
        
    }
  },

  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}