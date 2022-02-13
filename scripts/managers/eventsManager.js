import { debug } from './../debug/debug.js'

/**
 * @fileoverview manager object responsible for handling events and eventListeners 
 * 
 * @author black-incendium
 */

let eventsManager = (() => {

    let contexts = null;
    let eventListeners = null;

    function initialize() {

        contexts = {};
        eventListeners = [];
    }

    function fireEvent(context, event, data) {

        if (contexts[context] == undefined) {
            debug.print(`there is no context ${context}`, 'error');
            return;
        } else if (contexts[context][eventName] == undefined) {
            debug.print(`there is no event ${event} in the context ${context}`, 'error');
            return;
        }

        eventListeners.forEach(listener => {
            if (listener.context == context && listener.event == event) {
                listener.callback(data);
            }
        });
    }

    function setupEventListener(context, event, callback) {
        eventListeners.push({
            context,
            event,
            callback
        });
    }

    function createContext(contextName) {

        if (typeof contextName != 'string') {

            debug.print('context name must be a string', 'error');
            return;
        } else if (contexts[contextName] != undefined) {

            debug.print('event context with this name already exist', 'error');
            return;
        }

        contexts[contextName] = {};
    }

    function createEvent(context, eventName) {

        if (typeof eventName != 'string') {

            debug.print('event name must be a string', 'error');
            return;
        } else if (contexts[context] == undefined) {

            debug.print('there is no such context', 'error');
            return;
        } else if (contexts[context][eventName] != undefined) {

            debug.print('event with this name already exist in this context', 'error');
            return;
        }
    }

    initialize();

    return Object.freeze({
        fireEvent,
        setupEventListener,
        createContext,
        createEvent
    });
})();

export { eventsManager };