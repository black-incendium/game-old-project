import { debug } from './debug/debug.js';

let elements = (()=>{

    let canvas = null;
    let ctx = null;

    function initialize() {

        canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.fillRect(100,100,500,500)
    }

    initialize();

    return {
        canvas,
        ctx
    }
})();

export { elements };