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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create Categories
        yield prisma.item.deleteMany({});
        yield prisma.subCategory.deleteMany({});
        yield prisma.category.deleteMany({});
        yield prisma.$executeRaw `ALTER SEQUENCE "Item_id_seq" RESTART WITH 1;`;
        yield prisma.$executeRaw `ALTER SEQUENCE "SubCategory_id_seq" RESTART WITH 1;`;
        yield prisma.$executeRaw `ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;`;
        const appetizers = yield prisma.category.create({
            data: {
                name: "Appetizers",
                image: "appetizers.png",
                description: "Start your meal with a delicious appetizer.",
                taxApplicable: true,
                tax: 5.0,
                taxType: "Percentage",
            },
        });
        const mainCourse = yield prisma.category.create({
            data: {
                name: "Main Course",
                image: "main_course.png",
                description: "Satisfying and hearty main dishes.",
                taxApplicable: true,
                tax: 10.0,
                taxType: "Percentage",
            },
        });
        const desserts = yield prisma.category.create({
            data: {
                name: "Desserts",
                image: "desserts.png",
                description: "Sweet treats to end your meal.",
                taxApplicable: true,
                tax: 8.0,
                taxType: "Percentage",
            },
        });
        // Create SubCategories
        const salads = yield prisma.subCategory.create({
            data: {
                name: "Salads",
                image: "salads.png",
                description: "Fresh and healthy salads.",
                taxApplicable: true,
                tax: 5.0,
                category: { connect: { id: appetizers.id } },
            },
        });
        const pasta = yield prisma.subCategory.create({
            data: {
                name: "Pasta",
                image: "pasta.png",
                description: "Delicious pasta dishes.",
                taxApplicable: true,
                tax: 10.0,
                category: { connect: { id: mainCourse.id } },
            },
        });
        const cakes = yield prisma.subCategory.create({
            data: {
                name: "Cakes",
                image: "cakes.png",
                description: "Decadent cakes for dessert.",
                taxApplicable: true,
                tax: 8.0,
                category: { connect: { id: desserts.id } },
            },
        });
        // Create Items
        yield prisma.item.createMany({
            data: [
                {
                    name: "Caesar Salad",
                    image: "caesar_salad.png",
                    description: "Classic Caesar salad with croutons and parmesan.",
                    taxApplicable: true,
                    tax: 5.0,
                    baseAmount: 12.0,
                    discount: 2.0,
                    totalAmount: 10.0,
                    subCategoryId: salads.id,
                },
                {
                    name: "Spaghetti Carbonara",
                    image: "spaghetti_carbonara.png",
                    description: "Rich and creamy carbonara with pancetta.",
                    taxApplicable: true,
                    tax: 10.0,
                    baseAmount: 15.0,
                    discount: 3.0,
                    totalAmount: 12.0,
                    subCategoryId: pasta.id,
                },
                {
                    name: "Chocolate Cake",
                    image: "chocolate_cake.png",
                    description: "Moist and rich chocolate cake.",
                    taxApplicable: true,
                    tax: 8.0,
                    baseAmount: 8.0,
                    totalAmount: 8.0,
                    subCategoryId: cakes.id,
                },
                {
                    name: "Greek Salad",
                    image: "greek_salad.png",
                    description: "Salad with feta cheese, olives, and fresh vegetables.",
                    taxApplicable: true,
                    tax: 5.0,
                    baseAmount: 10.0,
                    totalAmount: 10.0,
                    subCategoryId: salads.id,
                },
                {
                    name: "Fettuccine Alfredo",
                    image: "fettuccine_alfredo.png",
                    description: "Creamy Alfredo sauce with fettuccine pasta.",
                    taxApplicable: true,
                    tax: 10.0,
                    baseAmount: 14.0,
                    discount: 2.0,
                    totalAmount: 12.0,
                    subCategoryId: pasta.id,
                },
            ],
        });
        console.log({ appetizers, mainCourse, desserts, salads, pasta, cakes });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map