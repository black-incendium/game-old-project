import { debug } from "./../debug/debug.js";
import { eventsManager } from './../managers/eventsManager.js';
import { entitiesManager } from './../managers/entitiesManager.js';
import { assetsManager } from "../managers/assetsManager.js";

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

        // document.addEventListener('click', test)
    }

    function setupCallbacks() {

        callbacks = {
            callback1
        };
    }

    function setupEventListeners() {
        
        eventsManager.createEventListener('animationsManager', 'animationsDataReady', callbacks.callback1);
    }

    function callback1(data) {
        
        assetsManager.drawAsset('player_idle_0',0,0,100,100);
    }

    function test(){

        // entitiesManager.createEntity({ });
        // entitiesManager.getActors()[0].setAnimation('player_idle', 2)
        // console.log(entitiesManager.getActors())
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { testManager };