"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
exports.validateBody = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.BODY_VALIDATOR, keys, target, key);
    };
};
