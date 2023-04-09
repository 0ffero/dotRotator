"use strict"
var vars = {
    DEBUG: true,

    version: 1,

    getScene: ()=> {
        return vars.Phaser.scene;
    },

    init: function() {
        // INITIALISING CODE GOES IN HERE
        vars.files.loadAssets();
    },

    files: {
        audio: {
            load: ()=> {
                /*
				scene.load.audio('pieceDrop', 'audio/pieceDrop.ogg');
				*/
            }
        },

        images: {
            load: ()=> {
                vars.getScene().load.atlas('ui', 'images/ui.png', 'images/ui.json')
            }
        },

        loadAssets: ()=> {
            let fV = vars.files;
            fV.images.load();
            /*
			fV.audio.load();
			*/
        }
    },

    localStorage: {
        init: ()=> {
            let lS = window.localStorage;
            // LOAD THE VARIABLES
        }
    },

    // APP
    App: {
        ready: false,
        dots: {
            count: 600
        },
        dotClass: null,

        init: ()=> {
            // generate the UI
            vars.input.init();
            vars.UI.init();
            vars.App.generateDots();
        },

        generateDots: ()=> {
            vars.App.dotClass = new Dots();
        },

        update: ()=> {
            if (!vars.App.ready) return;

            vars.App.dotClass.update();
        }
    },

    animate: {
        init: function() {
            
        },
    },

    audio: {
        init: function() {
            scene.sound.volume=0.2;
        },

        playSound: function(_key) {
            scene.sound.play(_key);
        },
    },

    camera: {
        mainCam: null,

        init: ()=> {
            vars.camera.mainCam = scene.cameras.main;
        },

        shake: ()=> {
            vars.camera.mainCam.shake(50);
        }
    },

    input: {
        init: ()=> {
            let scene = vars.getScene();
            let oP = vars.Phaser.objects;
            // keys to switch the ui images on shift
            scene.input.keyboard.on('keydown', (_key)=> {
                _key.key==='Shift' && (oP.moveImage.setAlpha(0),oP.rotateZoomImage.setAlpha(1));
            });
            
            scene.input.keyboard.on('keyup', (_key)=> {
                if (_key.key==='Shift') {
                    oP.moveImage.setAlpha(1);
                    oP.rotateZoomImage.setAlpha(0);
                };
            });
        }
    },

    particles: {
        init: ()=> {
            // particles are stored here
        }
    },

    Phaser: {
        objects: {},
        game: null,
        scene: null
    },

    UI: {
        init: ()=> {
            let scene = vars.getScene();
            let oP = vars.Phaser.objects;
            let cC = consts.canvas;
            oP.rotateZoomImage = scene.add.image(cC.width, cC.height, 'ui', 'rotateZoomStars').setOrigin(1,1).setAlpha(0);
            let c = oP.rotateZoomImage.getCenter();
            // note the x and y still needed dialing in. just due to the size of each image
            oP.moveImage = scene.add.image(c.x+0.5, c.y+1, 'ui', 'moveStars');
        }
    }
};