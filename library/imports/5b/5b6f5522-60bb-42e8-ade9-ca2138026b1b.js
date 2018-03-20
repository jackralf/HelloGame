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
        hook: {
            default: null,
            type: cc.Node
        },
        delta: {
            default: null,
            type: cc.Vec2
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},
    update: function update(dt) {
        if (this.hook && this.delta && this.onCatched) {
            var worldPos = this.hook.parent.convertToWorldSpace(this.hook.position);
            this.node.setPosition(this.node.parent.convertToNodeSpace(worldPos).add(this.delta));
        } else {
            this.node.x += 1;
        }
    },


    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('on collision enter2');
        this.onCatched = true;
        this.hook = other.node;
        this.node.color = cc.Color.RED;
        var worldPos = this.hook.parent.convertToWorldSpace(this.hook.position);
        this.delta = this.node.position.sub(this.node.parent.convertToNodeSpace(worldPos));
        cc.log("Node Position: " + this.delta);
    }
});

cc._RF.pop();