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

        id:0,
        MAX_LENGTH:800,
        rotationAngle: 210,
        rotationDirection: 1,
        rotationSpeed: 1,
        fireSpeed: 100,
        pullSpeed: 100,
        state: "IDLE",
        catch: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    fire () {
        if(this.state == "IDLE") {
            this.catch = false;
            this.state = "FIRE";
        }
    },

    update (dt) {
        
    },

    tick: function(dt) {
        console.log("hook tick");
        if(this.state == "FIRE") {
            this.node.x += Math.cos(this.rotationAngle * Math.PI / 180) * this.fireSpeed * dt;
            this.node.y -= Math.sin(this.rotationAngle * Math.PI / 180) * this.fireSpeed * dt;
            var length = cc.v2(this.node.x, this.node.y).mag();
            if(length >= this.MAX_LENGTH) {
                this.state = "PULL";
            }
        } else if(this.state == "PULL") {
            var pullSpeed = this.pullSpeed;
            if(this.catch) {
                pullSpeed /= 2;
            }
            this.node.x -= Math.cos(this.rotationAngle * Math.PI / 180) * pullSpeed * dt;
            this.node.y += Math.sin(this.rotationAngle * Math.PI / 180) * pullSpeed * dt;
            if(this.node.y <= 0) {
                this.node.setPosition(cc.v2(0, 0));
                this.state = "IDLE";
            }
        } else if(this.state == "IDLE") {
            if(this.rotationAngle >= 330) {
                this.rotationDirection = -1;
            }
            if(this.rotationAngle <= 210) {
                this.rotationDirection = 1;
            }
            this.rotationAngle += this.rotationDirection * this.rotationSpeed * dt;
            this.node.rotation = this.rotationAngle;
        }
    },

    onCollisionEnter: function (other, self) {
       
    },
});
