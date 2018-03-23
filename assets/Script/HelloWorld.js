require("Config")

cc.Class({
    extends: cc.Component,

    properties: {
        t_prefab:{
            default:null,
            type:cc.Prefab
        },
        hook1: {
            default: null,
            type: cc.Node
        },
        hook2: {
            default: null,
            type: cc.Node
        },
        selfHook: {
            default: null,
            type: cc.Node
        },
        name1: {
            default: null,
            type: cc.Label
        },
        name2: {
            default: null,
            type: cc.Label
        },
        pos:0,
        logicDelta:0.1,
        ticks:0,
        fishArr:[],
        operation:[],
    },

    // use this for initialization
    onLoad: function () {
        var winSize = cc.director.getWinSize();
        console.log("win size width:" + winSize.width + ", height:" + winSize.height);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

        onFire.on("start_scene", this.startGame, this);
        onFire.on("player_fire", this.playerFire, this);

        for(var i = 0; i < fishes.length; i ++) {
            var config = fishes[i];
            var fish = cc.instantiate(this.t_prefab);
            fish.parent = this.node;
            var js = fish.getComponent("Fish");
            js.direction = config.direction;
            js.speed = config.speed;
            fish.setPosition(config.x, config.y);
            this.fishArr.push(fish);
        }        
    },

    startGame: function(params) {
        this.name1.string = params.name1;
        this.name2.string = params.name2;
        this.pos = params.pos;
        if(this.pos == 1) {
            this.selfHook = this.hook1;
        } else if(this.pos == 2) {
            this.selfHook = this.hook2;
        }
    },

    playerFire: function(params) {
        var pos = params.pos;
        var rotation = params.rotation;
        if(pos == 1) {
            var hook = this.hook1.getComponent("Hook");
            hook.rotationAngle = rotation;
            hook.fire();
        } else {
            var hook = this.hook2.getComponent("Hook");
            hook.rotationAngle = rotation;
            hook.fire();
        }
    },

    // called every frame
    update: function (dt) {
        this.tick();
    },

    tick: function() {

        for(var i = 0; i < this.fishArr.length; i ++) {
            var fish = fishArr[i];
            if(cc.isValid(fish)) {
                var js = fish.getComponent("Fish");
                js.tick(this.logicDelta);    
            }
        }

        var jsHook1 = this.hook1.getComponent("Hook");
        var jsHook2 = this.hook2.getComponent("Hook");
        jsHook1.tick(this.logicDelta);
        jsHook2.tick(this.logicDelta);

        this.ticks += 1;
    },

    callback: function (event, customEventData) {
        console.log("fire ....");
        var hook = this.selfHook.getComponent("Hook");
        // hook.fire();
        network.fire(this.pos, hook.rotationAngle);
    },
});
