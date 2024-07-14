"use strict";

//*-------------------------------------------
//*ANCHOR - saveIntoStore
//*-------------------------------------------
/**
 * Save Data into Local Storage
 * @param {object} storedObject - The object which should be stored like an array or an object
 * @param {string} storedKey - The Name of the .
 * @returns {string} Returns success message
 */
export function saveIntoStore(storedObject, storedKey ) {
    localStorage.setItem(storedKey, JSON.stringify(storedObject));
}


//*-------------------------------------------
//*ANCHOR - loadFromStore
//*-------------------------------------------
/**
 * Save Data into Local Storage
 * @param {object} storedObject - The object which should be stored like an array or an object
 * @param {string} storedKey - The Name of the Local Storage Key
 * @returns {string} Returns success message
 */
export function loadFromStore(storedObject, storedKey ) {

    if (localStorage.getItem(storedKey) !== null) {
        try {
            storedObject = JSON.parse(
                localStorage.getItem(storedKey),
            );
            console.log('Success');
            console.log('storedObject', storedObject);
           
        } catch (error) {
            console.log(error);
        }
    }else {
        console.log(`${storedKey} besitzt noch keinen Wert`);
    }
}