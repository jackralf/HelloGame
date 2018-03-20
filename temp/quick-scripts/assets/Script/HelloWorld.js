(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HelloWorld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld', __filename);
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
        this.player1.node.x -= 1;
    }
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
        //# sourceMappingURL=HelloWorld.js.map
        