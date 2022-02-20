/**
 * @fileoverview manager object that is responsible for handling game queue
 * 
 * @author black-incendium
 */

 let gameQueueManager = (() => {

    let callbacks = null;
    let gameQueue = undefined; // ----------------todo--------------

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

export { gameQueueManager };