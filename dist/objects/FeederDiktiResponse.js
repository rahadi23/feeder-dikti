"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FeederDiktiResponseError_1 = require("../errors/FeederDiktiResponseError");
class FeederAPIResponse {
    constructor(data) {
        const code = Number(data.error_code);
        if (code === 0) {
            this.data = data.data;
        }
        else {
            this.error = new FeederDiktiResponseError_1.default(code, data.error_desc);
        }
    }
}
exports.default = FeederAPIResponse;
