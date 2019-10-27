export default function(form,field,rule)   {
    console.log('formdata',form.formdata)

    switch(rule.key){
        case 'required':
            return function (v) {
                        console.log(field)
                        console.log(v)
                        return !!v || field.label + ' is required'
                    } 
                    break;
        case 'min':
            return function (v) {
                        console.log(field)
                        console.log(v)
                        return v.length >= rule.length || field.label + ' must be more than or equal to ' + rule.length + ' characters'
                    } 
                    break;
                

        case 'max':
            return function (v) {
                        console.log(field)
                        console.log(v)
                        return v.length <= rule.length || field.label + ' must be less than  ' + rule.length + ' characters'
                    } 
                    break;
    

    }



}
    
