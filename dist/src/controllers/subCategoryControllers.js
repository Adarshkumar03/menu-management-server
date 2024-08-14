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
exports.updateSubCategory = exports.createSubCategory = exports.getSubCategory = exports.getSubCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield prisma.subCategory.findMany();
        res.status(200).json(subCategories);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getSubCategories = getSubCategories;
const getSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("1111 Inside Get Category with id:", req.params.subCategoryId);
        const subCategory = yield prisma.subCategory.findUnique({
            where: {
                id: parseInt(req.params.categoryId),
            },
        });
        console.log("2222 Inside Get Category with id:", req.params.subCategoryId);
        console.log(subCategory);
        res.status(200).json(subCategory);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getSubCategory = getSubCategory;
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, taxApplicable, tax, categoryId, items } = req.body;
    try {
        yield prisma.subCategory.create({
            data: {
                name,
                image,
                description,
                taxApplicable,
                tax,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
                items: {
                    connect: [...items],
                },
            },
        });
        res.status(201).json({ message: "SubCategory created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error });
    }
});
exports.createSubCategory = createSubCategory;
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, description, taxApplicable, tax } = req.body;
    try {
        yield prisma.category.update({
            where: {
                id: parseInt(req.params.subCategoryId),
            },
            data: {
                name,
                image,
                description,
                taxApplicable,
                tax,
            },
        });
        res.status(201).json({ message: "SubCategory updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error });
    }
});
exports.updateSubCategory = updateSubCategory;
//# sourceMappingURL=subCategoryControllers.js.map