import { debug } from './../debug/debug.js';
import { assetsConfig } from './../configs/assetsConfig.js'

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
        setupEventListeners();

        createAssetsData();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
    }

    async function createAssetsData() {
        console.log(assetsConfig);
        assetsConfig.imagesJsons.forEach(jsonName => {
            fetch(`./../../assets/jsons/${jsonName}`)
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
                })
            })
        })
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { assetsManager };