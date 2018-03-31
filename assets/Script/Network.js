window.network = {
    extends: cc.Component,

    properties: {
        bConnect:false,
        ws:null,
    },

    isConnected: function() {
        return this.bConnect;
    },

    init: function() {
        var net = this;
        var onlineUrl = "wss://xyx.lilithgame.com:10020/";
        var testUrl = "ws://127.0.0.1:10020/";
        var ws = new WebSocket(onlineUrl);
        this.ws = ws;
        ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
            net.bConnect = true;
        };
        ws.onmessage = function (event) {
            var response = JSON.parse(event.data)
            // console.log("response msg code: " + response.code);
            net.handleResponse(response);
        };
        ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };
    },

    login: function(params) {
        var params = {code:"login", name:params.name, photo:params.photo};
        this.ws.send(JSON.stringify(params));
    }, 

    fire: function(pos, rotation) {
        var params = {code:"fire", pos:pos, rotation:rotation};
        this.ws.send(JSON.stringify(params));
    },

    score:function(pos, score) {
        var params = {code:"score", pos:pos, score:score};
        this.ws.send(JSON.stringify(params));
    },

    ready: function() {
        var params = {code:"ready"};
        this.ws.send(JSON.stringify(params));
    },

    close: function() {
        this.ws.close();
    },

    handleResponse: function(response) {
        var code = response.code;
        if(code == "login") {
            onFire.fire("start_game", response);
        } else if(code == "tick") {
            onFire.fire("server_tick", response);
        } else if(code == "score") {
            onFire.fire("add_score", response);
        }
    }
};