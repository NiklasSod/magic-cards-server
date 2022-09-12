"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const rest_1 = require("./rest");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
// add cors rules(?)
app.use((0, cors_1.default)());
try {
    const database = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
    mongoose_1.default.connect(database);
}
catch (error) {
    console.log("ERROR: Verify that you have a correct db and password string in your config.env file");
}
(0, rest_1.rest)(app);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map