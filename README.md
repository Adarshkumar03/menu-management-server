# Menu Management API

## Overview
This project is a Node.js backend server for managing a hierarchical menu system. The menu structure includes Categories, Subcategories, and Items. The API allows you to create, retrieve, update, and search these entities.

## Tech Stack
- **Node.Js**
- **Express**
- **Prisma ORM**
- **PostgresSQL**

## Project Setup

### Prerequisite
- Node.js
- PostgresSQL 
- npm

### Installation
1. **Clone the Repository**
    ```git clone https://github.com/Adarshkumar03/menu-management-server```
    ```cd menu-managemnt-server```
2. **Install Dependencies**
   ```npm install``` 
3. **Configure the Database**
   - Create a ```.env``` file Create a .env file in the root directory and add your PostgreSQL database connection string:
     ```DATABASE_URL=postgresql://user:password@localhost:5432/menu_management```
4. **Run Database Migrations**
   ```npx prisma migrate dev```
5. **Start the server**
   ```npm start```      

## API Routes

### Categories
- Get All Categories
  - `GET /category`
  - Returns a list of all categories
- Get a Single Category by ID
  - `GET /category/:categoryId`
  - Returns a single categrory based on the ID provided
- Create a New Category
  - `POST /category`
  - Create a new category with the privided details
- Update an Existing Category
  - `POST /category/:categoryId`

### Subcategories
- Get All Subcategories
  - `GET /subCategory`
  - Returns a list of all subCategories
- Get a Single Subcategory by ID
  - `GET /subCategory/:subCategoryId`
  - Returns a single subCategrory based on the ID provided
- Create a New Subcategory
  - `POST /subCategory`
  - Create a new subCategory with the privided details
- Update an Existing Subcategory
  - `POST /subCategory/:subCategoryId`

### Items
- Get All Items
  - `GET /item`
  - Returns a list of all items.

- Get a Single Item by ID
  - `GET /item/:itemId`
  - Returns a single item based on the ID provided.

- Search Items by Name
  - `GET /item/search`
  - Searches for items by name.

- Create a New Item
  - `POST /item`
  - Creates a new item under a specific subcategory or category.

- Update an Existing Item
  - `POST /item/:itemId`
  - Updates the details of an existing item.
