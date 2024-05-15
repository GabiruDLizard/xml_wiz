
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
        //sconsole.log(flattenedObject); 
        //loop through the flattened object and replaceelements that would make it confusing to read, 
        //then check for duplicates and store them in the duplicates array
        let befnums = '';
        //let pap = '';
        let pap2 = '';
        let collec = [];
        for(let obj in flattenedObject){
            let pap = '';
            pap = JSON.stringify(obj);
            let num = pap.match(/\d+/g);
            let nums = '';
            for(let n in num){
                nums = nums + ',' + n;
            }
            if(nums == befnums){
                pap = this.duppyClean(pap);
                pap2 = pap2 + "\n" + pap + " " + JSON.stringify(flattenedObject[obj]);
            }
            else{
                collec.push(pap2);
                befnums = nums;
                pap2 = ""
                pap = this.duppyClean(pap);
                pap2 = pap + " " + JSON.stringify(flattenedObject[obj]);

            }
            //console.log(collec);
        }
        collec.push(pap2);
        console.log(collec)
        for(let obj in collec){
            let res = "[ " + collec[obj] + " ]" + "\n"
            if(this.objectsAsString.includes(res)){
                if(!this.duplicates.includes(res)){
                    //let res = "[ " + collec[obj] + " ]"
                    this.duplicates.push(res);
                }
             }
            else{
                this.objectsAsString.push(res);
            } 
        }
        console.log(this.duplicates);
        console.log(this.objectsAsString);
    }
    duppyClean(strin){
        strin = strin.replace(/\.[0-9]+\./g, '.');
            //console.log(pap);
        strin = strin.replace(/\.[0-9]+/g, '.');
        return strin;
    }



 }

 module.exports = RecursorAgent;