import { PrismaClient } from "@prisma/client";
import { connect } from "http2";
const prisma = new PrismaClient();

export const getSubCategories = async (req: any, res: any) => {
  try {
    const subCategories = await prisma.subCategory.findMany();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getSubCategory = async (req: any, res: any) => {
  try {
    console.log("1111 Inside Get Category with id:", req.params.subCategoryId);
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: parseInt(req.params.categoryId),
      },
    });
    console.log("2222 Inside Get Category with id:", req.params.subCategoryId);
    console.log(subCategory);

    res.status(200).json(subCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const createSubCategory = async (req: any, res: any) => {
  const { name, image, description, taxApplicable, tax, categoryId, items } =
    req.body;
  try {
    await prisma.subCategory.create({
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error });
  }
};

export const updateSubCategory = async (req: any, res: any) => {
  const { name, image, description, taxApplicable, tax } = req.body;
  try {
    await prisma.category.update({
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error });
  }
};
