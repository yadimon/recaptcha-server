'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
class Recaptcha {
    constructor(secret, timeout = 3000) {
        this.secret = secret;
        this.timeout = timeout;
        this.recapAxios = axios_1.default.create({
            baseURL: 'https://www.recaptcha.net',
            timeout
        });
    }
    verifyV3Async(token, minScore = 0.6) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: verifyResult } = yield this.recapAxios.post('recaptcha/api/siteverify', null, {
                    params: {
                        secret: this.secret,
                        response: token
                    }
                });
                const { success, score, action, hostname, challenge_ts, 'error-codes': errorCodes } = verifyResult;
                if (!success) {
                    throw new utils_1.PardError(`[recaptcha-server] Failed to verify recaptcha: ${errorCodes}`, {
                        type: 'RECAPTCHA_VERIFY_ERROR'
                    });
                }
                return {
                    isPassed: success && score > minScore,
                    score,
                    hostName: hostname,
                    action,
                    checkedAt: new Date()
                };
            }
            catch (error) {
                error.type = error.type || 'RECAPTCHA_UNEXPECTED_ERROR';
                throw error;
            }
        });
    }
}
exports.default = Recaptcha;
//# sourceMappingURL=recaptcha-server.js.map