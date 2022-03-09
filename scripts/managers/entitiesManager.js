/**
 * @fileoverview manager object responsible for drawing and managing entities
 * 
 * @author black-incendium
 */

 let entitiesManager = (() => {

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

    function drawEntities() {
        
    }

    initialize();

    return Object.freeze({
        
        drawEntities
    });
})();

export { entitiesManager };