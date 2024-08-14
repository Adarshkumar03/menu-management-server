import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import categoryRoutes from "../routes/item";
import itemRoutes from "../routes/item";
import subCategoryRoutes from "../routes/subCategory";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/category", categoryRoutes);
app.use("/subCategory", subCategoryRoutes);
app.use("/item", itemRoutes);

app.listen(3000, () => {
  console.log("App Listening on PORT 3000");
});
