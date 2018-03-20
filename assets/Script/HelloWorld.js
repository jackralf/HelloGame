cc.Class({
    extends: cc.Component,

    properties: {
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
