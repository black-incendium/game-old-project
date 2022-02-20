/**
 * @fileoverview main manager object responsible for game flow
 * 
 * @author black-incendium
 */

 let gameManager = (() => {

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

export { gameManager };