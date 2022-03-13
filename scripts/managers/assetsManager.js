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
    let assetsData = {};

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
        eventsManager.createEvent('assetsManager', 'assetsDataReady');
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
                    
                    if (assetsData[optionalFrameName ?? frame.name] !== undefined) {
                        debug.msg(`asset ${optionalFrameName ?? frame.name} already exists`);
                    }

                    additionalFrameData.path = response.path;

                    assetsData[optionalFrameName ?? frame.name] = {...frame, ...additionalFrameData}
                });
                eventsManager.fireEvent('assetsManager', 'assetsDataReady');
            });
        });
    }

    function getAssetData(assetName) {

        return assetsData[assetName];
    }

    initialize();

    return Object.freeze({

        getAssetData
    });
})();

export { assetsManager };