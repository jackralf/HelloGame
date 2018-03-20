"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        player1: {
            default: null,
            type: cc.Sprite
        },
        player2: {
            default: null,
            type: cc.Sprite
        },
        fish: {
            default: null,
            type: cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var winSize = cc.director.getWinSize();
        console.log("win size width:" + winSize.width + ", height:" + winSize.height);
        this.player1.node.x = -200;
        this.player2.node.x = 200;
        this.player1.node.y = winSize.height / 2 - 100;
        this.player2.node.y = winSize.height / 2 - 100;
    },

    // called every frame
    update: function update(dt) {
        this.fish.node.x += 1;
    }
});

cc._RF.pop();