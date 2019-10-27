<template>

    <v-app id="inspire">
    
        
        <v-toolbar color="blue" height="85" dark fixed app>
        
            <v-toolbar-title>
                <img src="images/logo-with-tick-white.png" height="45" /><br />
                <span style="font-size:13px">Safety Audit &amp; Asset Management</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="title" >{{ clientname }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn  href="/logout" flat><span style="color:white;text-decoration: none">Logout<br /><small>{{ user.name }}</small></span></v-btn>
            </v-toolbar-items>
            
        </v-toolbar>




        <v-content style="padding-top:64px">
            <v-toolbar tile dark flat  color="blue lighten-1" height="84">
                    
                <v-layout row align-center justify-center >
                    <v-flex xs12 sm11 md7>

                   Enter wash data
                            
                    </v-flex>
                </v-layout>

            </v-toolbar>
        
            <v-container>
            
                <v-layout row justify-space-around wrap>
                    <v-flex xs12 sm5 md4>        
                                
                        <v-menu
                            :ref="washdate"
                            :close-on-content-click="false"
                            v-model="datemenu"
                            :nudge-right="80"
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model ="washdate"
                            label="Wash date"
                            
                            append-icon="event"
                            readonly
                            ></v-text-field>

                            <v-date-picker 
                            v-model="washdate" 
                            :reactive="reactive"
                            :landscape="landscape"
                            label="DATE LABEL"
                            
                            
                
                            xno-title
                            light
                            scrollable>  
                            </v-date-picker>
                        </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md4>        
                                
                        
                            <v-text-field
                            
                            :value ="assetId"
                            @input ="assetIdInput"
                            @change="assetIdChange"
                            label="Asset ID"
                            
                            
                            ></v-text-field>

                    </v-flex>

                    <v-flex xs12 text-xs-center>{{ message }}</v-flex>

                </v-layout>
                
                <v-layout row justify-space-around wrap>
                    
                    <v-flex xs12 sm10 md8 >  
                        <p class="title pt-5">Wash list</p>

                        <v-data-table
                            :headers="headers"
                            :items="records"
                            class="elevation-1"
                        >
                            <template slot="items" slot-scope="props" style="color:red">
                                <tr v-bind:class="{'highlight_row': highlightRow(props)}">
                                    <td>{{ props.item.asset_id }}</td>
                                    <!-- <td class="text-xs-right">{{ props.item.description }}</td> -->
                                    <td class="text-xs-left">{{ props.item.washcount }}</td>
                                    <!-- <td class="text-xs-right">{{ props.item.condition }}</td> -->
                                    <td class="text-xs-left">{{ props.item.quarantined }}</td>
                                </tr>
                            </template>
                        </v-data-table>

                    </v-flex>

                </v-layout>



                    
              
            </v-container>
        </v-content>

        <v-footer color="blue" app>
        <span class="white--text">&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clientname: $Clientdata['name'],
            user: $User,
            landscape: true,
            reactive: true,
            datemenu: false,
            washdate: moment().format('YYYY-MM-DD'),
            assetId: null,
            selectedAssetId: null,
            message:'',
            
            // Data table 
            headers: [
                        { text: 'Asset ID', value: 'asset_id' },
                        // { text: 'Description', value: 'asset.description' },
                        {
                            text: 'Wash count',
                            align: 'left',
                            sortable: false,
                            value: 'washcount'
                        },
                        // { text: 'Condition', value: 'condition' },
                        { text: 'Quarantined', value: 'quarantined' },
                        
        
                    ],
            records: [],
            
        }
    },
    methods: {
        highlightRow(props){
            return props.item.quarantined
        },
        assetIdInput(val){
            this.assetId = val

            this.setMessage(val)
        },
        assetIdChange(val){

            if(!val) {
                return
            }

            this.setMessage('Last Asset ID selected: ' + val )

            this.selectedAssetId = this.assetId
            this.assetId = null
            this.save()
        },
        setMessage(msg) {
            this.message = msg
        },
        save() {

            // check asset Id is valid

            const aid = this.selectedAssetId
            this.selectedAssetId=null

            if(!$AssetIds.includes(aid)){
                alert('Invalid assetID entered')
                return
            }

            // Check if already in the wash list for today
            if( _.find(this.records,['asset_id',aid])){
                alert('Wash has already been entered')
                return
            }


            // Okay it is a valid assetId
            const path = '/api/washes';
            const data = {
                asset_id: aid,
                washdate: this.washdate,
            }

            this.setMessage('Asset ID: ' + aid + ' saving wash data ...')

            this.$api.post(path, data, (status,data) => {

                    // console.log('WASH DATA SAVED')

                    // Update records with new one returnd
                    if(data.data == 'success'){
                        this.records = data.records

                        this.setMessage('Asset ID: ' + aid + ' wash data saved')
                    }

                    if(data.data == 'duplicate record'){
                        alert('duplicate wash record detected')
                        this.setMessage('Asset ID: ' + aid + ' wash data, duplicate record not saved')
                    }
                    
                    

                }).catch( (err)=> {
                   
                    console.log('ERR',err)
                    this.setMessage('ERROR ' + err)
                    
                }).then(function () {
                    // always executed
                    // self.saving = false
                })

        },
        load() {

            const path = '/api/washes/' + this.washdate

            this.$api.get(path, (status,data) => {

                    this.records = data.records

                    this.setMessage('Select Wash Date and enter Asset ID of washed item.')

                }).catch( (err)=> {
                   
                    
                        //console.log('Error in washapp.vue load function',err)
                    
                    
                }).then(function () {
                    // always executed
                    // self.saving = false
                })
           
        }
    },
    mounted () {
        this.load()
    },
    watch: {
        'washdate' (to) {
            console.log('Washdate changed to:',this.washdate)
            this.load()
        }
    }
   
}

</script>

<style>
.highlight_row {
    background: #fcc;
}

</style>