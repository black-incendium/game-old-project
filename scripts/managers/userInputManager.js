import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for handling user input; firing appropriate events
 * 
 * @author black-incendium
 */

 let userInputManager = (() => {

    // gloabl variables declarations

    function initialize() {
        
        setupEvents();

        setupDocumentEventListeners();
    }

    function setupEvents() {

        eventsManager.createContext('userInput');
        eventsManager.createEvent('userInput', 'click');
        eventsManager.createEvent('userInput', 'keydown');
    }

    function setupDocumentEventListeners() {

        document.addEventListener('click', e => {
            eventsManager.fireEvent('userInput', 'click', e);
        });

        document.addEventListener('keydown', e => {
            eventsManager.fireEvent('userInput', 'keydown', e);
        });
    }

    initialize();

    return Object.freeze({
        
    });
})();

export { userInputManager };