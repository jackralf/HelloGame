require("Config")

cc.Class({
    extends: cc.Component,

    properties: {
        t_prefab:{
            default:null,
            type:cc.Prefab
        },
        hook: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var winSize = cc.director.getWinSize();
        console.log("win size width:" + winSize.width + ", height:" + winSize.height);
        
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        for(var i = 0; i < fishes.length; i ++) {
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
    update: function (dt) {

    },

    callback: function (event, customEventData) {
        console.log("fire ....");
        var hook = this.hook.getComponent("Hook");
        hook.fire();
    }
});
