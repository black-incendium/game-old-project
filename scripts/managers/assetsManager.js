import { assetsConfig } from './../configs/assetsConfig.js'

/**
 * @fileoverview manager object responsible for handling (creating, saving, etc.) assets
 * 
 * @author black-incendium
 */

 let assetsManager = (() => {

    let callbacks = null;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        createAssets();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
    }

    async function createAssets() {
        console.log(assetsConfig);
        assetsConfig.images.forEach(element => {
            fetch(`./../../assets/${element.imagePath}`).then(response => {
                console.log(response);
            });
        })
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { assetsManager };