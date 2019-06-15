"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv_1 = require("./readers/csv");
var statistics_1 = require("./statistics");
// Create an instance of MatchReader and pass in something satisfying the 'DataReader interface
var matchReader = csv_1.MatchReader.fromCsv('./resources/football.csv');
matchReader.load();
var summary = statistics_1.Summary.winsAnalysisAndHtmlReport('Man United', './src/output/report.html');
summary.buildAndPrintReport(matchReader.matches);
