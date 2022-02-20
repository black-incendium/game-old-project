import { debug } from "./../debug/debug.js";
import { eventsManager } from './../managers/eventsManager.js'

/**
 * @fileoverview test manager object that exist only to not pollute any other files while testing new functionalities during early stages of development
 * 
 * @author black-incendium
 */

 let testManager = (() => {

    let callbacks = null;
    let mainEventListener = null;

    function initialize() {
        
        setupCallbacks();
        setupEventListeners();
    }

    function setupCallbacks() {

        callbacks = {
            callback1
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('userInput', 'keydown', callbacks.callback1);
    }

    function callback1(data) {
        console.log(data)
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { testManager };