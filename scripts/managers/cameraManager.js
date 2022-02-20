/**
 * @fileoverview manager object that is responsible for camera (which part of map is rendered on the screen at the moment)
 * 
 * @author black-incendium
 */

 let cameraManager = (() => {

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

    function getCameraPosition() {
        
        return {
            x: 0,
            y: 0
        }
    }

    function getCameraAspectRatio() {
        
        return {
            width: 16,
            height: 9
        }
    } 

    function getCameraZoom() {

        return 1;
    }

    initialize();

    return Object.freeze({

        get cameraPosition() {
            return getCameraPosition();
        },

        get cameraAspectRatio() {
            return getCameraAspectRatio();
        },

        get cameraZoom() {
            return getCameraZoom();
        }
    });
})();

export { cameraManager };