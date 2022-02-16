import { elements } from './../elements.js';
import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for making changes needed while game is resized
 * 
 * @author black-incendium
 */

 let resizeManager = (() => {

    let callbacks = null;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();
    }

    function setupCallbacks() {

        callbacks = {
            gameResized
        };

        console.log(callbacks.gameResized)
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('userInput', 'resize', callbacks.gameResized);
    }

    function gameResized({width, height}) {

        elements.canvas.width = width;
        elements.canvas.height = height;
    }

    function gameStarted() {
        
        gameResized({width: elements.window.innerWidth, height: elements.window.innerHeight});
    }

    initialize();

    return Object.freeze({
        gameStarted
    });
})();

export { resizeManager };