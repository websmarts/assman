<template>  
    <div>

        <v-form ref="form" v-model="valid">
            <v-container>
                <v-layout row wrap>
                   
                    <v-flex xs12>
                        <v-text-field label="Asset ID" :value="formdata.asset_id"  :disabled=true></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                            v-model="formdata.site_id"
                            :items="sites"
                            :rules="siteRules"
                            item-text="name"
                            item-value="id"
                            label="Site"
                            @change="siteChange"
                        ></v-select>
                    </v-flex>

                    <v-flex xs12>

                        <v-select
                            v-model="formdata.department_id"
                            :items="siteDepartments"
                            :rules="departmentRules"
                            item-text="name"
                            item-value="id"
                            label="Department"
                        ></v-select>
                    </v-flex>

                   

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
                        :xdisabled="!valid"
                        :loading="xhr_loading"
                        @click="submit"
                        >
                        Save
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


import store from './lib/store';



export default {
    props: ['asset'],
    mixins: [assetforms],
    data() {
        return {
            store: store
        }
    },
    computed: {
        xhr_loading() {
            return this.store.isActive()
        }
    },
    methods: {
        submit () {
            if (1 || this.$refs.form.validate()) {
                // Native form submission is not yet supported
                // console.log('Form is valid and I am submitting it now with this data',this.data)

                const formdata = this.formdata
                const path = '/api/asset/'+ this.asset.asset_id

                

                this.$api.put(path, formdata, (status,data) => {
                    this.showSuccessMessage('Asset data has been saved')
                }).catch( (err)=> {
                    this.showRequestErrors(err.response.data)
                })
     
            }
        },
        

        clear () {
            
            this.formdata = Object.assign({}, {}, {})
            //this.$refs.form.resetValidation() // resets just the validation messages
            this.showSuccessAlertFlag = false
            this.successAlertMessage=''
        },
        
        load () {
            let self = this
            
            this.clear()
         
            // Remove keys that are not used in the formdata
            let assetdata = _.clone(this.asset) 
            delete assetdata.assettype
            delete assetdata.audits
            delete assetdata.meta

            
            let assettype = this.asset.assettype

            let metadata = this.asset.meta
            
            
            // Combine the core schema with any metaschema
            let schema = assettype.dataschema.concat(assettype.metaschema)

            // setup the datepicker v-menus data property            
            let datepickers = _.filter(schema,{'input': 'v-date-picker'})
            let dateMenus ={}
            _.each(datepickers, function(p){
                dateMenus[p.name]=false
            })
             
            // Setup formdata object by combining the core asset data Obj and the asset meta data Obj
            //self.formdata = Object.assign({})
            self.formdata = Object.assign({},assetdata,metadata)
            //console.log('FORMDATA',self.formdata)

            
            // Setup the formschema with the laravel rules converted to local rules
            const validator = new formValidator(self.formdata,schema)
            //console.log('Assigning formschema :',validator.schema_with_rules)
            //self.formschema = Object.assign({})
            self.formschema = Object.assign({},validator.schema_with_rules) 

            //this.$forceUpdate()
                           

        }
    },
    watch: {
        asset: function (to, from) {
        // react to route changes...

        
        this.load()

        

        }
    },
    mounted() {
              
    }
}

</script>