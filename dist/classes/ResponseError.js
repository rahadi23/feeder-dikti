"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError extends Error {
    constructor(action, code, message) {
        super(message);
        this.action = action;
        this.code = code;
    }
}
exports.default = ResponseError;
