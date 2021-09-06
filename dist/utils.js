'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PardError = void 0;
class PardError extends Error {
    constructor(message, meta) {
        super(message);
        Object.assign(this, meta);
        Error.captureStackTrace(this, PardError);
    }
}
exports.PardError = PardError;
//# sourceMappingURL=utils.js.map