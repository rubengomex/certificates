"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route');
});
