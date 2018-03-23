require=function s(r,c,a){function d(e,o){if(!c[e]){if(!r[e]){var t="function"==typeof require&&require;if(!o&&t)return t(e,!0);if(l)return l(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var i=c[e]={exports:{}};r[e][0].call(i.exports,function(o){var t=r[e][1][o];return d(t||o)},i,i.exports,s,r,c,a)}return c[e].exports}for(var l="function"==typeof require&&require,o=0;o<a.length;o++)d(a[o]);return d}({Config:[function(o,t,e){"use strict";cc._RF.push(t,"405ecrL3edLiLL9OL/F4PJK","Config"),window.fishes=[{id:1,type:1,score:100,direction:1,rotation:0,speed:100,x:0,y:0},{id:2,type:1,score:100,direction:-1,rotation:0,speed:200,x:-200,y:0},{id:3,type:1,score:100,direction:1,rotation:0,speed:100,x:0,y:200},{id:4,type:1,score:100,direction:-1,rotation:0,speed:100,x:0,y:-200},{id:5,type:1,score:100,direction:1,rotation:0,speed:200,x:100,y:-150},{id:6,type:1,score:100,direction:-1,rotation:0,speed:100,x:200,y:300}],cc._RF.pop()},{}],Fish:[function(o,t,e){"use strict";cc._RF.push(t,"5b6f5UiYLtC6K3pyiE4Amsb","Fish"),cc.Class({extends:cc.Component,properties:{onCatched:!1,hookNode:{default:null,type:cc.Node},delta:{default:null,type:cc.Vec2},direction:1,speed:100},onLoad:function(){},start:function(){},update:function(o){if(this.hookNode&&this.delta&&this.onCatched){var t=this.hookNode.parent.convertToWorldSpace(this.hookNode.position);this.node.setPosition(this.node.parent.convertToNodeSpace(t).add(this.delta)),"IDLE"==this.hookNode.getComponent("Hook").state&&this.node.destroy()}else this.node.x+=this.speed*this.direction*o,(700<=this.node.x||this.node.x<=-700)&&(this.direction=-this.direction)},onCollisionEnter:function(o,t){console.log("on collision enter2");var e=o.getComponent("Hook");if(console.log("state:"+e.state),"FIRE"==e.state){e.catch=!0,e.state="PULL",this.onCatched=!0,this.hookNode=o.node,this.node.color=cc.Color.RED;var n=this.hookNode.parent.convertToWorldSpace(this.hookNode.position);this.delta=this.node.position.sub(this.node.parent.convertToNodeSpace(n)),cc.log("Node Position: "+this.delta)}}}),cc._RF.pop()},{}],HelloWorld:[function(o,t,e){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),o("Config"),cc.Class({extends:cc.Component,properties:{t_prefab:{default:null,type:cc.Prefab},hook1:{default:null,type:cc.Node},hook2:{default:null,type:cc.Node},selfHook:{default:null,type:cc.Node},name1:{default:null,type:cc.Label},name2:{default:null,type:cc.Label},pos:0},onLoad:function(){var o=cc.director.getWinSize();console.log("win size width:"+o.width+", height:"+o.height);var t=cc.director.getCollisionManager();t.enabled=!0,t.enabledDebugDraw=!0,t.enabledDrawBoundingBox=!0,onFire.on("start_scene",this.startGame,this),onFire.on("player_fire",this.playerFire,this);for(var e=0;e<fishes.length;e++){var n=fishes[e],i=cc.instantiate(this.t_prefab);i.parent=this.node;var s=i.getComponent("Fish");s.direction=n.direction,s.speed=n.speed,i.setPosition(n.x,n.y)}},startGame:function(o){this.name1.string=o.name1,this.name2.string=o.name2,this.pos=o.pos,1==this.pos?this.selfHook=this.hook1:2==this.pos&&(this.selfHook=this.hook2)},playerFire:function(o){var t,e=o.pos,n=o.rotation;1==e?((t=this.hook1.getComponent("Hook")).rotationAngle=n,t.fire()):((t=this.hook2.getComponent("Hook")).rotationAngle=n,t.fire())},update:function(o){},callback:function(o,t){console.log("fire ....");var e=this.selfHook.getComponent("Hook");network.fire(this.pos,e.rotationAngle)}}),cc._RF.pop()},{Config:"Config"}],Hook:[function(o,t,e){"use strict";cc._RF.push(t,"236575cmhFLqr84WPdE08z7","Hook"),cc.Class({extends:cc.Component,properties:{MAX_LENGTH:800,rotationAngle:0,rotationDirection:1,rotationSpeed:1,fireSpeed:100,pullSpeed:100,state:"IDLE",catch:!1},onLoad:function(){},start:function(){},fire:function(){"IDLE"==this.state&&(this.catch=!1,this.state="FIRE")},update:function(o){if("FIRE"==this.state)this.node.x+=Math.cos(this.rotationAngle*Math.PI/180)*this.fireSpeed*o,this.node.y-=Math.sin(this.rotationAngle*Math.PI/180)*this.fireSpeed*o,cc.v2(this.node.x,this.node.y).mag()>=this.MAX_LENGTH&&(this.state="PULL");else if("PULL"==this.state){var t=this.pullSpeed;this.catch&&(t/=2),this.node.x-=Math.cos(this.rotationAngle*Math.PI/180)*t*o,this.node.y+=Math.sin(this.rotationAngle*Math.PI/180)*t*o,0<=this.node.y&&(this.node.setPosition(cc.v2(0,0)),this.state="IDLE")}else"IDLE"==this.state&&(180<=this.rotationAngle&&(this.rotationDirection=-1),this.rotationAngle<=0&&(this.rotationDirection=1),this.rotationAngle+=this.rotationDirection*this.rotationSpeed*o,this.node.rotation=this.rotationAngle)},onCollisionEnter:function(o,t){}}),cc._RF.pop()},{}],Login:[function(o,t,e){"use strict";cc._RF.push(t,"9b0a1YY7mxLZJHL+PsHMdTZ","Login"),o("Network"),window.onFire=o("onfire"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){network.init()},startGame:function(o){cc.log(o),cc.director.loadScene("helloworld",function(){onFire.fire("start_scene",o)})},start:function(){onFire.one("start_game",this.startGame,this)},callback:function(o,t){console.log("start ..."),network.isConnected()?network.login("jack"):console.log("net error!!!")}}),cc._RF.pop()},{Network:"Network",onfire:"onfire"}],Network:[function(o,t,e){"use strict";cc._RF.push(t,"d0660HWtshLJIhhZD7X1J1j","Network"),window.network={extends:cc.Component,properties:{bConnect:!1,ws:null},isConnected:function(){return this.bConnect},init:function(){var e=this,o=new WebSocket("ws://192.168.5.107:8080/");(this.ws=o).onopen=function(o){console.log("Send Text WS was opened."),e.bConnect=!0},o.onmessage=function(o){var t=JSON.parse(o.data);console.log("response msg code: "+t.code),e.handleResponse(t)},o.onerror=function(o){console.log("Send Text fired an error")},o.onclose=function(o){console.log("WebSocket instance closed.")}},login:function(o){var t={code:"login",name:o};this.ws.send(JSON.stringify(t))},fire:function(o,t){var e={code:"fire",pos:o,rotation:t};this.ws.send(JSON.stringify(e))},handleResponse:function(o){cc.log("response:"+o);var t=o.code;"login"==t?onFire.fire("start_game",o):"fire"==t&&onFire.fire("player_fire",o)}},cc._RF.pop()},{}],Player:[function(o,t,e){"use strict";cc._RF.push(t,"8a405pskMJFp7hlKJg2t+52","Player"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){},update:function(o){}}),cc._RF.pop()},{}],onfire:[function(o,t,e){"use strict";cc._RF.push(t,"53862u4MiJDa7zKJhOsii8V","onfire");var n,i,h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};n="undefined"!=typeof window?window:void 0,i=function(){var s={},i=0,r="string",c="function",a=Function.call.bind(Object.hasOwnProperty),e=Function.call.bind(Array.prototype.slice);function n(o,t,e,n){if((void 0===o?"undefined":h(o))!==r||(void 0===t?"undefined":h(t))!==c)throw new Error("args: "+r+", "+c);return a(s,o)||(s[o]={}),s[o][++i]=[t,e,n],[o,i]}function d(o,t){for(var e in o)a(o,e)&&t(e,o[e])}function l(e,n){a(s,e)&&d(s[e],function(o,t){t[0].apply(t[2],n),t[1]&&delete s[e][o]})}return{on:function(o,t,e){return n(o,t,0,e)},one:function(o,t,e){return n(o,t,1,e)},un:function(n){var o,t,i=!1,e=void 0===n?"undefined":h(n);return e===r?!!a(s,n)&&(delete s[n],!0):"object"===e?(o=n[0],t=n[1],!(!a(s,o)||!a(s[o],t)||(delete s[o][t],0))):e!==c||(d(s,function(e,o){d(o,function(o,t){t[0]===n&&(delete s[e][o],i=!0)})}),i)},fire:function(o){var t=e(arguments,1);setTimeout(function(){l(o,t)})},fireSync:function(o){l(o,e(arguments,1))},clear:function(){s={}}}},"object"===(void 0===t?"undefined":h(t))&&t.exports?t.exports=i():n.onfire=i(),cc._RF.pop()},{}]},{},["Config","Fish","HelloWorld","Hook","Login","Network","Player","onfire"]);