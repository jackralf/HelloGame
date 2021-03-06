require("Config")

cc.Class({
    extends: cc.Component,

    properties: {
        t_prefab:{
            default:null,
            type:cc.Prefab
        },
        player1: {
            default: null,
            type: cc.Node
        },
        player2: {
            default: null,
            type: cc.Node
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
        score1: {
            default: null,
            type: cc.Label
        },
        score2: {
            default: null,
            type: cc.Label
        },
        time: {
            default: null,
            type: cc.Label
        },
        pos:0,
        logicDelta:0.1,
        perLogicDelta:0.02,
        ticks:1,
        fishArr:[],
        serverTick:[],
        perTickCount:0,
        MAX_TICK_COUNT: 5,
        canFire: false,
        nScore1:0,
        nScore2:0,
        nTime:60,
        sName1:"",
        sName2:"",
        sPhoto1:"",
        sPhoto2:"",
        audioClick: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        var winSize = cc.director.getWinSize();
        console.log("win size width:" + winSize.width + ", height:" + winSize.height);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        onFire.on("start_scene", this.startGame, this);
        onFire.on("server_tick", this.onServerTick, this);
        onFire.on("add_score", this.addScore, this);

        // this.ticks = 1;
        // this.fishArr = [];
        // this.serverTick = [];
        // this.perTickCount = 0;
        // this.nScore1 = 0;
        // this.nScore2 = 0;
        // this.nTime = 120;
        // this.sName1 = "";
        // this.sName2 = "";


        this.hook1.getComponent("Hook").id = 1;
        this.hook2.getComponent("Hook").id = 2;

        for(var i = 0; i < fishes.length; i ++) {
            var config = fishes[i];
            var fish = cc.instantiate(this.t_prefab);
            fish.parent = this.node;
            var js = fish.getComponent("Fish");
            js.id = config.id;
            js.type = config.type;
            js.score = config.score;
            js.direction = config.direction;
            js.speed = config.speed;
            js.init();
            fish.setPosition(config.x, config.y);
            this.fishArr.push(fish);
        }        

        network.ready();
        this.canFire = true;
    },

    onDestroy() {
        this.unscheduleAllCallbacks();
        onFire.un("start_scene");
        onFire.un("server_tick");
        onFire.un("add_score");
        this.getComponent("cc.AudioSource").pause();
    },

    startGame: function(params) {
        this.nTime = 60;
        this.sName1 = params.name1;
        this.sName2 = params.name2;
        this.name1.string = params.name1;
        this.name2.string = params.name2;
        this.score1.string = "0";
        this.score2.string = "0";
        this.pos = params.pos;
        if(this.pos == 1) {
            this.hook1.getComponent("Hook").isSelf = true;
            this.selfHook = this.hook1;
        } else if(this.pos == 2) {
            this.hook2.getComponent("Hook").isSelf = true;
            this.selfHook = this.hook2;
        }

        this.sPhoto1 = params.photo1;
        this.sPhoto2 = params.photo2;
        if(this.sPhoto1 != null && this.sPhoto1 != "") {
            console.log("photo1:" + this.sPhoto1);
            var player1 = this.player1;
            cc.loader.load(this.sPhoto1, function (err, texture) {
                var sprite = player1.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(texture);
            });
        }
        if(this.sPhoto2 != null && this.sPhoto2 != "") {
            console.log("photo2:" + this.sPhoto2);
            var player2 = this.player2;
            cc.loader.load(this.sPhoto2, function (err, texture) {
                var sprite = player2.getComponent(cc.Sprite);
                sprite.spriteFrame.setTexture(texture);
            });
        }

        var that = this;
        this.schedule(function() {
            that.showTime();
        }, 1);
    },

    showTime: function() {
        var m = parseInt(this.nTime / 60);
        var s = parseInt(this.nTime % 60);
        var str = m.toString() + ":" + s.toString();
        if(s < 10) {
            str = m.toString() + ":0" + s.toString();
        }
        this.time.string = str;
    },

    playerFire: function(params) {
        var pos = params.pos;
        var rotation = params.rotation;
        if(pos == 1) {
            var hook = this.hook1.getComponent("Hook");
            this.hook1.rotation = rotation;
            hook.rotationAngle = rotation;
            hook.fire();
        } else {
            var hook = this.hook2.getComponent("Hook");
            this.hook2.rotation = rotation;
            hook.rotationAngle = rotation;
            hook.fire();
        }
    },

    onServerTick: function(params) {
        this.nTime -= 0.1;
        if(this.nTime <= 0) {
            var params = {pos:this.pos, score1:this.nScore1, score2:this.nScore2, name1:this.sName1, name2:this.sName2};
            network.close();
            cc.director.loadScene("result", function() {
                onFire.fire("result_scene", params);
            });
        }
        this.serverTick[params.idx] = {};
        if(params.op) {
            this.serverTick[params.idx].op = params.op;
        }
    },

    addScore: function(params) {
        cc.log("add socre!!");
        var pos = params.pos;
        var score = params.score;
        if(pos == 1) {
            Toast.showText(this.sName1 + "抓到一张好牌,得到" + score + "分", Toast.LENGTH_LONG);
            this.nScore1 += score;
            this.score1.string = this.nScore1; 
        } else if(pos == 2) {
            Toast.showText(this.sName2 + "抓到一张好牌,得到" + score + "分", Toast.LENGTH_LONG);
            this.nScore2 += score;
            this.score2.string = this.nScore2;
        }
    },

    // called every frame
    update: function (dt) {
        
        if(this.serverTick[this.ticks] == null) {
            return;
        }

        if(this.serverTick[this.ticks + 1] != null) {
            this.canFire = false;
            for(var i = 0; i < this.MAX_TICK_COUNT - this.perTickCount; i ++) {
                this.tick(this.perLogicDelta);
            }
            this.ticks += 1;
            this.perTickCount = 0;
            this.canFire = true;
            return;      
        }
        
        if(this.serverTick[this.ticks] != null)
        {
            
            if(this.perTickCount < this.MAX_TICK_COUNT) {
                this.tick(this.perLogicDelta);
                this.perTickCount += 1;
            } else {
                this.ticks += 1;
                this.perTickCount = 0;
            }
        }
    },

    tick: function(dt) {
        for(var i = 0; i < this.fishArr.length; i ++) {
            var fish = this.fishArr[i];
            if(cc.isValid(fish)) {
                var js = fish.getComponent("Fish");
                js.tick(dt);    
            }
        }

        var op = this.serverTick[this.ticks].op;
        if(op != null) {
            if(op.pos1 != null) {
                this.playerFire({pos:1, rotation:op.rotation1})    
            } 
            if(op.pos2 != null) {
                this.playerFire({pos:2, rotation:op.rotation2}) 
            }
            this.serverTick[this.ticks].op = null;
        }

        var jsHook1 = this.hook1.getComponent("Hook");
        var jsHook2 = this.hook2.getComponent("Hook");
        jsHook1.tick(dt);
        jsHook2.tick(dt);
    },

    callback: function (event, customEventData) {
        this.audioClick.play();
        if(this.canFire == false) {
            console.log("can fire = false");
            return;
        }
        var hook = this.selfHook.getComponent("Hook");
        network.fire(this.pos, hook.rotationAngle);
    },
});
