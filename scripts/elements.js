import { debug } from './debug/debug.js';

let elements = (()=>{

    let canvas = null;
    let ctx = null;

    function initialize() {

        canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');
    }

    initialize();

    return Object.freeze({
        get canvas() {
            return canvas;
        },

        get ctx() {
            return ctx;
        }
    });
})();

export { elements };