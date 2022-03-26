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
        cameraAspectRatio = {width: 16, height: 9}

        cameraZoom = 1;
    }

    function setupCallbacks() {

        callbacks = {
            changeZoomOnScroll: changeZoom
        }
    }

    function setupEventListeners() {

        eventsManager.createEventListener('userInput', 'wheelUsed', callbacks.changeZoomOnScroll)
    }

    function setCameraPosition(x, y) {
        
        cameraPosition.x = x;
        cameraPosition.y = y;
    }

    function changeZoom(data) {
        
        cameraZoom -= data.deltaY/1000;
        cameraZoom = Math.max(Math.min(cameraZoom, 3), 0.5);
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
        },

        get cameraPositionInCanvasUnits() {
            let tileSize = elements.canvas.width/(cameraAspectRatio.width/cameraZoom);
            return {
                x: Math.floor(cameraPosition.x*tileSize),
                y: Math.floor(cameraPosition.y*tileSize)
            }
        }

    });
})();

export { cameraManager };