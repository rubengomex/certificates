"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analyzers_1 = require("../analyzers");
var reports_1 = require("../reports");
var Summary = /** @class */ (function () {
    function Summary(analyzer, target) {
        this.analyzer = analyzer;
        this.target = target;
    }
    Summary.winsAnalysisAndHtmlReport = function (team, filename) {
        return new Summary(new analyzers_1.WinsAnalysis(team), new reports_1.HtmlReport(filename));
    };
    Summary.prototype.buildAndPrintReport = function (matches) {
        var output = this.analyzer.run(matches);
        this.target.print(output);
    };
    return Summary;
}());
exports.Summary = Summary;
