"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var routing_1 = require("../routing");
var MetadataKeys_1 = require("./MetadataKeys");
var bodyValidators = function (keys) { return function (req, res, next) {
    if (!req.body)
        return res.status(422).send('Invalid request');
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (!req.body[key])
            return res.status(422).send("Property " + key + " was not provided");
    }
    next();
}; };
exports.controller = function (routePrefix) { return function (target) {
    var router = routing_1.AppRouter.getInstance();
    for (var key in target.prototype) {
        var routeHandler = target.prototype[key];
        var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.PATH, target.prototype, key);
        var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.METHOD, target.prototype, key);
        var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, target.prototype, key) || [];
        var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.BODY_VALIDATOR, target.prototype, key) ||
            [];
        var validateBody = bodyValidators(requiredBodyProps);
        if (path) {
            router[method].apply(router, ["" + routePrefix + path].concat(middlewares, [validateBody,
                routeHandler]));
        }
    }
}; };
