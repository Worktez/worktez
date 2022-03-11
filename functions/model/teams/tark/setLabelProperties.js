const { element } = require("protractor");
const { setDefaultLabelProperties } = require("./setDefaultLabels");

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @return {any}
 */
exports.setLabelProperties = function(type, statusLabels, priorityLabels, difficultyLabels) {
    let color;
    let scope;
    let matIcon;

const p1= setDefaultLabelProperties(type, statusLabels,
   priorityLabels, difficultyLabels).then((labelData)=>{
   let docId="";
   if (labelData) {
       let labelcounter=labelData.LabelCounter;
       labelcounter = labelcounter+1;
       docId="L" + labelcounter
        
       updateUserInputJson = {
           Labelcounter: labelcounter,
       };
   }
})  
};
