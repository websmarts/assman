<template>  
    <div>

        <v-form ref="auditform">
            <v-container>
            <v-layout row wrap>
                
                
                

                <v-flex  v-for="s in formschema" :key="s.name" xs12 >


                        <template v-if="groupA(s)">
                            <v-flex xs12>   
                                <component 
                                    
                                    :is="s.input" 
                                    :label="s.label"
                                    :rules="s.rules"
                                    :readonly="s.readonly"
                                    :value="formdata[s.name]"
                            
                                    @change="changed($event,s.name)"
                                    light
                                ></component>
                            </v-flex>
                        </template>

                        <template v-if="groupD(s)">
                            <v-flex xs12>   
                                <component 
                                    
                                    :is="s.input" 
                                    :label="s.label"
                                    :rules="s.rules"
                                    :readonly="s.readonly"
                                    :value="formdata[s.name]"
                                    :items="getOptions(s.options)"
                                    @change="changed($event,s.name)"
                                    light
                                ></component>
                            </v-flex>
                        </template>

                        <template v-if="groupB(s)"><!-- datepickers -->
                            <v-flex xs12 sm6 md4>
                                
                            <v-menu
                                :ref="s.name"
                                :close-on-content-click="false"
                                v-model="dateMenus[s.name]"
                                :nudge-right="80"
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                            >
                                <v-text-field
                                slot="activator"
                                :value ="formatDate(formdata[s.name])"
                                :label="s.label"
                                :rules = "s.rules"  
                                append-icon="event"
                                readonly
                                ></v-text-field>

                                <v-date-picker 
                                v-model="formdata[s.name]" 
                                :label="s.label"
                                :rules="s.rules"
                                :readonly="s.readonly"
                    
                                no-title
                                light
                                scrollable>  
                                </v-date-picker>
                            </v-menu>
                            </v-flex>
                        </template>

                        <template v-if="groupC(s)"><!-- switches -->
                            <v-flex xs12>   
                                <component 
                                    v-model="formdata[s.name]"
                                    :is="s.input" 
                                    :label="s.label"
                                    :rules="s.rules"
                                    :readonly="s.readonly"
                                    
                                    @change="changed($event,s.name)"
                                    light
                                ></component>
                            </v-flex>
                        </template>

                    </v-flex>

                <v-btn
                    :disabled="!valid"
                    @click="submit"
                    >
                    submit
                </v-btn>
                <!-- <v-btn @click="clear">clear</v-btn>
                <v-btn @click="load">reset</v-btn> -->

                <v-flex xs12>
                            <v-alert
                            v-model="showSuccessAlertFlag"
                            outline
                            dismissible
                            type="success"
                            >
                            {{ successAlertMessage }}
                            </v-alert>

                            <div style="background:red; padding:15px; color:#fff" v-show="showErrorsAlertFlag" >
                                <div  v-html="errorsAlertMessage"></div>
                                    <v-btn @click="showErrorsAlertFlag = false">Close</v-btn>
                            </div>

                            

                    </v-flex>
            </v-layout>
        </v-container>
        </v-form>
        
    </div>

</template>

<script>

const formValidator = require('./lib/validatorClass') ;
import assetforms from './mixins/assetforms.js';
import { EventBus } from './lib/eventbus.js';

export default {
    mixins:[assetforms],
    props: ['asset'],
    data() {
        return {
            
            dateMenus: { // flags for datepicker popups
                audit_date: false,
            },
                 
                  
        }
    },
    computed: {
        
    },
    methods: {
        
        
        
        submit () {


            if (this.$refs.auditform.validate()) {

                let self=this

                self.saving = true
                
                
                const path = '/api/audit'

                let data = this.formdata
                data['asset_id'] = this.asset['asset_id']

                this.$api.post(path, data, (status,data) => {

                    // emit event to update the list of audits
                    EventBus.$emit('newAudit')

                    this.showSuccessMessage('Audit has been saved')

                }).catch( (err)=> {
                   
                    
                        this.showRequestErrors(err.response.data)
                    
                    
                }).then(function () {
                    // always executed
                    self.saving = false
                })


            }

            
        },

        clear () {
            
            this.formdata = Object.assign({}, {}, {})
            this.$refs.auditform.resetValidation()
            // this.$nextTick( function() {
            //     this.$refs.form.reset()
            // })
            this.showSuccessAlertFlag = false
            this.successAlertMessage=''
        },
        
        load () {
            let self = this
            
            this.clear()

            let assetdata = {}
           

            
            let extractKeys = ['barcode','condition','quarantined','retire_from_service']
            _.each(extractKeys, function(key){
                 assetdata[key] =  _.clone(self.asset[key])
            })

            // console.log('cleaned clone',assetdata)

            // retrieve and remove assettype data from asset
            let assettype = this.asset.assettype
            
            
            // Set schema to assets auditschema
            let schema = assettype.auditschema 
            let datakeys = _.map(schema,'name')

            // add datakeys that are NOT already in assetdata
            _.each(datakeys, function(key){
                if(!assetdata.hasOwnProperty(key)){     
                    assetdata[key] = null       
                }
            })

            
            //  set the dafault value for audit date 
            let now = new Date()
            let today = now.toISOString().substring(0,10) // YYYY-mm-dd
           

            assetdata.audit_date = today

            // Set the logged in user as one of the  Auditors
            assetdata['auditors'] = $Refdata.user.name

            // console.log('ASSETDATA',assetdata)

            self.formdata = Object.assign({},assetdata)
            
            // Setup the formschema with the laravel rules converted to local rules
            const validator = new formValidator(self.formdata,schema)
            self.formschema =  validator.schema_with_rules        

        }
    },
    watch: {
        'asset' (to, from) {
        // react to route changes...

        // Ajax load latest data from server for asset ....
        // console.log('audit asset updated to: ',to)
        // this.formdata.description = 'my description for ' + this.barcode;
        // this.formdata.notes = 'my notes for barcode ' + this.barcode;
        this.load()

        

        }
    },
    mounted() {
        // console.log('Asset Audit Mounted - Audit asset',this.asset)
        //this.load()
    }
}

</script>