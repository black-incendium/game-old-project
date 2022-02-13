let debug = (() => {

    let printStyle = null;

    function initialize() {
        printStyle = {
            'error': 'color: red; font-weight:bold;',
            'warning': 'color: yellow; font-weight:bold;',
            'default': 'font-weight:bold;'
        }
    }

    function print(msg, type) {

        if (printStyle[type] == undefined) {
            type = 'default'
        }
        
        console.log(`%c${msg}`, printStyle[type]);
        //console.log(error);
    }

    initialize();

    return Object.freeze({
        print
    });
})();

export { debug };