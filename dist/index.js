"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeederDikti = void 0;
const node_fetch_1 = require("node-fetch");
const Response_1 = require("./classes/Response");
const get_actions_1 = require("./constants/get.actions");
const insert_actions_1 = require("./constants/insert.actions");
const delete_actions_1 = require("./constants/delete.actions");
const update_actions_1 = require("./constants/update.actions");
/**
 * Mendapatkan URL Endpoint
 */
function getEndpoint(host, endpoint) {
    return `${host}/${endpoint}`;
}
/**
 * Membuat body dengan method post dan data berupa json
 */
function createPostJsonBody(data, agent) {
    return {
        method: "post",
        body: JSON.stringify(Object.assign({ act: data.act }, data.body)),
        headers: { "Content-Type": "application/json" },
        agent: agent,
    };
}
class FeederDikti {
    constructor(options) {
        this.options = {
            host: "",
            username: "",
            password: "",
            endpoint: "ws/live2.php",
        };
        Object.assign(this.options, options);
    }
    /**
     * Mendapatkan Token untuk dipakai sebagai parameter di fungsi web service lainnya
     * `act: "GetToken"`
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: "GetToken",
                    body: {
                        username: this.options.username,
                        password: this.options.password,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const creds = new Response_1.default(response, "GetToken");
                if (creds.data) {
                    this.token = creds.data.token;
                    return this.token;
                }
                throw creds.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Mengambil data
     * @param action Jenis data yang ingin diambil
     * @param options Opsi dalam pengambilan data
     */
    get(action, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    options.token = yield this.getToken();
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: get_actions_1.GetActions[action],
                    body: options,
                }, this.options.agent));
                const response = yield request.json();
                const result = new Response_1.default(response, get_actions_1.GetActions[action]);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Menambahkan data
     * @param action Jenis data yang ingin ditambahkan
     * @param record Isi data yang ingin ditambahkan
     * @param options Opsi dalam penambahan data
     */
    insert(action, record, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: insert_actions_1.InsertActions[action],
                    body: {
                        token: options.token,
                        record,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const result = new Response_1.default(response, insert_actions_1.InsertActions[action]);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Memperbarui data
     * @param action Jenis data yang ingin diperbarui
     * @param key Key dari data yang ingin diperbarui
     * @param record Isi dari data yang ingin diperbarui
     * @param options Opsi dalam pembaruan data
     */
    update(action, key, record, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: update_actions_1.UpdateActions[action],
                    body: {
                        token: options.token,
                        key,
                        record,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const result = new Response_1.default(response, update_actions_1.UpdateActions[action]);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
    /**
     * Menghapus data
     * @param action Jenis data yang ingin dihapus
     * @param key Key dari data yang ingin dihapus
     * @param options Opsi dalam penghapusan data
     */
    delete(action, key, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!options || (options && !options.token)) {
                    if (!this.token) {
                        yield this.getToken();
                    }
                    options.token = this.token;
                }
                const request = yield node_fetch_1.default(getEndpoint(this.options.host, this.options.endpoint), createPostJsonBody({
                    act: delete_actions_1.DeleteActions[action],
                    body: {
                        token: options.token,
                        key,
                    },
                }, this.options.agent));
                const response = yield request.json();
                const result = new Response_1.default(response, delete_actions_1.DeleteActions[action]);
                if (result.data) {
                    return result.data;
                }
                throw result.error;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.FeederDikti = FeederDikti;
