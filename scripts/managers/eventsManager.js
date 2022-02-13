let eventsManager = (() => {

    let contexts = null;

    function initialize() {

        contexts = {};
    }

    function fireEvent() {

    }

    function setupEventListener() {

    }

    initialize();

    return Object.freeze({
        fireEvent,
        setupEventListener
    });
})();

export { eventsManager };