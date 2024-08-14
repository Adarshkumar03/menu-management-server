import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch categories." });
  }
};

export const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch category." });
  }
};

export const createCategory = async (req, res) => {
  const {
    name,
    image,
    description,
    taxApplicable,
    tax,
    taxType,
    subCategories,
  } = req.body;

  if (!name || !subCategories) {
    return res.status(400).json({ success: false, error: "Name and subCategories are required." });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        image,
        description,
        taxApplicable,
        tax,
        taxType,
        subCategories: {
          connect: subCategories.map(id => ({ id })),
        },
      },
    });

    res.status(201).json({ success: true, message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create category." });
  }
};

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, image, description, taxApplicable, tax, taxType } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(categoryId) },
      data: { name, image, description, taxApplicable, tax, taxType },
    });

    res.status(200).json({ success: true, message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update category." });
  }
};
