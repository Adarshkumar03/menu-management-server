import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: parseInt(req.params.itemId),
      },
    });

    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getItemByName = async (req, res) => {
  try {
    const item = await prisma.item.findFirst({
      where: {
        name: req.body.name,
      },
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error);
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
  try {
    await prisma.item.create({
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
          connect: {
            id: subCategoryId,
          },
        },
      },
    });

    res.status(201).json({ message: "item created successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error });
  }
};

export const updateItem = async (req, res) => {
  const { name, image, description, taxApplicable, tax } = req.body;
  try {
    await prisma.item.update({
      where: {
        id: parseInt(req.params.itemId),
      },
      data: {
        name,
        image,
        description,
        taxApplicable,
        tax,
      },
    });

    res.status(201).json({ message: "item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error });
  }
};
