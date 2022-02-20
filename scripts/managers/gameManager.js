import { userInputManager } from './userInputManager.js';
import { testManager } from './../development/testManager.js';
import { resizeManager } from './resizeManager.js';
import { drawManager } from './drawManager.js';

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
            
        };
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { gameManager };