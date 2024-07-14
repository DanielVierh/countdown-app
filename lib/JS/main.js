"use strict";

import { splitVal, addZeroUnderTen, createUID } from './modules/helperFunctions.js'
import { saveIntoStore, loadFromStore } from "./modules/store.js";
import { Countdown } from './classes/Countdown.js';
import { headerComponent } from './components/header.js';


//*ANCHOR - Variables
const app = document.getElementById('app');
let countdowns = [];

app.appendChild(headerComponent('Countdown App'));


//*ANCHOR - Init

window.onload = init()

function init() {

    loadFromStore(countdowns, 'stored_countdowns')





}