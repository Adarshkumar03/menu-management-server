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
               