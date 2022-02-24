"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseError_1 = require("./ResponseError");
class Response {
    constructor(data, action) {
        const code = Number(data.error_code);
        if (code === 0) {
            this.data = data.data;
        }
        else {
            this.error = new ResponseError_1.default(action, code, data.error_desc);
        }
    }
}
exports.default = Response;
