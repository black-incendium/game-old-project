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
        } else if (contexts[context][event] == undefined) {
            debug.print(`there is no event ${event} in the context ${context}`, 'error');
            return;
        }

        eventListeners.forEach(listener => {
            if (listener.context == context && listener.event == event) {
                listener.callback(data);
            }
        });
    }

    function createEventListener(context, event, callback) {

        if (typeof callback != 'function') {
            debug.print('callback must be a function', 'error');
            return;
        }

        let eventListener = {
            context,
            event,
            callback
        };

        eventListeners.push(eventListener);
        return eventListener;
    }

    function removeEventListener(eventListener) {

        eventListeners = eventListeners.filter(el => el != eventListener);
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

        contexts[context][eventName] = true;
    }

    initialize();

    return Object.freeze({
        fireEvent,
        createEventListener,
        removeEventListener,
        createContext,
        createEvent
    });
})();

export { eventsManager };