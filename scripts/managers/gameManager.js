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
import { componentsManager } from './componentsManager.js';

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
        eventsManager.createEventListener('componentsManager', 'componentsDataReady', callbacks.someTypeOfDataReadyCallback);
        // eventsManager.createEventListener('entitiesManager', 'entitiesDataReady', callbacks.someTypeOfDataReadyCallback);
    }

    function countDataReadyEvents() {

        dataReadyEvents++;
        if (dataReadyEvents == 4) {
            // renderManager.startRendering();
            let x = 0
            function drawScene() {
                let ctx = document.querySelector('canvas').getContext('2d');
                ctx.clearRect(0,0,10000,10000);
                ctx.drawImage(
                assetsManager.getAsset('basicTileset'),
                0,
                0,
                16,
                16,
                x,
                x,
                200,
                200
                // nextTileX - tileX,
                // nextTileY - tileY)
                );
                x++;
                window.requestAnimationFrame(drawScene)
            }
            drawScene();
        }
    }

    function initializeManagers() {

        eventsManager.initialize();
        componentsManager.initialize();
        animationsManager.initialize();
        assetsManager.initialize();
        cameraManager.initialize();
        mapManager.initialize();
        resizeManager.initialize();
        // entitiesManager.initialize();
        // gameQueueManager.initialize();
        renderManager.initialize();
        userInputManager.initialize();

        testManager.initialize();
    }

    return Object.freeze({
        
        initialize
    });
})();

export { gameManager };