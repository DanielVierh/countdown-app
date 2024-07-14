"use strict";

/**
 * 
 * @param {string} headerText 
 * @returns 
 */
export function headerComponent(headerText = '') {
    let header = document.createElement('header');
    header.classList.add('header')

    let h1tag = document.createElement('h1');
    h1tag.innerHTML = `${headerText}`;

    header.appendChild(h1tag);

    return header;
}