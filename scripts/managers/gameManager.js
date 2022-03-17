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
    let dataReadyEvents = 0;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        resizeManager.startGame();

    }

    function setupCallbacks() {

        callbacks = {
            someTypeOfDataReadyCallback: countAsynchronousEvents
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('assetsManager', 'assetsDataReady', callbacks.someTypeOfDataReadyCallback);
        eventsManager.createEventListener('mapManager', 'mapsDataReady', callbacks.someTypeOfDataReadyCallback);
        eventsManager.createEventListener('animationsManager', 'animationsDataReady', callbacks.someTypeOfDataReadyCallback);
        // eventsManager.createEventListener('entitiesManager', 'entitiesDataReady', callbacks.someTypeOfDataReadyCallback);
    }

    function countAsynchronousEvents() {

        dataReadyEvents++;
        if (dataReadyEvents == 3) {
            startDrawing();
        }
    }

    function startDrawing() {

        drawManager.draw();
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { gameManager };