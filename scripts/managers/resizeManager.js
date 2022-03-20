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
        width: 4,
        height: 3
    }

    let canvasPosition = {
        x: 0,
        y: 0
    }

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();
    }

    function setupCallbacks() {

        callbacks = {
            gameResized
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('userInput', 'resize', callbacks.gameResized);
    }

    // function gameResized({width, height}) {

    //     // elements.canvas.width = width;
    //     // elements.canvas.height = height;
    // }

    function gameResized() {

        if (window.innerWidth/window.innerHeight > gameAspectRatio.width/gameAspectRatio.height) {
            
            gameSize.width = window.innerHeight/gameAspectRatio.height*gameAspectRatio.width;
            gameSize.height = window.innerHeight
        } else {
            
            gameSize.width = window.innerWidth;
            gameSize.height = window.innerWidth/gameAspectRatio.width*gameAspectRatio.height
        }

        elements.canvas.width = gameSize.width;
        elements.canvas.height = gameSize.height;
        elements.ctx.imageSmoothingEnabled = false;
        // elements.ctx.translate(-0.5, -0.5)

        canvasPosition.x = (window.innerWidth - gameSize.width)/2;
        canvasPosition.y = (window.innerHeight - gameSize.height)/2;

    }

    function startGame() {
        
        gameResized();
    }

    return Object.freeze({
        
        initialize,
        startGame,

        get gameSize() {
            return gameSize;
        },

        get canvasPosition() {
            return canvasPosition
        }
    });
})();

export { resizeManager };