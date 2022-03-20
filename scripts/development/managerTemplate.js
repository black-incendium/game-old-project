/**
 * @fileoverview 
 * 
 * @author black-incendium
 */

 let x = (() => {

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

    return Object.freeze({
        
        initialize
    });
})();

export {  };