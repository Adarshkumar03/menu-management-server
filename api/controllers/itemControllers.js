import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Fetch all items
export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).json({ success: false, error: "Failed to fetch items." });
  }
};

//Fetch a specific Item
export const getItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) },
    });

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found." });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(`Failed to fetch item with ID ${itemId}:`, error);
    res.status(500).json({ success: false, error: "Failed to fetch item." });
  }
};

export const getItemByName = async (req, res) => {
  // Extract and decode the item name from the URL parameters
  const name = decodeURIComponent(req.params.name).toLowerCase();
  try {
    // Search for the first item in the database that matches the provided name, case-insensitively
    const item = await prisma.item.findFirst({
      where: {
        name: {
          // Case-insensitive search
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    // If the item is not found, return a 404 response with an error message
    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found." });
    }
    // If the item is found, return it with a 200 status code
    res.status(200).json(item);
  } catch (error) {
    // Log any errors and return a 500 response with an error message
    console.error(`Failed to fetch item with name ${name}:`, error);
    res.status(500).json({ success: false, error: "Failed to fetch item." });
  }
};

export const createItem = async (req, res) => {
  // Destructure the necessary fields from the request body
  const {
    name,
    image,
    description,
    taxApplicable,
    tax,
    subCategoryId,
    baseAmount,
    discount,
    totalAmount,
  } = req.body;

  // Check if the required fields are present in the request body
  if (!name || !subCategoryId || !baseAmount || !totalAmount) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields." }); // Respond with a 400 status if any required field is missing
  }

  try {
    // Create a new item in the database with the provided data
    const newItem = await prisma.item.create({
      data: {
        name,
        image,
        description,
        taxApplicable,
        tax,
        baseAmount,
        discount,
        totalAmount,
        subCategory: {
          connect: { id: subCategoryId }, // Connect the item to the specified subcategory by its ID
        },
      },
    });

    // Respond with a success message and the created item
    res
      .status(201)
      .json({ success: true, message: "Item created successfully", newItem });
  } catch (error) {
    // Log any errors and respond with a 500 status code and error message
    console.error("Failed to create item:", error);
    res.status(500).json({ success: false, error: "Failed to create item." });
  }
};


export const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const {
    name,
    image,
    description,
    taxApplicable,
    tax,
    baseAmount,
    discount,
    totalAmount,
    subCategoryId,
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
    if (baseAmount !== undefined) updateData.baseAmount = baseAmount;
    if (discount !== undefined) updateData.discount = discount;
    if (totalAmount !== undefined) updateData.totalAmount = totalAmount;

    // Conditionally handle subCategoryId
    if (subCategoryId !== undefined) {
      updateData.subCategory = { connect: { id: subCategoryId } };
    }

    // Perform the update
    const updatedItem = await prisma.item.update({
      where: { id: parseInt(itemId) },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      updatedItem,
    });
  } catch (error) {
    console.error(`Failed to update item with ID ${itemId}:`, error);
    res.status(500).json({ success: false, error: "Failed to update item." });
  }
};
