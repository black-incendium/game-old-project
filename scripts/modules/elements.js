let elements = (()=>{
    let canvas, ctx;
    function initialize(){

        if (canvas || ctx) return;

        canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx = canvas.getContext('2d');
        ctx.fillStyle = "red";
        ctx.fillRect(100,100,500,500)
    }

    return {
        initialize
    }
})();

export {elements};