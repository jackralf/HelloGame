"use strict";
cc._RF.push(module, '5b6f5UiYLtC6K3pyiE4Amsb', 'Fish');
// Script/Fish.js

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
        onCatched: false,
        hookNode: {
            default: null,
            type: cc.Node
        },
        delta: {
            default: null,
            type: cc.Vec2
        },
        direction: 1,
        speed: 100
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {},


    tick: function tick(dt) {
        if (this.hookNode && this.delta && this.onCatched) {
            var worldPos = this.hookNode.parent.convertToWorldSpace(this.hookNode.position);
            this.node.setPosition(this.node.parent.convertToNodeSpace(worldPos).add(this.delta));
            var hook = this.hookNode.getComponent("Hook");
            if (hook.state == "IDLE") {
                this.node.destroy();
            }
        } else {
            this.node.x += this.speed * this.direction * dt;
            if (this.node.x >= 700 || this.node.x <= -700) {
                this.direction = -this.direction;
            }
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('on collision enter2');
        var hook = other.getComponent("Hook");
        console.log("state:" + hook.state);
        if (hook.state == "FIRE") {
            hook.catch = true;
            hook.state = "PULL";

            this.onCatched = true;
            this.hookNode = other.node;
            this.node.color = cc.Color.RED;
            var worldPos = this.hookNode.parent.convertToWorldSpace(this.hookNode.position);
            this.delta = this.node.position.sub(this.node.parent.convertToNodeSpace(worldPos));
            cc.log("Node Position: " + this.delta);
        }
    }
});

cc._RF.pop();