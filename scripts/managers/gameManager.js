import { userInputManager } from './userInputManager.js';
import { testManager } from './../development/testManager.js';
import { resizeManager } from './resizeManager.js';
import { drawManager } from './drawManager.js';
import { eventsManager } from './eventsManager.js'

/**
 * @fileoverview main manager object responsible for game flow
 * 
 * @author black-incendium
 */

 let gameManager = (() => {

    let callbacks = null;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        resizeManager.startGame();

    }

    function setupCallbacks() {

        callbacks = {
            assetsDataReadyCallback: startDrawing
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('assetsManager', 'assetsDataReady', callbacks.assetsDataReadyCallback);
    }

    function startDrawing() {

        drawManager.draw();
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { gameManager };