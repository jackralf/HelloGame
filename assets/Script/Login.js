require("Network");
window.onFire = require("onfire");

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
        editName:{
            default:null,
            type:cc.EditBox
        },
        photo:"",
        ctime: null,
        audioClick: {
            type: cc.AudioSource,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        network.init();
        onFire.on("login_scene", this.onLoginScene, this);
        try {
            if(FBInstant) {

            }
        } catch (error) {
            window.FBInstant = null;
        }
    },

    startGame: function(params) {
        clearTimeout(this.ctime);
        Toast.showText("进入游戏中", Toast.LENGTH_LONG);
        this.getComponent("cc.AudioSource").pause();
        cc.director.loadScene("helloworld", function() {
            onFire.fire("start_scene", params);
        });
    },

    onLoginScene: function(params) {
        
    },

    start () {
        if(FBInstant) {
            var playerName = FBInstant.player.getName();
            if(playerName != null && playerName != "") {
                this.editName.string = playerName;
            }
            this.photo = FBInstant.player.getPhoto();
        }
        else {
            var name = cc.sys.localStorage.getItem("name");
            if(name != null && name != "") {
                this.editName.string = name;
            }
        }
        onFire.one("start_game", this.startGame, this);
    },

    callback: function (event, customEventData) {
        console.log("start ...");
        this.audioClick.play();
        var name = this.editName.string;
        if(name == "") {
            Toast.showText("请输入名字", Toast.LENGTH_LONG);
            return;
        }
        cc.sys.localStorage.setItem("name", name);

        if(network.isConnected()) {
            Toast.showText("正在匹配中...", Toast.LENGTH_MAX);
            var params = {name:name, photo:this.photo};
            network.login(params);
            this.ctime = setTimeout(function() {
                Toast.showText("请邀请好友一起玩!!!", Toast.LENGTH_LONG);
            }, 6000);
        } else {
            Toast.showText("网络异常", Toast.LENGTH_LONG);
            network.init();
        }
    },
    // update (dt) {},
});
