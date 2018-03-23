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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        network.init();
        
    },

    startGame: function(params) {
        cc.log(params);
        cc.director.loadScene("helloworld", function() {
            onFire.fire("start_scene", params);
        });
    },

    start () {
        onFire.one("start_game", this.startGame, this);
    },

    callback: function (event, customEventData) {
        console.log("start ...");
        if(network.isConnected()) {
            network.login("jack");
        } else {
            console.log("net error!!!");
        }
    },
    // update (dt) {},
});
