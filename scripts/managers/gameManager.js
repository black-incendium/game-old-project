import { userInputManager } from './userInputManager.js';
import { testManager } from './../development/testManager.js';
import { resizeManager } from './resizeManager.js';
import { renderManager } from './renderManager.js';
import { eventsManager } from './eventsManager.js'
import { animationsManager } from './animationsManager.js';
import { assetsManager } from './assetsManager.js';
import { cameraManager } from './cameraManager.js';
import { entitiesManager } from './entitiesManager.js';
import { gameQueueManager } from './gameQueueManager.js';
import { mapManager } from './mapManager.js';

/**
 * @fileoverview main manager object responsible for game flow
 * 
 * @author black-incendium
 */

 let gameManager = (() => {

    let callbacks = null;
    let dataReadyEvents = 0;

    function initialize() {
        
        initializeManagers();

        setupCallbacks();
        setupEventListeners();
    }

    function setupCallbacks() {

        callbacks = {
            someTypeOfDataReadyCallback: countDataReadyEvents
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('assetsManager', 'assetsDataReady', callbacks.someTypeOfDataReadyCallback);
        eventsManager.createEventListener('mapManager', 'mapsDataReady', callbacks.someTypeOfDataReadyCallback);
        eventsManager.createEventListener('animationsManager', 'animationsDataReady', callbacks.someTypeOfDataReadyCallback);
        // eventsManager.createEventListener('entitiesManager', 'entitiesDataReady', callbacks.someTypeOfDataReadyCallback);
    }

    function countDataReadyEvents() {

        dataReadyEvents++;
        if (dataReadyEvents == 3) {
            renderManager.startRendering();
        }
    }

    function initializeManagers() {

        eventsManager.initialize();
        animationsManager.initialize();
        assetsManager.initialize();
        cameraManager.initialize();
        // entitiesManager.initialize();
        // gameQueueManager.initialize();
        mapManager.initialize();
        renderManager.initialize();
        resizeManager.initialize();
        userInputManager.initialize();
    }

    return Object.freeze({
        
        initialize
    });
})();

export { gameManager };