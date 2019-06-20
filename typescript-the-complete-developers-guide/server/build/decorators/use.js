"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
exports.use = function (middleware) { return function (target, key) {
    var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, target, key) || [];
    Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.MIDDLEWARE, middlewares.concat([middleware]), target, key);
}; };
