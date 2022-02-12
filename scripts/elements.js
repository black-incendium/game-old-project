import { debug } from './debug/debug.js';

let elements = (()=>{

    const gl = {};

    function initialize() {

        gl.canvas = document.querySelector('canvas');
        gl.ctx = gl.canvas.getContext('2d');
    }

    initialize();

    return {
        get canvas() {
            return gl.canvas;
        },

        get ctx() {
            return gl.ctx;
        }
    }
})();

Object.freeze(elements);

export { elements };