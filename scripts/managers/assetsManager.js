import { debug } from './../debug/debug.js';
import { assetsConfig } from './../configs/assetsConfig.js'
import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for handling (creating, saving, etc.) assets data
 * 
 * @author black-incendium
 */

 let assetsManager = (() => {

    let callbacks = null;
    let assets = {};

    function initialize() {
        
        setupCallbacks();
        setupEvents();
        setupEventListeners();

        createAssetsData();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEvents() {

        eventsManager.createContext('assetsManager');
        eventsManager.createEvent('assetsManager', 'assetsReady');
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
    }

    async function createAssetsData() {

        assetsConfig.imagesJsons.forEach(jsonName => {
            fetch(`./../../assets/imagesJsons/${jsonName}`)
            .then(response => response.json())
            .then(response => {
                response.frames.forEach((frame, index) => {

                    let optionalFrameName;
                    let additionalFrameData = {};

                    if (response.prefix) {
                        optionalFrameName = response.prefix + index;
                    }
                    
                    if (assets[optionalFrameName ?? frame.name] !== undefined) {
                        debug.msg(`asset ${optionalFrameName ?? frame.name} already exists`);
                    }

                    additionalFrameData.path = response.path;

                    assets[optionalFrameName ?? frame.name] = {...frame, ...additionalFrameData}
                });
                eventsManager.fireEvent('assetsManager', 'assetsReady');
            });
        });
    }

    function getAsset(assetName) {

        return assets[assetName];
    }

    initialize();

    return Object.freeze({

        getAsset
    });
})();

export { assetsManager };