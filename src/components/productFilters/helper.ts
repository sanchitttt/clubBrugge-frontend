import { AvailableUnits, MinimumProductDetails } from "../../pages/ProductDetail";

export const generatePossibleSizes = (data: MinimumProductDetails[]) => {
    const map = new Map();
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].availableUnits) {
                for (const property in data[i].availableUnits) {
                    if (!map.has(property)) {
                        const propertyValue = data[i].availableUnits[property as keyof AvailableUnits]
                        if (propertyValue && propertyValue > 0) {
                            map.set(property, true);
                        }
                        else {
                            map.set(property, false);
                        }
                    }
                    else {
                        const propertyValue = data[i].availableUnits[property as keyof AvailableUnits]
                        if (propertyValue && propertyValue > 0) {
                            map.set(property, true);
                        }
                    }
                }
            }
        }
        return Object.fromEntries(map);
    }
    return null;
}


// const generatePossibleColors = (data: FanArticles[]) => {
//     if (data) {
//         const colorsSet = new Set();
//         for (let i = 0; i < data.length; i++) {
//             if (data[i].color) {
//                 for (let j = 0; j < data[i].color.length; j++) {
//                     colorsSet.add(data[i].color[j]);
//                 }
//             }
//         }
//         return Array.from(colorsSet);
//     }
//     return [];
// }