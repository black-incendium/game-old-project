import { animationsConfig } from '../configs/animationsConfig.js';
import { eventsManager } from './eventsManager.js';
import { assetsManager } from './assetsManager.js';

/**
 * @fileoverview manager object responsible for handling animations, both stationary and nonstationary
 * 
 * @author black-incendium
 */

 let animationsManager = (() => {

    let callbacks = null;
    let animationsData = {};
    // let gameStartTime = null;

    function initialize() {
        
        setupCallbacks();
        setupEvents();
        setupEventListeners();

        // gameStartTime = (new Date()).getTime();
    }

    function setupCallbacks() {

        callbacks = {
            assetsReadyCallback: createAnimationsData
        };
    }

    function setupEvents() {

        eventsManager.createContext('animationsManager');
        eventsManager.createEvent('animationsManager', 'animationsDataReady');
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('assetsManager', 'assetsDataReady', callbacks.assetsReadyCallback);
    }

    function createAnimationsData() {

        animationsConfig.animationsJsons.forEach(jsonName => {
            fetch(`./../../assets/animationsJsons/${jsonName}`)
            .then(response => response.json())
            .then(response => {

                animationsData[response.name] = {
                    fps: response.fps, 
                    frames: []
                };

                response.framesNames.forEach(frameName => {
                    animationsData[response.name].frames.push(assetsManager.getAssetData(frameName));
                });

                eventsManager.fireEvent('animationsManager', 'animationsDataReady');
            });
        })
    }

    // function setupAnimation({entity, animationName, fps}) {
    //     entity.animation = {
    //         name: animationName,
    //         fps,
    //         animation
    //     }
    // }

    initialize();

    return Object.freeze({
        
    });
})();

export { animationsManager };