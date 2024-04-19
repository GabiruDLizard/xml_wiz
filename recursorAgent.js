
const deepflat = require('x-deep-flatten-object')
 
 class RecursorAgent{
    constructor(){
        this.objectsAsString = [];
        this.duplicates = [];
        this.duplicatesLineNum = [];
    }

    //this method flattens the joson object and places it in a readable format with regular expressions
    duppyFinder(results){
        //flatten the json object
        const flattenedObject = deepflat.xDeepFlattenObject(results);
        console.log(flattenedObject); 
        //loop through the flattened object and replaceelements that would make it confusing to read, 
        //then check for duplicates and store them in the duplicates array
        for(let obj in flattenedObject){
            let pap = "";
            pap = JSON.stringify(obj)
            //console.log(pap);
            pap = pap.replace(/\.[0-9]+\./g, '.');
            //console.log(pap);
            pap = pap.replace(/\.[0-9]+/g, '.');
            //console.log(pap);
            pap = pap + " " + JSON.stringify(flattenedObject[obj]);
            //if the objects as string array already includes the duplicate we check if the duplicates 
            //array does as well and if not we push the duplicate to the duplicates array.
            if(this.objectsAsString.includes(pap)){
                if(!this.duplicates.includes(pap)){
                    this.duplicates.push(pap);
                }
            }
            else{
                this.objectsAsString.push(pap);
            } 
        }
    }



 }

 module.exports = RecursorAgent;