"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.get = function (path) { return function (target, key) {
    Reflect.defineMetadata('path', path, target, key);
}; };
