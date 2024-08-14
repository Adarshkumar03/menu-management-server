import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subCategory.findMany();
    res.status(200).json(subCategories);
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch subcategories." });
  }
};

export const getSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;
  try {
    console.log("Fetching subcategory with ID:", subCategoryId);
    const subCategory = await prisma.subCategory.findUnique({
      where: { id: parseInt(subCategoryId) },
    });

    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, error: "SubCategory not found." });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    console.error(
      `Failed to fetch subcategory with ID ${subCategoryId}:`,
      error
    );
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch subcategory." });
  }
};

export const createSubCategory = async (req, res) => {
  const { name, image, description, taxApplicable, tax, categoryId, items } =
    req.body;

  if (!name || !categoryId || !items) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields." });
  }

  try {
    const newSubCategory = await prisma.subCategory.create({
      data: {
        name,
        image,
        description,
        taxApplicable,
        tax,
        category: {
          connect: { id: categoryId },
        },
        items: {
          connect: items.map((id) => ({ id })),
        },
      },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "SubCategory created successfully",
        newSubCategory,
      });
  } catch (error) {
    console.error("Failed to create subcategory:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create subcategory." });
  }
};

export const updateSubCategory = async (req, res) => {
  const { subCategoryId } = req.params;
  const { name, image, description, taxApplicable, tax, items } = req.body;

  try {
    const updatedSubCategory = await prisma.subCategory.update({
      where: { id: parseInt(subCategoryId) },
      data: {
        name,
        image,
        description,
        taxApplicable,
        tax,
        items: items ? { connect: items.map((id) => ({ id })) } : undefined,
      },
    });

    res
      .status(200)
      .json({
        success: true,
        message: "SubCategory updated successfully",
        updatedSubCategory,
      });
  } catch (error) {
    console.error(
      `Failed to update subcategory with ID ${subCategoryId}:`,
      error
    );
    res
      .status(500)
      .json({ success: false, error: "Failed to update subcategory." });
  }
};
