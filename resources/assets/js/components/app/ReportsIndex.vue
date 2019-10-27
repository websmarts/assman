<template>
    <v-container>
        <div class="display-2">Safety Audit &amp; Asset Management Reports</div>

        <v-layout  mt-4 justify-center>
          <v-flex xs12 md6 mt-4 >
            <v-card color="blue-grey" class="white--text">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline">Asset report</h3>
                </div>
                  
              </v-card-title>
              <v-card-text>
                <div  py-5 class="text-xs-left display-1" >Total number of assets: {{assetcount}}</div>
                
                  
                
              </v-card-text>
              
              
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout  mt-4 justify-center>
          <v-flex xs12 md6 mt-4>
            <v-card color="blue-grey " class="white--text">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline">Audit report</h3>
                </div>
              </v-card-title>
              <v-card-text>
                
                <div  py-5 class="text-xs-left display-1" >Audits overdue : {{auditsdue}}</div>

                <div  style="background:#fff; margin-top:18px"><bar-chart v-if="loaded" :chart-data="datacollection"></bar-chart></div>

              </v-card-text>
              <v-card-actions>
                <v-btn flat dark @click="goto('auditsdue')">view audits due</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>

    </v-container>

</template>

<script>

import BarChart from './charts/BarChart.js'

export default {
    components: {
      BarChart
    },

    data() {
        return {
          loaded: false,
          auditsdue: 0,
          auditsOverdue30: 0,
          auditsdone: 0,
          assetcount: 0,
         
          datacollection: {
          
            labels: ["Total due", "30+ days overdue"],
            datasets: [
              {
                
                backgroundColor: [ "#8e5ea2","#fe95cd"],
                data: [716,80]
              }
            ]
        }

          
          
        }
      
    },
 
    methods: {

      goto(url) {
        this.$router.history.push(url)
      },
      load() {
         this.$api.get('/api/reports',(status,data) => {
                this.assetcount = data.data.assetcount
                this.auditsdue = data.data.auditsdue
                this.auditsOverdue30 = data.data.auditsOverdue30

                this.datacollection.datasets[0].data[0] = this.auditsdue 
                this.datacollection.datasets[0].data[1] = this.auditsOverdue30 

                this.loaded = true
            })
            
      }


    },
    mounted() {
      

      this.load()

    }
    
}
</script>
    