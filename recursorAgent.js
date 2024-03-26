
const deepflat = require('x-deep-flatten-object')
 
 class RecursorAgent{
    constructor(){
        this.objectsAsString = [];
        this.duplicates = [];
    }

    duppyFinder(results){
        const flattenedObject = deepflat.xDeepFlattenObject(results);
        for(let obj in flattenedObject){
            let pap = "";
            pap = JSON.stringify(obj)
            //console.log(pap);
            pap = pap.replace(/\.[0-9]+\./g, '.');
            //console.log(pap);
            pap = pap.replace(/\.[0-9]+/g, '.');
            //console.log(pap);
            pap = pap + " " + JSON.stringify(flattenedObject[obj]);
            if(this.objectsAsString.includes(pap)){
                this.duplicates.push(pap);
            }
            else{
                this.objectsAsString.push(pap);
            } 
        }
    }



 }

 module.exports = RecursorAgent;