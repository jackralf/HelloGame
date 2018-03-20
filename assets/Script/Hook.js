// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        rotationAngle: 0,
        rotationDirection: 1,
        rotationSpeed: 1,
        onFire: false,
        fireSpeed: 1,
        onCatch: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    fire () {
        this.onFire = true;
    },

    update (dt) {
        if(this.onCatch) {
            this.node.x -= Math.cos(this.rotationAngle * Math.PI / 180) * this.fireSpeed;
            this.node.y += Math.sin(this.rotationAngle * Math.PI / 180) * this.fireSpeed;
            if(Math.abs(this.node.y) < 0.5) {
                this.node.x = 0;
                this.node.y = 0;
                this.onFire = false;
                this.onCatch = false;
            }
        } else if(this.onFire) {
            this.node.x += Math.cos(this.rotationAngle * Math.PI / 180) * this.fireSpeed;
            this.node.y -= Math.sin(this.rotationAngle * Math.PI / 180) * this.fireSpeed;
        } else {
            if(this.rotationAngle >= 180) {
                this.rotationDirection = -1;
            }
            if(this.rotationAngle <= 0) {
                this.rotationDirection = 1;
            }
            this.rotationAngle += this.rotationDirection * this.rotationSpeed;
            this.node.rotation = this.rotationAngle;
        }
    },

    onCollisionEnter: function (other, self) {
        console.log('on collision enter1');
        this.onCatch = true;
    },
});
