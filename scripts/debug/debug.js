let debug = (() => {

    const gl = {};

    function initialize() {
        gl.printStyle = {
            'error': 'color: red; font-weight:bold;',
            'warning': 'color: yellow; font-weight:bold;',
            'default': 'font-weight:bold;'
        }
    }

    function print(msg, type) {

        if (gl.printStyle[type] == undefined) {
            type = 'default'
        }
        
        console.log(`%c${msg}`, gl.printStyle[type]);
        //console.log(error);
    }

    initialize();

    return {
        print
    }
})();

Object.freeze(debug);

export { debug };