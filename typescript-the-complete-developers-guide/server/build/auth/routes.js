"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (!req.session || !req.session.loggedIn) {
        res.status(403).send('Not permitted');
    }
    next();
}
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    if (!req.session || !req.session.loggedIn)
        return res.send("\n    <div>\n      <div> You are not logged in</div>\n      <a href=\"/login\"> Login </a>\n    </div>\n  ");
    res.send("\n    <div>\n      <div> You are logged in</div>\n      <a href=\"/logout\"> Logout </a>\n    </div>\n  ");
});
router.get('/login', function (req, res) {
    return res.send("\n  <form method=\"POST\">\n    <div>\n      <label>Email</label>\n      <input name=\"email\" />\n    </div>\n    <div>\n      <label>Password</label>\n      <input type=\"password\" name=\"password\" />\n    </div>\n    <button>Submit</button>\n  </form>\n");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password)
        return res.send('Invalid email or password');
    if (email === 'hi@hi.com' && password === 'pass') {
        req.session = { loggedIn: true };
        return res.redirect('/');
    }
    res.send('invalid email or password');
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route');
});
