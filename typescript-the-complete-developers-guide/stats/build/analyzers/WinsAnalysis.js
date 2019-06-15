"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
var WinsAnalysis = /** @class */ (function () {
    function WinsAnalysis(team) {
        this.team = team;
    }
    WinsAnalysis.prototype.run = function (matches) {
        var _this = this;
        var wins = matches.reduce(function (acc, match) {
            if ((match[1] === _this.team && match[5] === enums_1.MatchResult.HomeWin) ||
                (match[2] === _this.team && match[5] === enums_1.MatchResult.AwayWin))
                acc++;
            return acc;
        }, 0);
        return "Team " + this.team + " won " + wins + " games!";
    };
    return WinsAnalysis;
}());
exports.WinsAnalysis = WinsAnalysis;
