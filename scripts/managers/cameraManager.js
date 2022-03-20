import { elements } from '../elements.js';
import { debug } from './../debug/debug.js';
import { eventsManager } from './eventsManager.js';

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

        cameraPosition = {x: 0, y: 0}
        cameraAspectRatio = {width: 3, height: 3}

        cameraZoom = 1;
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEventListeners() {
        
        // eventsManager.createEventListener('userInput', 'resize', callbacks.resizeCallback);
    }

    function setCameraPosition(x, y) {
        cameraPosition = {
            x,
            y
        }
    }

    return Object.freeze({

        initialize,
        setCameraPosition,

        get cameraPosition() {
            return cameraPosition;
        },

        get cameraAspectRatio() {
            return cameraAspectRatio;
        },

        get cameraZoom() {
            return cameraZoom;
        },

        get cameraViewSize() {
            return {
                width: cameraAspectRatio.width/cameraZoom,
                height: cameraAspectRatio.height/cameraZoom
            }
        }

    });
})();

export { cameraManager };