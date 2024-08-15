import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSubCategories = async (req, res) => {
  try {
    // Fetch all subcategories from the database
    const subCategories = await prisma.subCategory.findMany();
    
    // Respond with the list of subcategories and a 200 status code
    res.status(200).json(subCategories);
  } catch (error) {
    console.error("Failed to fetch subcategories:", error);
    
    // Respond with a 500 status code and an error message if the fetch fails
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch subcategories." });
  }
};


export const getSubCategory = async (req, res) => {
  // Extract the subCategoryId from the request parameters
  const { subCategoryId } = req.params;
  try {
    console.log("Fetching subcategory with ID:", subCategoryId);
    
    // Fetch the subcategory from the database by its ID
    const subCategory = await prisma.subCategory.findUnique({
      where: { id: parseInt(subCategoryId) },
    });

    // If the subcategory is not found, return a 404 response with an error message
    if (!subCategory) {
      return res
        .status(404)
        .json({ success: false, error: "SubCategory not found." });
    }

    // If the subcategory is found, return it with a 200 status code
    res.status(200).json(subCategory);
  } catch (error) {
    console.error(
      `Failed to fetch subcategory with ID ${subCategoryId}:`,
      error
    );
    
    // Respond with a 500 status code and an error message if the fetch fails
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch subcategory." });
  }
};

export const getItems = async (req, res) => {
  // Extract and parse the subCategoryId from the request parameters
  const subCategoryId = parseInt(req.params.subCategoryId);
  try {
    // Fetch all items that belong to the specified subcategory
    const items = await prisma.item.findMany({
      where: {
        subCategoryId: subCategoryId,
      },
    });

    // If no items are found, return a 404 response with an error message
    if (!items.length) {
      return res
        .status(404)
        .json({ success: false, error: "No Items found in this subCategory" });
    }

    // If items are found, return them with a 200 status code
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    // Respond with a 500 status code and an error message if the fetch fails
    res.status(500).json({
      success: false,
      error: "An error occurred while fetching items.",
    });
  }
};

export const createSubCategory = async (req, res) => {
  // Destructure the necessary fields from the request body
  const { name, image, description, taxApplicable, tax, categoryId, items } =
    req.body;

  // Check if the required fields (name and categoryId) are present in the request body
  if (!name || !categoryId) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields." }); // Respond with a 400 status if any required field is missing
  }

  try {
    // Prepare the subcategory data for creation
    const subCategoryData = {
      name,
      image,
      description,
      taxApplicable,
      tax,
      category: {
        connect: { id: categoryId }, // Connect the subcategory to the specified category by its ID
      },
    };

    // If items are provided, connect them to the new subcategory
    if (items && items.length > 0) {
      subCategoryData.items = {
        connect: items.map((id) => ({ id })), // Connect each item by its ID
      };
    }

    // Create the new subcategory in the database
    const newSubCategory = await prisma.subCategory.create({
      data: subCategoryData,
    });

    // Respond with a success message and the created subcategory
    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      newSubCategory,
    });
  } catch (error) {
    console.error("Failed to create subcategory:", error);
    // Respond with a 500 status code and an error message if the creation fails
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
