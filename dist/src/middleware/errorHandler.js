"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: {
                code: 'E_VALIDATION',
                message: 'Validation failed',
                details: err.flatten().fieldErrors
            }
        });
        return;
    }
    if (err instanceof Error) {
        res.status(500).json({
            error: {
                code: 'E_INTERNAL',
                message: err.message
            }
        });
        return;
    }
    res.status(500).json({
        error: {
            code: 'E_INTERNAL',
            message: 'Unexpected error'
        }
    });
}
