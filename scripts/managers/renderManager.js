import { elements } from '../elements.js';
import { mapManager } from './mapManager.js';
import { entitiesManager } from './entitiesManager.js';
import { renderConfig } from '../configs/renderConfig.js';
import { componentsManager } from './componentsManager.js';

/**
 * @fileoverview manager object responsible for managing frames drawing process
 * 
 * @author black-incendium
 */

 let renderManager = (() => {

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

    // function draw() {

    //     elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height)

    //     mapManager.drawMap();
    //     // entitiesManager.drawEntities();

    //     window.requestAnimationFrame(draw);
    // }

    function startRendering() {
        
        render()
    }

    function render() {

        renderComponent(componentsManager.getComponent('root'), {x:0,y:0});

        window.requestAnimationFrame(render);
    }

    function renderComponent(component, actualOffset) {

        component.x ??= 0
        component.y ??= 0;

        actualOffset.x += component.x;
        actualOffset.y += component.y;

        if (component.renderFunctionId !== undefined) {
            renderConfig.renderFunctions[component.renderFunctionId](actualOffset.x, actualOffset.y ,100,100);
        }

        if (component.children === undefined) return;

        Object.getOwnPropertyNames(component.children).forEach(propertyName => {
            renderComponent(component.children[propertyName], actualOffset);
        });
    }

    return Object.freeze({

        initialize,
        startRendering
    });
})();

export { renderManager };