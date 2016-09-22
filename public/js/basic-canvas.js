String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function fitToContainer(theCanvas){
    theCanvas.className = theCanvas.className.replaceAll ( ' fullWindow', '' );
    var parentWidth = 100;
    var parentHeight = 100;
    theCanvas.style.width = 'calc('+parentWidth+'% - 10px)';
    theCanvas.style.height = 'calc('+parentHeight+'% - 10px)';
}

function fitToViewport(theCanvas){
    theCanvas.className = theCanvas.className + ' fullWindow';
    parentWidth = window.innerWidth;
    parentHeight = window.innerHeight;
    theCanvas.style.width = ''+parentWidth+'px';
    theCanvas.style.height = ''+parentHeight+'px';
}

function GetFullscreenElement () {
    if (document.fullscreenElement !== undefined ) {
        return document.fullscreenElement;
    } else if (document.mozFullscreenElement !== undefined ) {
        return document.mozFullscreenElement;
    } else if (document.webkitFullscreenElement !== undefined ) {
        return document.webkitFullscreenElement;
    }
}
function IsFullscreen () {
    return GetFullscreenElement () != null;
}
function GoFullscreen (theCanvas) {
    if (theCanvas.requestFullscreen) {
        theCanvas.requestFullscreen();
    } else if (theCanvas.mozRequestFullScreen) {
        theCanvas.mozRequestFullScreen();
    } else if (theCanvas.webkitRequestFullscreen) {
        theCanvas.webkitRequestFullscreen();
    }
}

var displayMode = 0;

var canvas = document.getElementById('drawerPanel');
var gl = canvas.getContext('experimental-webgl');

function doKeyDown(e) {
    if ( e.keyCode == 68 && ! IsFullscreen () ) {
        displayMode = 1 - displayMode;
        resizeCanvas();
    }
    else if ( e.keyCode == 70 && ! IsFullscreen () ) {
        GoFullscreen (canvas);
        resizeCanvas();
    }
}

function resizeCanvas() {
    if ( IsFullscreen () ) fitToViewport(canvas);
    else if ( displayMode == 0 ) fitToContainer (canvas);
    else if ( displayMode == 1 ) fitToViewport(canvas);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0,0,canvas.width,canvas.height);
}

canvas.setAttribute('tabindex','0');
canvas.focus();
canvas.addEventListener( "keydown", doKeyDown, true);
window.addEventListener('resize', resizeCanvas, false);

gl.clearColor(0.5, 0.5, 0.5, 0.9);
gl.enable(gl.DEPTH_TEST);
resizeCanvas();
