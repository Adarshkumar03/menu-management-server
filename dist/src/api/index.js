"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const item_1 = __importDefault(require("../routes/item"));
const item_2 = __importDefault(require("../routes/item"));
const subCategory_1 = __importDefault(require("../routes/subCategory"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/category", item_1.default);
app.use("/subCategory", subCategory_1.default);
app.use("/item", item_2.default);
app.listen(3000, () => {
    console.log("App Listening on PORT 3000");
});
//# sourceMappingURL=index.js.map