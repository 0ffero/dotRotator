"use strict"
vars.DEBUG && console.log('Initialising...');

var config = {
    type: Phaser.WEBGL, title: consts.appName, banner: false, url: window.location.href,
    backgroundColor: consts.canvas.colour, disableContextMenu: true,
    height: consts.canvas.height, width: consts.canvas.width,
    fps: { target: 60 },
    input: {
        gamepad: true
    },
    /* physics: {
        default: 'matter',
        matter: { debug: vars.DEBUG, gravity: { y: 0 } }
    }, */
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: consts.canvas.width, height: consts.canvas.height },
    scene: { preload: preload, create: create, update: vars.App.update,
        /* pack: {
            files: [
                { type: 'image', key: 'loadingScreen', url: 'loadingScreen.png'}
            ]
        } */
    }
};

var game = vars.Phaser.game = new Phaser.Game(config);


/*
█████ ████  █████ █      ███  █████ ████  
█   █ █   █ █     █     █   █ █   █ █   █ 
█████ ████  ████  █     █   █ █████ █   █ 
█     █   █ █     █     █   █ █   █ █   █ 
█     █   █ █████ █████  ███  █   █ ████  
*/
function preload() {
    let scene = vars.Phaser.scene = this;
    scene.load.setPath('assets');
    vars.init();
}



/*
█████ ████  █████ █████ █████ █████ 
█     █   █ █     █   █   █   █     
█     ████  ████  █████   █   ████  
█     █   █ █     █   █   █   █     
█████ █   █ █████ █   █   █   █████ 
*/
function create() {
    vars.App.init();
};