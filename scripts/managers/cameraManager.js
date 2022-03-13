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
    let upperLeftCornerPosition = {};
    let gameSize = {};
    let cameraZoom = 0;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();

        cameraPosition = {x: 0, y: 0}
        cameraAspectRatio = {width: 16, height: 9}

        windowResized();

        cameraZoom = 1;
    }

    function setupCallbacks() {

        callbacks = {
            resizeCallback: windowResized
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('userInput', 'resize', callbacks.resizeCallback);
    }

    function isInTheView({x, y}) {

        if (x < Math.floor(cameraPosition.x)) return false;
        if (x > Math.ceil(cameraPosition.x + cameraAspectRatio.width * 1 / cameraZoom)) return false;
        if (y < Math.floor(cameraPosition.y)) return false;
        if (y > Math.ceil(cameraPosition.y + cameraAspectRatio.height * 1 / cameraZoom)) return false;

        return true;
    }

    function calcUpperLeftCornerPosition() {

        calcGameSize();

        upperLeftCornerPosition.x = (window.innerWidth - gameSize.width)/2;
        upperLeftCornerPosition.y = (window.innerHeight - gameSize.height)/2;
    }

    function calcGameSize() {

        if (window.innerWidth/window.innerHeight > cameraAspectRatio.width/cameraAspectRatio.height) {

            gameSize.width = window.innerHeight/cameraAspectRatio.height*cameraAspectRatio.width;
            gameSize.height = window.innerHeight
        } else {

            gameSize.width = window.innerWidth;
            gameSize.height = window.innerWidth/cameraAspectRatio.width*cameraAspectRatio.height
        }
    }

    function windowResized() {

        calcUpperLeftCornerPosition()
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
        },

        get upperLeftCornerPosition() {
            return upperLeftCornerPosition;
        },
        get gameSize() {
            return gameSize;
        }
    });
})();

export { cameraManager };