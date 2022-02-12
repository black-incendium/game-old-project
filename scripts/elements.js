import { debug } from './debug/debug.js';

let elements = (()=>{

    const gl = {};

    function initialize() {

        gl.canvas = document.querySelector('canvas');
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;

        gl.ctx = canvas.getContext('2d');
        gl.ctx.fillStyle = "red";
        gl.ctx.fillRect(100,100,500,500);
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