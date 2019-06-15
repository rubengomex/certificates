"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var HtmlReport = /** @class */ (function () {
    function HtmlReport(filename) {
        this.filename = filename;
    }
    HtmlReport.prototype.print = function (report) {
        var html = "\n      <div>\n        <h1> Analysis Output: </h1>\n        <div>" + report + "</div>\n      </div>\n    ";
        fs_1.writeFileSync(this.filename, html);
    };
    return HtmlReport;
}());
exports.HtmlReport = HtmlReport;
