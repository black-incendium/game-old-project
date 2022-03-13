import { eventsManager } from './eventsManager.js';

/**
 * @fileoverview manager object responsible for handling user input; firing appropriate events
 * 
 * @author black-incendium
 */

 let userInputManager = (() => {

    let cursorPosition = {
        x: -1000,
        y: -1000
    }

    function initialize() {
        
        setupEvents();

        setupDocumentEventListeners();
    }

    function setupEvents() {

        eventsManager.createContext('userInput');
        eventsManager.createEvent('userInput', 'click');
        eventsManager.createEvent('userInput', 'keydown');
        eventsManager.createEvent('userInput', 'resize');
    }

    function setupDocumentEventListeners() {

        document.addEventListener('click', e => {
            eventsManager.fireEvent('userInput', 'click', e);
        });

        document.addEventListener('keydown', e => {
            eventsManager.fireEvent('userInput', 'keydown', e);
        });

        window.addEventListener('resize', e => {
            eventsManager.fireEvent('userInput', 'resize', {
                width: e.target.innerWidth,
                height: e.target.innerHeight
            });
        });

        document.addEventListener('mousemove', e => {
            cursorPosition.x = e.x;
            cursorPosition.y = e.y;
        })
    }

    initialize();

    return Object.freeze({
        
        get cursorPosition() {
            return cursorPosition;
        }
    });
})();

export { userInputManager };