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

    async function createAnimationsData() {

        await Promise.all(animationsConfig.animationsJsons.map(async jsonName => {
            let response = await fetch(`./../../assets/animationsJsons/${jsonName}`)
            response = await response.json();

            animationsData[response.name] = {
                fps: response.fps, 
                frames: []
            };

            response.framesNames.forEach(frameName => {
                animationsData[response.name].frames.push(assetsManager.getAssetData(frameName));
            });

        }));
        eventsManager.fireEvent('animationsManager', 'animationsDataReady');
    }

    function setupAnimation({entity, animationName, fps}) {
        entity.animation = {
            name: animationName,
            fps,
            currentFrame: 0
        }
    }

    initialize();

    return Object.freeze({
        
        setupAnimation
    });
})();

export { animationsManager };