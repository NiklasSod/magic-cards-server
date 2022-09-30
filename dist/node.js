"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer_1.default.createTransport({
    port: 25,
    host: "smtp.freesmtpservers.com",
    secure: false,
    tls: {
        ciphers: "SSLv3",
    },
});
//# sourceMappingURL=node.js.map