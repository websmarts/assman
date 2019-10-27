<template>
<v-layout justify-center>
    
    <v-flex xs12 sm11 md7>
        <v-tabs
            v-model="active"
            color="grey lighten-2"
            light
            slider-color="grey darken-2"
            >
            <v-flex xs2 class="blue darken-1" style="text-align: right;font-size:120%;color:#fff; padding:5px" >Asset ID</v-flex>
            <v-flex  class="blue darken-1" style="font-size:120%;color:#fff; padding:5px; text-align: left" >{{assetId}} 
                 <span style="color: #ccc; font-style: italic">{{ assettypeName }}</span></v-flex>
            <v-tab  
                :key="edit"
                ripple
            >
                Edit
            </v-tab>
            <v-tab  
                :key="audit"
                ripple
            >
                Audit
            </v-tab>
            <v-tab-item  
                :key="edit"
            >
                <v-card flat>
                    
                        <v-card-text>
                            <div class="title">Edit asset</div>
                            <asset-edit-form :asset="asset"></asset-edit-form>
                        </v-card-text>
                    
                </v-card>
                        
            </v-tab-item>

            <v-tab-item  
                :key="audit"
            >
                <v-card flat>
                <v-card-text>
                    <div class="title">Audit asset</div>
                    <asset-audit :asset="asset"  ></asset-audit>
                    <div class="title" style="margin-top:20x; padding:5px; border-top: 1px dashed #ccc">Asset Audit History</div>
                    <audit-history :audits="asset.audits" ></audit-history>
                </v-card-text>
                </v-card>
            </v-tab-item>


        </v-tabs>
    </v-flex>
</v-layout>
</template>

<script>
import store from './lib/store'

// LISTEN for NEW ASSET AUDIT
import { EventBus } from './lib/eventbus.js';


export default {
    data() {
        return {
            store: store,
            active: 0,
            edit: null,
            audit: null,
            assetId: null,
            asset:{}
        }
    },
    computed: {
        xhr_loading() {
            return this.store.isActive()
        },

        assettypeName() {
            if(typeof(this.asset.assettype) != "undefined"){
                return  this.asset.assettype.name 
            }
        }

    
    },
    methods: {
        addAudit(audit){
            // console.log('pushing new audit',audit)
            this.asset.audits.push(audit)
        },
        load () {
            const self = this
            
            this.$api.get('/api/asset/'+ this.assetId,(status,data) => {
                self.asset = Object.assign({},data.asset)
            })
            
            
            
            

        },
    },
    mounted() {

        this.assetId = this.$route.params.assetid

        // if route query m=audit then make audit tab the active one
        if(this.$route.query && this.$route.query.tab){
            if(this.$route.query.tab =='audit'){
                this.active = 1 // select the audit tab
            }
        }


        this.load()

        
    },
    created() {

        // when a new audit is created we reload the asset to get the 
        EventBus.$on('newAudit', () => {
            this.load()
            //this.$forceUpdate()
        })
    },
    watch: {
        '$route' (to, from) {
            // react to route changes...
            //console.log('re-routed to: ',to.params.assetid,'query',to.query)
            this.assetId = to.params.assetid
            if(typeof(this.assetId) !== 'undefined'){
                this.load()
            }

            if(to.query && to.query.tab){
                
                if(to.query.tab =='audit'){
                    
                    this.active = 1 // select the audit tab
                }
            }
            
        }
    }
}

</script>