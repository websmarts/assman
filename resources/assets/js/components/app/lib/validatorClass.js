class myValidator {

    constructor(formdata,schema) {
        this.formdata = formdata;

       
        this.schema = schema;
        this.process();
        
    }

    get schema_with_rules() {
        return this.schema;
    }
    
    

    process() { // convert laravel rules to v-form rules

        const makeRule = this.makeRule;


        this.schema.forEach( function(obj, index){

            
            if(!obj.hasOwnProperty('rules') || obj.rules.length < 1){
                // no rules property OR invalid string
                obj.rules = [];   
            } else {

                const rulesStr = obj.rules; // capture rules string
                
                obj.rules = [];  // init object rules array

                // check for nullable
                let nullable = false
                if (/nullable/.exec(rulesStr)){                      
                    nullable = true
                }


                // check for required
                if (/required/.exec(rulesStr)){                      
                    obj.rules.push(makeRule( obj,{key:'required'}, nullable))
                }

                 // check for numeric
                 if (/numeric/.exec(rulesStr)){                      
                    obj.rules.push(makeRule( obj,{key:'numeric'},nullable))
                }

                // check for min
                const minResult = /min:(\d+)/.exec(rulesStr)
                if ( minResult && minResult[1] > 0 ) {                      
                    obj.rules.push( makeRule(obj,{key:'min',length:minResult[1]}) )
                }

                //check for max
                const maxResult = /max:(\d+)/.exec(rulesStr)      
                    if ( maxResult && maxResult[1] ) {                      
                        obj.rules.push(makeRule(obj, {key:'max',length: maxResult[1]}) )
                }

                
                
            }

        });     

    }

    
    makeRule(field,rule,nullable = false)   {

        switch(rule.key){
            case 'required':
                return function (v) {
                            return !!v || field.label + ' is required'
                        } 
                        break;
            case 'min':
                return function (v) {
                            if(typeof v ==='undefined'){
                                return false;
                            }
                            
                            return  v.length >= rule.length || field.label + ' must be more than or equal to ' + rule.length + ' characters'
                        } 
                        break;
                    

            case 'max':
                return function (v) {
                        if(typeof v ==='undefined'){
                            return false;
                        }
                            return v.length <= rule.length || field.label + ' must be less than  ' + rule.length + ' characters'
                        } 
                        break;

            case 'numeric':
            return function (v) {
                    if(typeof v ==='undefined'){
                        return nullable; // can be blank if nullable
                    }
                        return !isNaN(v) || field.label + ' may only contain numbers'
                    } 
                    break;
        

        }
    }

    



    
}

module.exports = myValidator;
    
