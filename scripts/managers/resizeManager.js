import { elements } from './../elements.js';
import { cameraManager } from './cameraManager.js';
import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for making changes needed when game is resized
 * 
 * @author black-incendium
 */

 let resizeManager = (() => {

    let callbacks = null;
    let gameSize = {};
    let gameAspectRatio = {
        width: 16,
        height: 9
    }

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        resizeCanvas();
    }

    function setupCallbacks() {

        callbacks = {
            gameResized: resizeCanvas
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('userInput', 'resize', callbacks.gameResized);
    }

    // function gameResized({width, height}) {

    //     // elements.canvas.width = width;
    //     // elements.canvas.height = height;
    // }

    function resizeCanvas() {

        if (window.innerWidth/window.innerHeight > gameAspectRatio.width/gameAspectRatio.height) {
            
            gameSize.width = window.innerHeight/gameAspectRatio.height*gameAspectRatio.width//*window.devicePixelRatio;
            gameSize.height = window.innerHeight//*window.devicePixelRatio
        } else {
            
            gameSize.width = window.innerWidth//*window.devicePixelRatio;
            gameSize.height = window.innerWidth/gameAspectRatio.width*gameAspectRatio.height//*window.devicePixelRatio
        }

        elements.canvas.width = gameSize.width;
        elements.canvas.height = gameSize.height;
        // elements.canvas.style.transform = `translate(-50%,-50%) scale(${1/window.devicePixelRatio})`;
        elements.ctx.imageSmoothingEnabled = false;
        elements.ctx.translate(-0.5, -0.5)
    }

    return Object.freeze({
        
        initialize,

        get gameSize() {
            return gameSize;
        },
    });
})();

export { resizeManager };