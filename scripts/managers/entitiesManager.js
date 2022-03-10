import { cameraManager } from './cameraManager.js';

/**
 * @fileoverview manager object responsible for drawing and managing entities
 * 
 * @author black-incendium
 */

 let entitiesManager = (() => {

    let callbacks = null;
    let stationaryObjects = [];
    let items = [];
    let actors = [];
    let player = {};

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

    function createEntity({}) {

    }

    function drawEntity(entity){

        if (!cameraManager.isInTheView(entity)) return;

    }

    function drawEntities() {

        stationaryObjects.forEach(drawEntity);
        items.forEach(drawEntity);
        actors.forEach(drawEntity);
        drawEntity(player);
    }

    initialize();

    return Object.freeze({
        
        drawEntities
    });
})();

export { entitiesManager };