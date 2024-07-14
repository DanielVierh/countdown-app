"use strict";

export class Countdown {

    /**
     * 
     * @param {string} event 
     * @param {string} deadline 
     * @param {string} uid - Unique ID - external function 
     */

    constructor(event, deadline, uid) {
        this.event = event;
        this.deadline = deadline;
        this.uid = uid;
    }
}