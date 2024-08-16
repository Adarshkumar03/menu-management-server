import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Fetch all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch categories." });
  }
};

//Fetch Single Category by ID
export const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch category." });
  }
};

//Fetch all subCategories under Category
export const getSubCategories = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  try {
    const subcategories = await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    if (!subcategories.length) {
      return res.status(404).json({
        succes: false,
        error: "No subcategories found for this category.",
      });
    }
    res.status(200).json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      succes: false,
      error: "An error occurred while fetching subcategories.",
    });
  }
};

//Fetch all Items under Category
export const getItems = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  try {
    //Fetch all subcategories under category
    const subCategories = await prisma.subCategory.findMany({
      where: {
        categoryId: categoryId,
      },
      select: {
        id: true,
      },
    });
    if (!subCategories.length) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this category." });
    }
    //map all subcategory ids into an array
    const subCategoryIds = subCategories.map((subCategory) => subCategory.id);

    //Find all items belonging to these subcategories
    const items = await prisma.item.findMany({
      where: {
        subCategoryId: {
          in: subCategoryIds,
        },
      },
    });
    if (!items.length) {
      return res
        .status(404)
        .json({ message: "No items found for this category." });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "An error occurred while fetching items." });
  }
};

//Create a Category
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

  if (!name) {
    return res.status(400).json({ success: false, error: "Name is required." });
  }

  try {
    const categoryData = {
      name,
      image,
      description,
      taxApplicable,
      tax,
      taxType,
    };
    // Only add subCategories if they exist
    if (subCategories && subCategories.length > 0) {
      categoryData.subCategories = {
        connect: subCategories.map((id) => ({ id })),
      };
    }

    const category = await prisma.category.create({
      data: categoryData,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create category." });
  }
};

//Update Category
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  console.log(categoryId);

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
    // Initialize an empty object for update data
    const updateData = {};
    // Conditionally add properties to updateData based on request body
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (description !== undefined) updateData.description = description;
    if (taxApplicable !== undefined) updateData.taxApplicable = taxApplicable;
    if (tax !== undefined) updateData.tax = tax;
    if (taxType !== undefined) updateData.taxType = taxType;

    // Conditionally handle subCategories
    if (subCategories && subCategories.length > 0) {
      updateData.subCategories = {
        connect: subCategories.map((sub) => ({ id: sub })),
      };
    }

    // Perform the update
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(categoryId) },
      data: updateData,
    });

    res.status(201).json({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update category." });
  }
};
