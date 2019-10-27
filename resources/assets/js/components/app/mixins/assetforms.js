export default {
    data() {
        return {
            formdata: {}, // form data
            formschema: [], // form scheme
            valid: true, // form valid flag
            assetIdRules: [v => !!v || 'Asset ID is required'],
            siteRules: [v => !!v || 'Site is required'],
            departmentRules: [this.siteDepartmentRule ],         
            dateMenus: {},// Object keyed by datepicker names 
            showSuccessAlertFlag: false,
            successAlertMessage: '',
            showErrorsAlertFlag: false,
            errorsAlertMessage: '',
            saving: false // xhr save indicator on submit button
        }
    },
    computed: {
        sites() {
            return $Clientdata.sites
        },
        siteDepartments(){
            if (this.formdata.site_id){
                const site = _.find(this.sites,['id',this.formdata.site_id])
                return site.departments
            }
        },
        // conditionOptions() {
        //     return $Refdata.condition_options
        // },
        myRefData() {
            return $Refdata
        }
    },
    methods: {
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}-${month}-${year}`
        },
        siteDepartmentRule(v){
            // if the value is not found in siteDepartments then invalid
            
            let found = _.find(this.siteDepartments,['id',v])
            //console.log('FOUND',!!found)

            return !!found || 'Select a department'
        },
        groupA(s) {
            // return true if input is one of the following
            
            const options = ['v-text-field']
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
        groupD(s) {
            // return true if input is one of the following
            
            const options = ['v-select']
            return options.indexOf(s.input) > -1
           
        },
        getRefdata(key){
            // console.log('Refdata Options Key',key)

            // Could update to check if key is a string of options and if it is then return
            // them as an array

            // But for now we assume key is a key into the global refdata array
            if($Refdata.hasOwnProperty(key)){
                return $Refdata[key]
            }

        },
        getOptions(csv){

            // console.log('CSV',csv)

            let options = []
            if(typeof(csv) !== 'undefined'){
                let items = csv.split(',')          

                items.forEach( function(i){

                    if(i.indexOf(':') != -1){
                        let parts = i.split(':')
                        options.push( {text: parts[0], value: parts[1]} )
                    } else {
                        options.push({text: i, value: i})
                    }
                })
            }
            return options
            
        },
        changed(e,field) {
            // console.log('changed',e,field)
            this.formdata[field]=e
        },
        siteChange(e){
            
            // If current department selected is not in the list of the 
            // current list of site.departments then clear value
            const found = _.find(this.siteDepartments,['id',this.formdata.department_id])
            if(!found)
                this.formdata.department_id = null
        },
        showSuccessMessage(msg){
            this.successAlertMessage = msg
            this.showSuccessAlertFlag = true

            const self = this

            setTimeout(function() {
                self.showSuccessAlertFlag = false
            }, 3000);
        },
        showRequestErrors(data){
            this.showErrorsAlertFlag = true

            // console.log('DATA',data)

            let message = data.message

            // Iterate through error object display object key and explode its array value
            for (var key in data.errors) {
                if (data.errors.hasOwnProperty(key)) {
                    message += "<br />" + data.errors[key].join(',')
                    
                    
                }
            }

            this.errorsAlertMessage = message
        }
    }
}