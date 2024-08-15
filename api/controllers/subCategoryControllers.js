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

export const getItems = async (req, res) => {
  const subCategoryId = parseInt(req.params.subCategoryId);
  try {
    const items = await prisma.subCategory.findMany({
      where: {
        id: subCategoryId,
      },
      include: {
        items: true,
      },
    });

    if (items.length) {
      res
        .status(404)
        .json({ success: false, error: "No Items found in this subCategory" });
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      succes: false,
      error: "An error occurred while fetching items.",
    });
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

    res.status(201).json({
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
    // Initialize an empty object for update data
    const updateData = {};

    // Conditionally add properties to updateData based on request body
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (description !== undefined) updateData.description = description;
    if (taxApplicable !== undefined) updateData.taxApplicable = taxApplicable;
    if (tax !== undefined) updateData.tax = tax;

    // Conditionally handle items
    if (items && items.length > 0) {
      updateData.items = {
        connect: items.map((id) => ({ id })),
      };
    }

    // Perform the update
    const updatedSubCategory = await prisma.subCategory.update({
      where: { id: parseInt(subCategoryId) },
      data: updateData,
    });

    res.status(200).json({
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
