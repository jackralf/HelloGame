// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        result: {
            default: null,
            type: cc.Label
        },
        myrank: {
            default: null,
            type: cc.Label
        },
        rank1: {
            default: null,
            type: cc.Label
        },
        rank2: {
            default: null,
            type: cc.Label
        },
        rank3: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        onFire.on("result_scene", this.onResult, this);
    },

    onResult: function(params) {
        var pos = params.pos;
        var score1 = params.score1;
        var score2 = params.score2;
        var name1 = params.name1;
        var name2 = params.name2;
        var myScore = score1;
        var myName = params.name1;
        if(pos == 2) {
            myScore = score2;
            myName = params.name2;
        }
       
        
        if(score1 >= score2) {
            if(pos == 1) {
                this.result.string = "WIN";
            } else {
                this.result.string = "LOSE";
            }
        } else {
            if(pos == 1) {
                this.result.string = "LOSE";
            } else {
                this.result.string = "WIN";
            }
        }

        var myRankLabel = this.myrank;
        var rank1Label = this.rank1;
        var rank2Label = this.rank2;
        var rank3Label = this.rank3;
        if(FBInstant) {
            FBInstant.getLeaderboardAsync('ranklist')
                .then(function(leaderboard) {
                    var extra = {};
                    extra.name = myName;
                    return leaderboard.setScoreAsync(myScore, JSON.stringify(extra));
                })
                .then(function(entry) {
                    console.log(entry.getScore()); // 42
                    console.log(entry.getExtraData()); // '{race: "elf", level: 3}'

                    FBInstant.getLeaderboardAsync('ranklist')
                        .then(function(leaderboard) {
                            return leaderboard.getPlayerEntryAsync();
                        })
                        .then(function(entry) {
                            console.log(entry.getRank()); // 2
                            console.log(entry.getScore()); // 42
                            console.log(entry.getExtraData()); // '{race: "elf", level: 3}'
                            var extra = JSON.parse(entry.getExtraData());
                            myRankLabel.string = extra.name + " rank:" + entry.getRank() + " score:" + entry.getScore();
                        });

                    FBInstant.getLeaderboardAsync('ranklist')
                        .then(function(leaderboard) {
                            return leaderboard.getEntriesAsync();
                        })
                        .then(function(entries) {
                            console.log(entries.length); // 10
                            var entry1 = entries[0];
                            var entry2 = entries[1];
                            var entry3 = entries[2];
                            if(entry1) {
                                var extra1 = JSON.parse(entry1.getExtraData());
                                rank1Label.string = extra1.name + " rank:" + entry1.getRank() + " score:" + entry1.getScore();
                            } else {
                                rank1Label.string = "";
                            }
                            if(entry2) {
                                var extra2 = JSON.parse(entry2.getExtraData());
                                rank2Label.string = extra2.name + " rank:" + entry2.getRank() + " score:" + entry2.getScore();
                            } else {
                                rank2Label.string = "";
                            }
                            if(entry3) {
                                var extra3 = JSON.parse(entry3.getExtraData());
                                rank3Label.string = extra3.name + " rank:" + entry3.getRank() + " score:" + entry3.getScore();
                            } else {
                                rank3Label.string = "";
                            }
                        });
            });
        }
        else {
            myRankLabel.string = myName + " score:" + myScore;
            rank1Label.string = "";
            rank2Label.string = "";
            rank3Label.string = "";
        }

    },

    start () {

    },

    callback: function (event, customEventData) {
        cc.director.loadScene("login", function() {
            
        });
    },
    // update (dt) {},
});
