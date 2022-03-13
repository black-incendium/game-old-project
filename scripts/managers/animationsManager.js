import { animationsConfig } from '../configs/animationsConfig.js';
import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for handling animations, both stationary and nonstationary
 * 
 * @author black-incendium
 */

 let animationsManager = (() => {

    let callbacks = null;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();
    }

    function setupCallbacks() {

        callbacks = {
            assetsReadyCallback: createAnimationsData
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('assetsManager', 'assetsReady', callbacks.assetsReadyCallback);
    }

    function createAnimationsData() {

        animationsConfig.animationsJsons.forEach(jsonName => {
            fetch(`./../../assets/animationsJsons/${jsonName}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            });
        })
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { animationsManager };