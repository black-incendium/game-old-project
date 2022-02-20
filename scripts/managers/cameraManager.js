/**
 * @fileoverview manager object that is responsible for camera (which part of map is rendered on the screen at the moment)
 * 
 * @author black-incendium
 */

 let cameraManager = (() => {

    let callbacks = null;
    let cameraPosition = null;
    let cameraAspectRatio = null
    let cameraZoom = 0;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        cameraPosition = {
            x: 0,
            y: 0
        }

        cameraAspectRatio = {
            width: 16,
            height: 9
        }

        cameraZoom = 1;
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

        get cameraPosition() {
            return cameraPosition;
        },

        get cameraAspectRatio() {
            return cameraAspectRatio;
        },

        get cameraZoom() {
            return cameraZoom;
        }
    });
})();

export { cameraManager };