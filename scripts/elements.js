import { debug } from './debug/debug.js';

/**
 * @fileoverview object that contains references to DOM elements and other things like canvas drawing context
 * 
 * @author black-incendium
 */

let elements = (()=>{

    let canvas = null;
    let ctx = null;

    function initialize() {

        canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');
    }

    initialize();

    return Object.freeze({
        canvas,
        ctx
    });
})();

export { elements };