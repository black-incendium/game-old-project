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

    function initialize() {
        
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

        let height;
        let width;
        component.x ??= 0
        component.y ??= 0;

        actualOffset.x += component.x;
        actualOffset.y += component.y;

        if (component.aspectRatio !== undefined) {

            if (component.width !== undefined) {
                
                width = component.width
                height = component.width/component.aspectRatio.width*component.aspectRatio.height
            } else {
                
                height = component.height
                width = component.height/component.aspectRatio.height*component.aspectRatio.width
            }
        } else {
            
            // TODO
        }

        if (component.renderFunctionId !== undefined) {
            renderConfig.renderFunctions[component.renderFunctionId](actualOffset.x, actualOffset.y, width, height);
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