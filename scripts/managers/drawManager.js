import { elements } from '../elements.js';
import { mapManager } from './mapManager.js';

/**
 * @fileoverview manager object responsible for managing frames drawing process
 * 
 * @author black-incendium
 */

 let drawManager = (() => {

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

    function draw() {

        elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height)

        mapManager.drawMap();

        window.requestAnimationFrame(draw);
    }

    initialize();

    return Object.freeze({

        draw
    });
})();

export { drawManager };