"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
exports.routeBinder = function (method) { return function (path) { return function (target, key) {
    Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.PATH, path, target, key);
    Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.METHOD, method, target, key);
}; }; };
exports.get = exports.routeBinder(Methods_1.Methods.GET);
exports.post = exports.routeBinder(Methods_1.Methods.POST);
exports.put = exports.routeBinder(Methods_1.Methods.PUT);
exports.remove = exports.routeBinder(Methods_1.Methods.DELETE);
exports.patch = exports.routeBinder(Methods_1.Methods.PATCH);
