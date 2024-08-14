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
exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield prisma.category.findUnique({
            where: {
                id: parseInt(req.params.categoryId),
            },
        });
        res.status(200).json(category);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, taxApplicable, tax, taxType, subCategories, } = req.body;
    try {
        yield prisma.category.create({
            data: {
                name,
                image,
                description,
                taxApplicable,
                tax,
                taxType,
                subCategories: {
                    connect: [...subCategories],
                },
            },
        });
        res.status(201).json({ message: "Category created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, taxApplicable, tax, taxType } = req.body;
    try {
        yield prisma.category.update({
            where: {
                id: parseInt(req.params.categoryId),
            },
            data: {
                name,
                image,
                description,
                taxApplicable,
                tax,
                taxType,
            },
        });
        res.status(201).json({ message: "Category updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
    }
});
exports.updateCategory = updateCategory;
//# sourceMappingURL=categoryControllers.js.map