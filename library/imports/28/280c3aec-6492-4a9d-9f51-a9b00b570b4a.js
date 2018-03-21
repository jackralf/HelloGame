"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

"use strict";

require("Config");

cc.Class({
    extends: cc.Component,

    properties: {
        t_prefab: {
            default: null,
            type: cc.Prefab
        },
        hook: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var winSize = cc.director.getWinSize();
        console.log("win size width:" + winSize.width + ", height:" + winSize.height);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        for (var i = 0; i < fishes.length; i++) {
            var config = fishes[i];
            var fish = cc.instantiate(this.t_prefab);
            fish.parent = this.node;
            var js = fish.getComponent("Fish");
            js.direction = config.direction;
            js.speed = config.speed;
            fish.setPosition(config.x, config.y);
        }
    },

    // called every frame
    update: function update(dt) {},

    callback: function callback(event, customEventData) {
        console.log("fire ....");
        var hook = this.hook.getComponent("Hook");
        hook.fire();
    }
});

cc._RF.pop();