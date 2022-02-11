let debug = (()=>{

    let printStyle = {
        'error': 'color: red; font-weight:bold;',
        'warning': 'color: yellow; font-weight:bold;',
        'default': 'font-weight:bold;'
    }

    function print(msg, type) {

        if (printStyle[type] == undefined) {
            type = 'default'
        }
        
        console.log(`%c${msg}`, printStyle[type]);
        //console.log(error);
    }

    return {
        print
    }
})();

export {debug};