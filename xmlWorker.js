const {XMLBuilder, XMLValidator} = require("fast-xml-parser");

class XmlWorker{

    validateXML(content){
        var result;
        try{
            result = XMLValidator.validate(content, {
                allowBooleanAttributes: true
            });
        }
        catch(error){
            return error;
        }
        
        return result;
    }

    XMLoperater(words){
        const xmlcontent = this.validateXML(words);
        if(xmlcontent == true){
            return words;
        }
        else{
            console.log(xmlcontent);
            return false;
        }
    }
}

module.exports = XmlWorker; 