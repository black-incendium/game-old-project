import { eventsManager } from './eventsManager.js'

/**
 * @fileoverview manager object responsible for handling map data and drawing map
 * 
 * @author black-incendium
 */

let mapManager = (()=>{

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

    }

    function drawMap() {

    }

    initialize();

    return Object.freeze({
        
    });
})();

export { mapManager }