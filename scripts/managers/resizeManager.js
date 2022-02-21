import { elements } from './../elements.js';
import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for making changes needed while game is resized
 * 
 * @author black-incendium
 */

 let resizeManager = (() => {

    let callbacks = null;
    let gameUpperLeftCorner = null;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        gameUpperLeftCorner = {};

        calculateUpperLeftCornerPosition()
    }

    function setupCallbacks() {

        callbacks = {
            gameResized
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('userInput', 'resize', callbacks.gameResized);
    }

    function gameResized({width, height}) {

        elements.canvas.width = width;
        elements.canvas.height = height;
    }

    function startGame() {
        
        gameResized({width: window.innerWidth, height: window.innerHeight});
    }

    function calculateUpperLeftCornerPosition() {

        // gameUpperLeftCorner.x = 
        // gameUpperLeftCorner.y = 
    }

    initialize();

    return Object.freeze({
        
        startGame,
        get gameUpperLeftCorner() {
            return gameUpperLeftCorner
        }
    });
})();

export { resizeManager };