<template>

                    
                        
                        <v-layout row align-center >

                            
                            
                            <v-flex xs4 style="padding-left:30px">
                                    
                                    <v-autocomplete
                                        :loading="loading"
                                        :items="assetIds"
                                        
                                        v-model="assetId"
                                        @change="assetSelected"
                                        :search-input.sync="search"
                                        clearable
                                        light
                                        flat
                                        hide-details
                                        label="Enter Asset ID..."
                                        solo
                                    >
                                        <template v-slot:no-data>
                                            <div>{{ dropdown_message }}</div>
                                        </template>
                                    
                                    </v-autocomplete>
                            </v-flex>
                            <!-- <v-flex ><v-btn :disabled="!assetId" color="blue darken-2" @click="view" style="height:60px"> 
                                Show <br /> Asset<v-icon dark right v-show="btn_selected.view">check_circle</v-icon>
                                </v-btn></v-flex> -->
                            <v-flex></v-flex>

                            <v-flex >
                                <v-menu offset-y>
                                <v-btn slot="activator"  color="blue darken-2" style="height:60px">
                                    Add<br /> asset<v-icon dark right v-show="btn_selected.add">check_circle</v-icon>
                                    </v-btn>

                                    <v-list>
                                        <v-list-tile
                                        v-for="(item, index) in assetTypes"
                                        :key="index"
                                        @click="add(item.id)"
                                        >
                                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>

                                </v-menu>
                            </v-flex>

                            <v-flex ><v-btn color="blue darken-2" @click="auditsdue" style="height:60px">
                                Audits<br />due ({{ auditsDueCount }})
                                <v-icon dark right v-show="btn_selected.auditsdue">check_circle</v-icon>
                                </v-btn></v-flex>

                            <v-flex xs3 style="text-align:left;"><v-btn color="blue darken-2" @click="reports" style=" height:60px">
                                Reports<v-icon dark right v-show="btn_selected.reports">check_circle</v-icon>
                                </v-btn>
                            </v-flex>
                            
                        </v-layout>
                    
  

</template>

<script>





import store from './lib/store.js';

export default {
    props: ['currentroute'],
    data() {

        return {
            store: store,
            assetId: null,
            search: null,
            assetIds: [],
            auditsDueCount: $Refdata['audits_due_count'],
            dropdown_message: 'No matching items...',
            
            loading: false,
            isEditing: false,
            // goBtnDisabled: true,

            
            assetTypes: $Refdata.asset_types,

            btn_selected: {
                view: false,
                add: false,
                reports: false,
                auditsdue:false
            },
            
            
        }
    },
    computed: {
        xhr_loading() {
            return this.store.isActive()
        }
        

            
        
    },
    methods: {
        querySelections(val) {

            // console.log('querySelections with val=',val)
            
            if(val){
                let opts = $AssetIds.filter(opt => {

                    return (opt.substr(0,val.length + 1 ) == val)
                })

                
                if(opts.length > 0  ){
                    this.assetIds = opts // show only ones 
                } else {
                    this.assetIds = $AssetIds // make all available
                }
                
            }
            
            
        },
        assetSelected(e) {
            //this.goBtnDisabled = false
         this.view();
        },
        
        view() { // view asset
            if(typeof(this.assetId) != "undefined") {

                // issue an event to route to view_asset
                this.$router.push('/view/'+this.assetId);
            }
            
            //this.updateButtonSelectIndicators('select')
            
        },
        add(assetTypeId) { // add asset
            this.$router.push('/add/'+ assetTypeId);
            //this.updateButtonSelectIndicators('add')
        },
        reports() {
            this.$router.push('/reports');
            //this.updateButtonSelectIndicators('reports')
        },
        auditsdue() { // audits due report
            this.$router.push('/auditsdue');
        },
        updateButtons(btn){
            let self = this
            Object.keys(this.btn_selected).forEach(function(key,index) {
                self.btn_selected[key] = key == btn ? true : false
            })
        }
        
        

    },
    watch: {
        'currentroute' (to, from) {
            // Update the tooldar buttons to show what is active
            this.updateButtons(to)

            // Update the current assetId
            this.assetId = this.$route.params.assetid

            
            this.search = this.assetid 
            if(this.assetId){ // provide some items for autocomplete
                this.querySelections(this.assetId)
            }   
        },
        'search' (val) {
            val && val !== this.assetId && this.querySelections(val)
        }
        
    }
    
 
    

}


</script>