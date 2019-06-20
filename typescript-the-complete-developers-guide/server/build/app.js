"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var controller_1 = require("./decorators/controller");
require("./auth/controller");
var routes_1 = require("./auth/routes");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_session_1.default({ keys: ['some-secret-key'] }));
app.use('/', routes_1.router);
app.use(controller_1.router);
app.listen(3000, function () {
    console.log('app running');
});
