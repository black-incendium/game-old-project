import { eventsManager } from './eventsManager.js';
import { elements } from './../elements.js';
import { userInputManager } from './userInputManager.js';

/**
 * @fileoverview manager object responsible for handling map data and drawing map
 * 
 * @author black-incendium
 */

let mapManager = (()=>{

    let callbacks = null;
    let actualMap = null;

    function initialize() {

        setupCallbacks();
        setupEventListeners();
    }

    function setupCallbacks() {

        callbacks = {
            
        };
    }

    function setupEventListeners() {

    }

    function setMap(mapId) {

    }

    function drawTile() {
        
    }

    function drawMap() {

        elements.ctx.fillStyle = "blue";
        elements.ctx.fillRect(userInputManager.cursorPosition.x-5, userInputManager.cursorPosition.y-5, 10, 10)
    }

    initialize();

    return Object.freeze({

        drawMap
    });
})();

export { mapManager }