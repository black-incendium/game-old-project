import { cameraManager } from './cameraManager.js';
import { animationsManager } from './animationsManager.js';
import { entitiesManager } from './../configs/entitiesConfig.js';

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

        createEntitiesData();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEventListeners() {
        
        //eventsManager.createEventListener('', '', callbacks.exampleCallback);
    }

    function createEntity({}) {

        let entity = {

            setAnimation(animationName, fps) {

                animationsManager.setupAnimation({entity, animationName, fps});
            }
        }

        actors.push(entity)
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

    async function createEntitiesData() {

        await Promise.all(entitiesConfig);

    }

    initialize();

    return Object.freeze({
        
        drawEntities,
        createEntity
    });
})();

export { entitiesManager };