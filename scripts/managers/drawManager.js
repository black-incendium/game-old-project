/**
 * @fileoverview manager object responsible for managing frames drawing process
 * 
 * @author black-incendium
 */

 let drawManager = (() => {

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
        drawFrame
    });
})();

export { drawManager };