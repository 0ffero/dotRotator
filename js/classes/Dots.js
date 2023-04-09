let Dots = class {
    constructor() {
        // grab the default vars needed to generate the dots
        let aD = vars.App.dots;
        this.dotCount = aD.count;
        this.scene = vars.getScene();

        this.settings = {
            offsetX: {
                min: -20,
                max: 20,
                change: 1,
                current: 0
            },
            offsetY: {
                min: -20,
                max: 20,
                change: 1,
                current: 0
            },
            rotation: {
                min: -15,
                max: 15,
                change: 0.25,
                current: 4,
            },
            scale: {
                min: 0.9,
                max: 1.1,
                change: 0.01,
                current: 1
            }
        }

        this.initDots();
        this.initInput();

        vars.App.ready = true;
    }

    initDots() {
        let scene = this.scene;
        let cC = consts.canvas;
        let s = this.settings;

        // generate the balls
        let graphics = scene.make.graphics();
        graphics.fillStyle(0xCCCCCC, 1);
        for (var d = 0; d < this.dotCount; d++) {
            let ball = { x: Math.random() * cC.width, y: Math.random() * cC.height, a: Math.random() * 1 * Math.PI };
            graphics.fillCircle(ball.x, ball.y, ball.a);
        };

        graphics.generateTexture('dots',cC.width,cC.height);
        graphics.clear();

        this.background = scene.add.image(cC.cX,cC.cY,'dots');
        this.dots = scene.add.image(cC.cX,cC.cY,'dots').setScale(s.scale.current).setAngle(s.rotation.current).setInteractive();
        scene.input.setDraggable(this.dots);
    }

    initInput() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    checkInput() {
        // check for left and right cursors
        if (this.cursors.left.isDown) {
            if (this.cursors.shift.isDown) {
                this.modifyRotation(false);
            } else {
                this.modifyOffset({x:-1,y:0});
            };
        } else if (this.cursors.right.isDown) {
            if (this.cursors.shift.isDown) {
                this.modifyRotation(true);
            } else {
                this.modifyOffset({x:1,y:0});
            };
        };
        
        // check for up and down cursors
        if (this.cursors.up.isDown) {
            if (this.cursors.shift.isDown) {
                this.modifyScale(true);
            } else {
                this.modifyOffset({x:0,y:-1});
            };
        } else if (this.cursors.down.isDown) {
            if (this.cursors.shift.isDown) {
                this.modifyScale(false);
            } else {
                this.modifyOffset({x:0,y:1});
            };
        };
    }

    modifyOffset(_v={ x:0,_y:0 }) {
        let s = this.settings;
        let offsetX = s.offsetX;
        let offsetY = s.offsetY;

        let modX = _v.x * offsetX.change;
        let modY = _v.y * offsetY.change;

        offsetX.current+=modX;
        offsetY.current+=modY;

        offsetX.current = offsetX.current>offsetX.max ? offsetX.max : offsetX.current<offsetX.min ? offsetX.min : offsetX.current;
        offsetY.current = offsetY.current>offsetY.max ? offsetY.max : offsetY.current<offsetY.min ? offsetY.min : offsetY.current;


        this.updateDotsImage();
    }

    modifyRotation(_inc=true) {
        let s = this.settings.rotation;
        let mod = _inc ? s.change : -s.change;
        s.current+=mod;
        s.current>s.max ? s.current=s.max : s.current<s.min && (s.current=s.min);
        this.updateDotsImage();
    }

    modifyScale(_inc=true) {
        let s = this.settings.scale;
        let mod = _inc ? s.change : -s.change;
        s.current+=mod;
        s.current>s.max ? s.current=s.max : s.current<s.min && (s.current=s.min);
        this.updateDotsImage();
    }

    update() {
        this.checkInput();
    }

    updateDotsImage() {
        let s = this.settings;
        let cC = consts.canvas;
        this.dots.setScale(s.scale.current).setAngle(s.rotation.current).setPosition(cC.cX+s.offsetX.current,cC.cY+s.offsetY.current);
    }
}