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
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { assetsManager };