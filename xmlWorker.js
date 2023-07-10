const {XMLBuilder, XMLValidator} = require("fast-xml-parser");

class XmlWorker{

    // parseXML(info){
    //     const builder = new XMLBuilder();
    //     //const obj = JSON.parse(info);
    //     const xmlContent = builder.build(info);
    //     console.log(info);
    //     return info;
    // }

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

// const builder = new XMLBuilder();

// function parseXML(info){
//     const obj = JSON.parse(info);
//     const xmlContent = builder.build(obj);
//     return xmlContent;
// }

// function validateXML(content){
//     const result = XMLValidator.validate(content, {
//         allowBooleanAttributes: true
//     });
//     return result;
// }

// function XMLoperater(words){
//     const xmlcontent = parseXML(words);
//     if(validateXML(xmlcontent)){
//         console.log(validateXML(xmlcontent));
//     }
//     else{
//         console.log(validateXML(xmlcontent));
//         return validateXML(xmlcontent);
//     }
// }

// export {XMLoperater};
