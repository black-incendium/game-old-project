import { eventsManager } from './eventsManager.js';
import { resizeManager } from './resizeManager.js';

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
        eventsManager.createEvent('userInput', 'wheelUsed');
    }

    function setupDocumentEventListeners() {

        document.addEventListener('click', e => {
            eventsManager.fireEvent('userInput', 'click', e);
        });

        document.addEventListener('keydown', e => {
            eventsManager.fireEvent('userInput', 'keydown', e);
        });

        document.addEventListener('wheel', e => {
            eventsManager.fireEvent('userInput', 'wheelUsed', e);
        });

        window.addEventListener('resize', e => {
            eventsManager.fireEvent('userInput', 'resize', {
                width: e.target.innerWidth,
                height: e.target.innerHeight
            });
        });

        document.addEventListener('mousemove', e => {
            // cursorPosition.x = e.x - resizeManager.canvasPosition.x;
            // cursorPosition.y = e.y - resizeManager.canvasPosition.y;
        })
    }

    return Object.freeze({

        initialize,
        
        get cursorPosition() {
            return cursorPosition;
        }
    });
})();

export { userInputManager };