const deepflat = require('x-deep-flatten-object')

class ExtendedDuplicateSearch{
    constructor(vss){
        this.tagname = vss;
        this.objectsAsString = [];
        this.duplicates = [];
        this.duplicatesLineNum = [];
        this.tagcollec = [];
        this.tagcollecval = [];
    }
    duppyFinder(results){
        //flatten the json object
        const flattenedObject = deepflat.xDeepFlattenObject(results);
        //sconsole.log(flattenedObject); 
        //loop through the flattened object and replaceelements that would make it confusing to read, 
        //then check for duplicates and store them in the duplicates array
        let befnums = '';
        //let pap = '';
        let pap2 = '';
        //let collec = [];
        for(let obj in flattenedObject){
            let pap = '';
            pap = JSON.stringify(obj);
            let num = pap.match(/\d+/g);
            let nums = '';
            // let tagbool = false;
            // let tagval = '';
            
            if(num != null && num.length > 1){
                for(let n = 0; n < num.length - 1; n++){
                    nums = nums + ',' + num[n];
                }
            }
            else if(num != null && num.length == 1){
                    nums = nums + ',' + num[1];
            }
            console.log("nums: " + nums);
            console.log("befnums: " + befnums);

            pap = this.duppyClean(pap);
            pap2 = pap + " " + JSON.stringify(flattenedObject[obj]);
            if(pap.includes("." + this.tagname + ".")){
                if(this.tagcollecval.includes(JSON.stringify(flattenedObject[obj]))){
                    this.duplicates.push(pap2);
                }
                else{
                    this.tagcollecval.push(JSON.stringify(flattenedObject[obj]));
                }
                // tagbool = true;
                // tagval = JSON.stringify(flattenedObject[obj]);
                // this.tagcollecval.push(tagval);
                // if(!this.tagcollec.includes(pap2)){
                //     this.duplicates.push(pap2)
                // }
            }

            // if(nums == befnums){
            //     pap = this.duppyClean(pap);
            //     pap2 = pap + " " + JSON.stringify(flattenedObject[obj]);
            //     if(pap.includes("." + this.tagname + ".")){
            //         tagbool = true;
            //         tagval = JSON.stringify(flattenedObject[obj]);
            //         this.tagcollecval.push(tagval);
            //         if(!this.duplicates.includes(pap2)){
            //             this.duplicates.push(pap2)
            //         }
            //     }
            // }
            // else{
            //     if(tagbool == true){
            //         tagbool = false;
            //     }
            //     collec.push(pap2);
            //     befnums = nums;
            //     pap2 = ""
            //     pap = this.duppyClean(pap);
            //     pap2 = pap + " " + JSON.stringify(flattenedObject[obj]);

            
            //console.log(collec);
         }
        // collec.push(pap2);
        // console.log(collec)
        // for(let obj in collec){
        //     if(obj.includes("." + this.tagname + ".")){
        //         if(this.tagcollec.includes )
        //     }
        // }
        // for(let obj in collec){
        //     let res = "[ " + collec[obj] + " ]" + "\n"
        //     if(this.objectsAsString.includes(res)){
        //         if(!this.duplicates.includes(res)){
        //             //let res = "[ " + collec[obj] + " ]"
        //             this.duplicates.push(res);
        //         }
        //      }
        //     else{
        //         this.objectsAsString.push(res);
        //     } 
        // }
        console.log(this.duplicates);
        console.log(this.objectsAsString);
    }
    duppyClean(strin){
        strin = strin.replace(/\.[0-9]+\./g, '.');
            //console.log(pap);
        strin = strin.replace(/\.[0-9]+/g, '.');
        return strin;
    }
    // weWork(){
    //     console.log(this.tagname);
    // }
    
}

module.exports = ExtendedDuplicateSearch;