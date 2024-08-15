import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    res.status(500).json({ success: false, error: "Failed to fetch items." });
  }
};

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
  const { name } = req.body;
  try {
    const item = await prisma.item.findFirst({
      where: { name },
    });

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found." });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(`Failed to fetch item with name ${name}:`, error);
    res.status(500).json({ success: false, error: "Failed to fetch item." });
  }
};

export const createItem = async (req, res) => {
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

  if (!name || !subCategoryId || !baseAmount || !totalAmount) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  try {
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
          connect: { id: subCategoryId },
        },
      },
    });

    res.status(201).json({ success: true, message: "Item created successfully", newItem });
  } catch (error) {
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

