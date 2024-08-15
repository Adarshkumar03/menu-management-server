import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete existing records and reset sequences
  await prisma.item.deleteMany({});
  await prisma.subCategory.deleteMany({});
  await prisma.category.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Item_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "SubCategory_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;`;

  // Create Categories
  const appetizers = await prisma.category.create({
    data: {
      name: "Appetizers",
      image: "appetizers.png",
      description: "Start your meal with a delicious appetizer.",
      taxApplicable: true,
      tax: 5.0,
      taxType: "Percentage",
    },
  });

  const mainCourse = await prisma.category.create({
    data: {
      name: "Main Course",
      image: "main_course.png",
      description: "Satisfying and hearty main dishes.",
      taxApplicable: true,
      tax: 10.0,
      taxType: "Percentage",
    },
  });

  const desserts = await prisma.category.create({
    data: {
      name: "Desserts",
      image: "desserts.png",
      description: "Sweet treats to end your meal.",
      taxApplicable: true,
      tax: 8.0,
      taxType: "Percentage",
    },
  });

  const beverages = await prisma.category.create({
    data: {
      name: "Beverages",
      image: "beverages.png",
      description: "Refreshing drinks to complement your meal.",
      taxApplicable: true,
      tax: 5.0,
      taxType: "Percentage",
    },
  });

  const sides = await prisma.category.create({
    data: {
      name: "Sides",
      image: "sides.png",
      description: "Perfect sides to pair with your meal.",
      taxApplicable: true,
      tax: 5.0,
      taxType: "Percentage",
    },
  });

  const specials = await prisma.category.create({
    data: {
      name: "Specials",
      image: "specials.png",
      description: "Limited-time special dishes.",
      taxApplicable: true,
      tax: 12.0,
      taxType: "Percentage",
    },
  });

  // Create SubCategories
  const salads = await prisma.subCategory.create({
    data: {
      name: "Salads",
      image: "salads.png",
      description: "Fresh and healthy salads.",
      taxApplicable: true,
      tax: 5.0,
      category: { connect: { id: appetizers.id } },
    },
  });

  const soups = await prisma.subCategory.create({
    data: {
      name: "Soups",
      image: "soups.png",
      description: "Warm and comforting soups.",
      taxApplicable: true,
      tax: 5.0,
      category: { connect: { id: appetizers.id } },
    },
  });

  const pasta = await prisma.subCategory.create({
    data: {
      name: "Pasta",
      image: "pasta.png",
      description: "Delicious pasta dishes.",
      taxApplicable: true,
      tax: 10.0,
      category: { connect: { id: mainCourse.id } },
    },
  });

  const grills = await prisma.subCategory.create({
    data: {
      name: "Grills",
      image: "grills.png",
      description: "Tasty grilled items.",
      taxApplicable: true,
      tax: 10.0,
      category: { connect: { id: mainCourse.id } },
    },
  });

  const cakes = await prisma.subCategory.create({
    data: {
      name: "Cakes",
      image: "cakes.png",
      description: "Decadent cakes for dessert.",
      taxApplicable: true,
      tax: 8.0,
      category: { connect: { id: desserts.id } },
    },
  });

  const iceCreams = await prisma.subCategory.create({
    data: {
      name: "Ice Creams",
      image: "ice_cream.png",
      description: "Creamy and delicious ice creams.",
      taxApplicable: true,
      tax: 8.0,
      category: { connect: { id: desserts.id } },
    },
  });

  const softDrinks = await prisma.subCategory.create({
    data: {
      name: "Soft Drinks",
      image: "soft_drinks.png",
      description: "Cold and refreshing soft drinks.",
      taxApplicable: true,
      tax: 5.0,
      category: { connect: { id: beverages.id } },
    },
  });

  const fries = await prisma.subCategory.create({
    data: {
      name: "Fries",
      image: "fries.png",
      description: "Crispy and golden fries.",
      taxApplicable: true,
      tax: 5.0,
      category: { connect: { id: sides.id } },
    },
  });

  const chefSpecials = await prisma.subCategory.create({
    data: {
      name: "Chef's Specials",
      image: "chefs_special.png",
      description: "Exclusive dishes from our chef.",
      taxApplicable: true,
      tax: 12.0,
      category: { connect: { id: specials.id } },
    },
  });

  // Create Items
  await prisma.item.createMany({
    data: [
      {
        name: "Caesar Salad",
        image: "caesar_salad.png",
        description: "Classic Caesar salad with croutons and parmesan.",
        taxApplicable: true,
        tax: 5.0,
        baseAmount: 12.0,
        discount: 2.0,
        totalAmount: 10.0,
        subCategoryId: salads.id,
      },
      {
        name: "Tomato Soup",
        image: "tomato_soup.png",
        description: "Rich and creamy tomato soup.",
        taxApplicable: true,
        tax: 5.0,
        baseAmount: 8.0,
        totalAmount: 8.0,
        subCategoryId: soups.id,
      },
      {
        name: "Spaghetti Carbonara",
        image: "spaghetti_carbonara.png",
        description: "Rich and creamy carbonara with pancetta.",
        taxApplicable: true,
        tax: 10.0,
        baseAmount: 15.0,
        discount: 3.0,
        totalAmount: 12.0,
        subCategoryId: pasta.id,
      },
      {
        name: "Grilled Chicken",
        image: "grilled_chicken.png",
        description: "Tender grilled chicken with herbs.",
        taxApplicable: true,
        tax: 10.0,
        baseAmount: 18.0,
        discount: 3.0,
        totalAmount: 15.0,
        subCategoryId: grills.id,
      },
      {
        name: "Chocolate Cake",
        image: "chocolate_cake.png",
        description: "Moist and rich chocolate cake.",
        taxApplicable: true,
        tax: 8.0,
        baseAmount: 8.0,
        totalAmount: 8.0,
        subCategoryId: cakes.id,
      },
      {
        name: "Vanilla Ice Cream",
        image: "vanilla_ice_cream.png",
        description: "Creamy vanilla ice cream.",
        taxApplicable: true,
        tax: 8.0,
        baseAmount: 5.0,
        totalAmount: 5.0,
        subCategoryId: iceCreams.id,
      },
      {
        name: "Cola",
        image: "cola.png",
        description: "Chilled cola to quench your thirst.",
        taxApplicable: true,
        tax: 5.0,
        baseAmount: 3.0,
        totalAmount: 3.0,
        subCategoryId: softDrinks.id,
      },
      {
        name: "French Fries",
        image: "french_fries.png",
        description: "Crispy and golden French fries.",
        taxApplicable: true,
        tax: 5.0,
        baseAmount: 4.0,
        totalAmount: 4.0,
        subCategoryId: fries.id,
      },
      {
        name: "Chef's Special Steak",
        image: "chefs_special_steak.png",
        description: "Perfectly cooked steak with special sauce.",
        taxApplicable: true,
        tax: 12.0,
        baseAmount: 25.0,
        discount: 5.0,
        totalAmount: 20.0,
        subCategoryId: chefSpecials.id,
      },
      {
        name: "Greek Salad",
        image: "greek_salad.png",
        description: "Salad with feta cheese, olives, and fresh vegetables.",
        taxApplicable: true,
        tax: 5.0,
        baseAmount: 10.0,
        totalAmount: 10.0,
        subCategoryId: salads.id,
      },
      {
        name: "Fettuccine Alfredo",
        image: "fettuccine_alfredo.png",
        description: "Creamy Alfredo sauce with fettuccine pasta.",
        taxApplicable: true,
        tax: 10.0,
        baseAmount: 14.0,
        discount: 2.0,
        totalAmount: 12.0,
        subCategoryId: pasta.id,
      },
    ],
  });

  console.log({
    appetizers,
    mainCourse,
    desserts,
    beverages,
    sides,
    specials,
    salads,
    soups,
    pasta,
    grills,
    cakes,
    iceCreams,
    softDrinks,
    fries,
    chefSpecials,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
