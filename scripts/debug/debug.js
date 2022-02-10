let debug = (()=>{

    let printStyle = {
        'error': 'color: red; font-weight:bold;',
        'default': 'font-weight:bold;'
    }

    function print(msg, type) {
        if (printStyle[type] == undefined) {
            type = 'default'
        }
        console.log(`%c${msg}`, printStyle[type]);
    }

    return {
        print
    }
})();

export {debug};