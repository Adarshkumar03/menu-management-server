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
exports.updateItem = exports.createItem = exports.getItemByName = exports.getItem = exports.getItems = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield prisma.item.findMany();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getItems = getItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield prisma.item.findUnique({
            where: {
                id: parseInt(req.params.itemId),
            },
        });
        res.status(200).json(item);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getItem = getItem;
const getItemByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield prisma.item.findFirst({
            where: {
                name: req.body.name,
            },
        });
        res.status(200).json(item);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getItemByName = getItemByName;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, taxApplicable, tax, subCategoryId, baseAmount, discount, totalAmount, } = req.body;
    try {
        yield prisma.item.create({
            data: {
                name,
                image,
                description,
                taxApplicable,
                tax,
                baseAmount,
                discount,
                totalAmount,
                subCategory: {
                    connect: {
                        id: subCategoryId,
                    },
                },
            },
        });
        res.status(201).json({ message: "item created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error });
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, taxApplicable, tax } = req.body;
    try {
        yield prisma.item.update({
            where: {
                id: parseInt(req.params.itemId),
            },
            data: {
                name,
                image,
                description,
                taxApplicable,
                tax,
            },
        });
        res.status(201).json({ message: "item updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
    }
});
exports.updateItem = updateItem;
//# sourceMappingURL=itemControllers.js.map