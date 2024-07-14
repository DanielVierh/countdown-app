"use strict";

import { splitVal, addZeroUnderTen, createUID } from './modules/helperFunctions.js'
import { saveIntoStore, loadFromStore } from "./modules/store.js";
import { Countdown } from './classes/Countdown.js';
import { headerComponent } from './components/header.js';


//* Components
const new_countdown = document.getElementById('new_countdown');


//*ANCHOR - Variables
const header = document.getElementById('header');
let countdowns = [];

header.appendChild(headerComponent('Countdown App'));


//*ANCHOR - Init
window.onload = init()

function init() {

    loadFromStore(countdowns, 'stored_countdowns');

    const testCountdown = new Countdown('Testevent', '', createUID(32));



}




//*ANCHOR - Event Listener

new_countdown.addEventListener('click', ()=> {
    console.log('NEW COuntdown');

})