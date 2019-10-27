<template>  
    <div>

        <v-form ref="form">
            <v-container>
                <v-layout row wrap>
                   
                    <v-flex xs12>
                        <v-text-field label="Barcode" :value="data.barcode" readonly ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-select
                            v-model="data.site_id"
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
                            v-model="data.department_id"
                            :items="siteDepartments"
                            :rules="departmentRules"
                            item-text="name"
                            item-value="id"
                            label="Department"
                        ></v-select>
                    </v-flex>

                   

                    <v-flex  v-for="s in schema" :key="s.name" xs12 >

                        <template v-if="groupA(s)">
                            <v-flex xs12>   
                                <component 
                                    
                                    :is="s.input" 
                                    :label="s.label"
                                    :rules="s.rules"
                                    :readonly="s.readonly"
                                    :value="data[s.name]"
                                    :items="getOptions(s.items)"
                                    @change="changed($event,s.name)"
                                    light
                                ></component>
                            </v-flex>
                        </template>

                        <template v-if="groupB(s)">
                            <v-layout row wrap align-left>
                            <v-flex xs2 >{{s.label}}</v-flex>
                            <v-flex xs10>  
                                <component 
                                    v-model="data[s.name]"
                                    :is="s.input" 
                                    :label="s.label"
                                    :rules="s.rules"
                                    :readonly="s.readonly"
                                    :value="data[s.name]"
                                    :reactive="s.reactive"
                                    :landscape="s.landscape"
                                    color="green"
                                    light
                                ></component>
                            </v-flex>
                            </v-layout>
                        </template>

                        <template v-if="groupC(s)">
                            <v-flex xs12>   
                                <component 
                                    v-model="data[s.name]"
                                    :is="s.input" 
                                    :label="s.label"
                                    :rules="s.rules"
                                    :readonly="s.readonly"
                                    :value="data[s.name]"
                                    :items="getOptions(s.items)"
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
                    <v-btn @click="clear">clear</v-btn>
                    <v-btn @click="load">reset</v-btn>

                    <v-flex xs12>
                             <v-alert
                            :value="showSuccessAlertFlag"
                            dismissible
                            type="success"
                            >
                            {{ successAlertMessage }}
                            </v-alert>

                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>

</template>

<script>

const myValidator = require('./myValidatorClass') ;


export default {
    props: ['barcode'],
    data() {
        return {
            
            valid: true,
            
            siteRules: [v => !!v || 'Site is required'],
            departmentRules: [v => !!v || 'Department is required'],
            data: {},
            schema: [],
            sites: clientdata.sites, 
            showSuccessAlertFlag: false,
            successAlertMessage: ''        
        }
    },
    computed: {
        siteDepartments(){
            if (this.data.site_id){
                const site = _.find(clientdata.sites,['id',this.data.site_id])
                return site.departments
            }
        },
        conditionOptions() {
            return refdata.condition_options
        },
        myRefData() {
            return refdata
        }
    },
    methods: {
        groupA(s) {
            // return true if input is one of the following
            
            const options = ['v-text-field','v-select']
            return options.indexOf(s.input) > -1
           
        },
        groupB(s) {
            
            const options = ['v-date-picker']
            return options.indexOf(s.input) > -1

        },
        groupC(s) {
            const options = ['v-switch']
            return options.indexOf(s.input) > -1
        },
        getOptions(key){
            console.log('Refdata Options Key',key)

            // Could update to check if key is a string of options and if it is then return
            // them as an array

            // But for now we assume key is a key into the global refdata array
            if(refdata.hasOwnProperty(key)){
                return refdata[key]
            }

        },
        changed(e,field) {
            console.log('changed',e,field)
            this.data[field]=e
        },
        siteChange(e){
            
            // If current department selected is not in the list of the 
            // current list of site.departments then clear value
            const found = _.find(this.siteDepartments,['id',this.data.department_id])
            if(!found)
                this.data.department_id = null
        },
        submit () {
            if (this.$refs.form.validate()) {
            // Native form submission is not yet supported
            console.log('Form is valid and I am submitting it now with this data',this.data)

            const data = this.data
            data._method = "PUT"

            let self=this

            axios.post('/api/asset/'+ this.barcode, this.data)
            .then(function (response) {
                // handle success
                 console.log(response.data);
                 self.successAlertMessage = 'Record update successful'
                 self.showSuccessAlertFlag = true
                
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
            }
        },

        clear () {
            
            this.data = Object.assign({}, {}, {})
            this.$refs.form.reset()
            // this.$nextTick( function() {
            //     this.$refs.form.reset()
            // })
            this.showSuccessAlertFlag = false
            this.successAlertMessage=''
        },
        
        load () {
            let self = this
            
            this.clear()

            axios.get('/api/asset/'+ this.barcode)
            .then(function (response) {
                // handle success
                // console.log(response.data);
                self.data = response.data.data

                // Pass data and schema the validator 
                const validator = new myValidator(self.data,response.data.dataschema)

                // Get the schema with the laravel rules converted to local rules
                self.schema =  validator.schema_with_rules
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        }
    },
    watch: {
        'barcode' (to, from) {
        // react to route changes...

        // Ajax load latest data from server for asset ....
        console.log('barcode updated to: ',to)
        // this.formdata.description = 'my description for ' + this.barcode;
        // this.formdata.notes = 'my notes for barcode ' + this.barcode;
        this.load()

        

        }
    },
    mounted() {
        this.load()
    }
}

</script>