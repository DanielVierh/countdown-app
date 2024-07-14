"use strict";

import { splitVal, addZeroUnderTen, createUID } from './modules/helperFunctions.js'
import { saveIntoStore, loadFromStore } from "./modules/store.js";
import { Countdown } from './classes/Countdown.js';


//*ANCHOR - Variables
let countdowns = [];


//*ANCHOR - Init

window.onload = init()

function init() {

    loadFromStore(countdowns, 'stored_countdowns')

    



}