//Please pay this no mind. This file is depracated and I plan on removing it soon.


const xmlQuery = require('xml-query');
const XmlReader = require('xml-reader');

//const map = new Map();
const res = [];

class duplicateFinder{
    
    constructor(validXML){
        this.data = XmlReader.parseSync(validXML);
        this.map = new Map();
        this.res = [];
        this.collectionstr = [];
    }
    lookatval(){
        xmlQuery(this.data).each(node => console.log(node.children.length));
        //xmlQuery(this.data).each(node => this.recurseBuddy(node.children));
        //this.recurseBuddy(this.data);
        this.iteraterBuddy();
        
    }
    recurseBuddy(saml){
        //console.log(saml.children.length);
        if(saml.children.length != 0){
            //const myJSON = JSON.stringify(saml);
            if(this.map.has(saml)){
                this.map.set(saml, this.map.get(saml) + 1);
            }
            else{
               this.map.set(saml, 1);
            }
            console.log('not yet');
            saml.children.forEach(node => this.recurseBuddy(node));
           
        } 
        else{
            console.log(this.map.size);
        }
        
        //console.log(this.map);
    }
    async iteraterBuddy(){
        await this.recurseBuddy(this.data);
        console.log(this.map);
        this.fubbyMain();
        
        // this.map.forEach(function(value, key) {
            
        //     if(value > 1){
        //         console.log('no');
        //         this.res.push(key);
        //     };
        // })
        // // for (let [key, value] of map) {
        // //     if(value > 1){
        // //         res.push(key);
        // //     };
        // // }
        // console.log(this.res);
    }
    fubbyMain(){
        console.log("im in fubby main now");
        for(const property in this.map){
            var str = "";
            this.fubby(property, str);
            console.log("sent");
        }
    }
    fubby(maps, strs){
        for(key in maps) {
            if(key.type == 'element'){
                strs = strs + key.name;
                console.log(strs);
                fubby(key.children, strs);
            }
            else if(key.type == 'text'){
                strs = strs + key.value;
                console.log(strs);
            }
        }
    }

}



module.exports = duplicateFinder;