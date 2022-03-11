const { element } = require("protractor");

/**
 * Description
 * @param {any} orgDomain
 * @param {any} teamName
 * @return {any}
 */
 exports.setDefaultLabelProperties = function(type, statusLabels, priorityLabels, difficultyLabels) {
    let color;
    let scope;
    let matIcon;

    type.forEach(element => {
        console.log(element);
        const data = getLabelProperty(element);
          color=data.Color;
          matIcon=data.MatIcon
        setLabelProperties(element,matIcon,color,scope)
    }); 
    statusLabels.forEach(element => {
        console.log(element);
        setLabelProperties(element,matIcon,color,scope)
    }); 
    priorityLabels.forEach(element => {
        console.log(element);
        setLabelProperties(element,matIcon,color,scope)
    }); 
    difficultyLabels.forEach(element => {
        console.log(element);
        setLabelProperties(element,matIcon,color,scope)
    }); 
};

const highData={
    Color:"#ff0000",
    MatIcon:"keyboard_arrow_up"
};
const mediumData={
    Color:"#EF6C00",
    MatIcon:"sync_alt"
};
const lowData={
    Color:"#42a5f5",
    MatIcon:"keyboard_arrow_down"
};
const iceBoxData={
    Color:"#42a5f5",
    MatIcon:"inventory_2"
};
const readyToStartData={
    Color:"#673ab7",
    MatIcon:"not_started"
};
const underProgress={
    Color:"#fc6a03",
    MatIcon:"arrow_circle_up"
};
const blockedData={
    Color:"#42a5f5",
    MatIcon:"block"
};
const completedData={
    Color:"#00ff00;",
    MatIcon:"check_circle_outline"
};

getLabelProperty = function(element) {
    if (element==="High") {
        return highData;
    }
    else if (element==="Medium") {
        return mediumData;
    }
    else if (element==="Low") {
        return lowData;
    }
    else if (element==="Ice Box") {
        return iceBoxData;
    }
    else if (element==="Ready to start") {
        return readyToStartData;
    }
    else if (element==="Under Progress") {
        return underProgress;
    } 
    else if (element==="Blocked") {
        return blockedData;
    }
    else if (element==="Completed") {
        return completedData;
    }
}


