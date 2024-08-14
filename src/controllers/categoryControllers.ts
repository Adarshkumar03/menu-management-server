import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req: any, res: any) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategory = async (req: any, res: any) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(req.params.categoryId),
      },
    });

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const createCategory = async (req: any, res: any) => {
  const {
    name,
    image,
    description,
    taxApplicable,
    tax,
    taxType,
    subCategories,
  } = req.body;
  try {
    await prisma.category.create({
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error });
  }
};

export const updateCategory = async (req: any, res: any) => {
  const { name, image, description, taxApplicable, tax, taxType } = req.body;
  try {
    await prisma.category.update({
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
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error });
  }
};
