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
            callback1,
            callback2
        };
    }

    function setupEventListeners() {
        
        mainEventListener = eventsManager.createEventListener('userInput', 'click', callbacks.callback1);
        eventsManager.createEventListener('userInput', 'keydown', callbacks.callback2);
    }

    function callback1() {
        debug.print('event listener active')
    }

    function callback2(data) {
        debug.print('callback2 fired')
        if (data.key == 'r') {
            debug.print('callback2 fired and inside if')
            eventsManager.removeEventListener(mainEventListener);
        }
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { testManager };