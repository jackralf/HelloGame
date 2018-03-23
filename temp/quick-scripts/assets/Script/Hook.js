(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Hook.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '236575cmhFLqr84WPdE08z7', 'Hook', __filename);
// Script/Hook.js

"use strict";

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

        MAX_LENGTH: 800,
        rotationAngle: 0,
        rotationDirection: 1,
        rotationSpeed: 1,
        fireSpeed: 100,
        pullSpeed: 100,
        state: "IDLE",
        catch: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    fire: function fire() {
        if (this.state == "IDLE") {
            this.catch = false;
            this.state = "FIRE";
        }
    },
    update: function update(dt) {},


    tick: function tick(dt) {
        if (this.state == "FIRE") {
            this.node.x += Math.cos(this.rotationAngle * Math.PI / 180) * this.fireSpeed * dt;
            this.node.y -= Math.sin(this.rotationAngle * Math.PI / 180) * this.fireSpeed * dt;
            var length = cc.v2(this.node.x, this.node.y).mag();
            if (length >= this.MAX_LENGTH) {
                this.state = "PULL";
            }
        } else if (this.state == "PULL") {
            var pullSpeed = this.pullSpeed;
            if (this.catch) {
                pullSpeed /= 2;
            }
            this.node.x -= Math.cos(this.rotationAngle * Math.PI / 180) * pullSpeed * dt;
            this.node.y += Math.sin(this.rotationAngle * Math.PI / 180) * pullSpeed * dt;
            if (this.node.y >= 0) {
                this.node.setPosition(cc.v2(0, 0));
                this.state = "IDLE";
            }
        } else if (this.state == "IDLE") {
            if (this.rotationAngle >= 180) {
                this.rotationDirection = -1;
            }
            if (this.rotationAngle <= 0) {
                this.rotationDirection = 1;
            }
            this.rotationAngle += this.rotationDirection * this.rotationSpeed * dt;
            this.node.rotation = this.rotationAngle;
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Hook.js.map
        