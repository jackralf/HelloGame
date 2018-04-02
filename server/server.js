const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 10020 });

const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const log = log4js.getLogger('cheese');


function Room(player1, player2) {
    this.a=player1,
    this.b=player2,
    this.ticks=1,
    this.op = [],
    this.ready = 0,
    this.reply = function() {
        var response = {code:"login", status:"success", name1:player1.msg.name, name2:player2.msg.name, photo1:player1.msg.photo, photo2:player2.msg.photo};
        response.pos = 1;
        player1.ws.send(JSON.stringify(response));
        response.pos = 2;
        player2.ws.send(JSON.stringify(response));
        log.debug("create room success");
    }
}

var waitPlayers = new Set();
var playerRooms = new Set();

function noop() {}

function heartbeat() {
    this.isAlive = true;
}

const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping(noop);
    });
    closeEmptyRoom();
}, 5000);

function closeEmptyRoom() {
    for(var tmp of waitPlayers) {
        if(tmp.ws.readyState !== WebSocket.OPEN) {
            waitPlayers.delete(tmp);
        }
    }
}

wss.on('connection', function (ws, req) {
    log.debug("connected ip: %s", req.connection.remoteAddress);
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    ws.on('message', function (message) {
        var msg = JSON.parse(message);
        log.debug("receive message code:%s", msg.code);
        handleMessage(msg, ws);
    });
});

function handleMessage(msg, ws) {
    var code = msg.code;
    if(code == "login") {
        log.debug("login: %s", msg.name);
        makePair({ws:ws, msg:msg})
    } else if(code == "fire") {
        for(var room of playerRooms) {
            if(ws == room.a.ws || ws == room.b.ws) {
                var op = {}
                if(msg.pos == 1) {
                    op.pos1 = true;
                    op.rotation1 = msg.rotation;
                } else if(msg.pos == 2) {
                    op.pos2 = true;
                    op.rotation2 = msg.rotation;
                }
                room.op[room.ticks] = op;
            }
        }
    } else if(code == "ready") {
        for(var room of playerRooms) {
            if(ws == room.a.ws || ws == room.b.ws) {
                room.ready += 1;
                if(room.ready == 2) {
                    log.debug("room ready for tick");
                    var flag = setInterval(function tick() {
                        var idx = room.ticks;
                        var msg = {code:"tick", idx:idx};
                        if(room.op[room.ticks] != null) {
                            msg.op = room.op[room.ticks];
                        }
                        if(room.a.ws.readyState !== WebSocket.OPEN && room.b.ws.readyState !== WebSocket.OPEN) {
                            clearInterval(flag);
                        } else {
                            if(room.a.ws.readyState === WebSocket.OPEN) {
                                room.a.ws.send(JSON.stringify(msg));
                            }
                            if(room.b.ws.readyState === WebSocket.OPEN) {
                                room.b.ws.send(JSON.stringify(msg));
                            }
                            room.ticks += 1;
                        }
                    }, 100);
                }
            }
        }
    } else if(code == "score") {
        for(var room of playerRooms) {
            if (ws == room.a.ws || ws == room.b.ws) {
                if(room.a.ws.readyState === WebSocket.OPEN) {
                    room.a.ws.send(JSON.stringify(msg));
                }
                if(room.b.ws.readyState === WebSocket.OPEN) {
                    room.b.ws.send(JSON.stringify(msg));
                }
            }
        }
    }
}

function makePair(curPlayer) {
    log.debug("waitting player size: %d", waitPlayers.size);
    for(var tmp of waitPlayers) {
        if(tmp.ws == curPlayer.ws) {
            log.debug("delete the same waitting player: %s", tmp.msg.name);
            waitPlayers.delete(tmp);
        }
    }

    var player = null;
    for(var tmp of waitPlayers) {
        if(tmp.ws.readyState === WebSocket.OPEN && tmp.ws != curPlayer.ws) {
            player = tmp;
            break;
        }
    }
    if(player == null) {
        log.debug("waitting for another player");
        waitPlayers.add(curPlayer);
    } else {
        log.debug("create room begin");
        waitPlayers.delete(player);
        var room = new Room(curPlayer, player);
        playerRooms.add(room);
        room.reply();
    }
}

