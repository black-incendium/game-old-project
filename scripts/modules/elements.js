import { debug } from './../debug/debug.js';

let elements = (()=>{

    let canvas = null, ctx = null, initialized = false;

    function initialize(){

        if (initialized) { 

            debug.print('you are trying to initialize already initialized element'); 
            return;
        }

        initialized = true;

        canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.fillRect(100,100,500,500)
    }

    return {
        initialize
    }
})();

export {elements};