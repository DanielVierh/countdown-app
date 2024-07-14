"use strict";

//*-------------------------------------------
//*ANCHOR - splitVal
//*-------------------------------------------
/**
 * 
 * @param {string} val 
 * @param {String} marker 
 * @param {Number} pos 
 * @returns String
 */

export function splitVal(val, marker, pos) {
    const elem = val.split(marker);
    const retVal = elem[pos];
    return retVal;
}


//*-------------------------------------------
//*ANCHOR - addZeroUnderTen
//*-------------------------------------------

/**
 * Takes a number and add a 0 if number is under ten
 * @param {number} val 
 * @returns string
 */
export function addZeroUnderTen(val) {
    if(val < 10)  {
        val = "0" + val;
    }
    if(val <= 0) {
        val = "00";
    }
    return val;
}


//*-------------------------------------------
//*ANCHOR - UID
//*-------------------------------------------
/**
 * Creates a unique id 
 * @param {number} length - length of the uid exmpl 32
 * @returns uid as string 
 */
export function createUID(length = 16) {
    const charArray = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','F','G','H','A', 'B', 'C'];
    let uniqueID = '';

    for(let i = 1; i <= length; i++) {
        const randomNumber = Math.floor(Math.random() * charArray.length);
        uniqueID = uniqueID += charArray[randomNumber];
    }
    return uniqueID
}
