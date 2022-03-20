import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for handling components
 * 
 * @author black-incendium
 */

 let componentsManager = (() => {

    let callbacks = null;
    let components = {};

    function initialize() {
        
        setupCallbacks();
        setupEvents();
        setupEventListeners();

        // components.root = layoutConfig;
        // scanComponentData(components.root);
        createComponentsData();

    }

    function setupCallbacks() {

        callbacks = {
            
        }
    }

    function setupEvents() {

        eventsManager.createContext('componentsManager');
        eventsManager.createEvent('componentsManager', 'componentsDataReady');
    }

    function setupEventListeners() {
        
        // eventsManager.createEventListener('componentsManager', 'componentsDataReady', callbacks.componentsDataReadyCallback);
    }

    async function createComponentsData() {

        let response = await fetch(`./scripts/configs/layoutConfig.json`);
        let root = await response.json();
        components.root = root;

        scanComponentData(root);

        eventsManager.fireEvent('componentsManager', 'componentsDataReady');
    }

    function scanComponentData(component) {

        if (component.children === undefined) return;

        Object.getOwnPropertyNames(component.children).forEach(componentName => {

            components[componentName] = component.children[componentName];
            scanComponentData(component.children[componentName]);
        });
    }

    function getComponent(componentId) {

        return components[componentId];
    }

    return Object.freeze({
        
        initialize,
        getComponent
    });
})();

export { componentsManager };