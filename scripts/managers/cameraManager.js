import { debug } from './../debug/debug.js';

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

    function isInTheView({x, y}) {

        if (x < Math.floor(cameraPosition.x)) return false;
        if (x > Math.ceil(cameraPosition.x + cameraAspectRatio.width * 1 / cameraZoom)) return false;
        if (y < Math.floor(cameraPosition.y)) return false;
        if (y > Math.ceil(cameraPosition.y + cameraAspectRatio.height * 1 / cameraZoom)) return false;

        return true;
    }

    initialize();

    return Object.freeze({

        isInTheView,

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