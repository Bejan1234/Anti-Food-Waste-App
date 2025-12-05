## 💻 Backend

It provides a fully functional **Node.js + Express API**, connected to a **PostgreSQL** database using **Prisma ORM**, and includes external data integration via **OpenFoodFacts**.

###  Setup Instructions

1.  Navigate to the backend directory
    ```bash
    cd backend
    ```

2.  Install project dependencies
    ```bash
    npm install
    ```

3.  Create a `.env` file in the backend folder
    ```dotenv
    PORT=5000
    DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/postgres
    ```
    Replace `YOUR_PASSWORD` and `YOUR_HOST` with your PostgreSQL configuration.

###  Database Initialization (Prisma)

* Run database migrations
    ```bash
    npx prisma migrate dev --name init
    ```

* (Optional) Open Prisma Studio to inspect tables
    ```bash
    npx prisma studio
    ```

### Running the Server

* Development mode (auto reload)
    ```bash
    npx nodemon server.js
    ```

* Production mode
    ```bash
    node server.js
    ```
    Server will run on: **http://localhost:5000**

###  API Endpoints (Summary)

#### Products
* `GET /api/products`
* `POST /api/products`
* `PUT /api/products/:id`
* `DELETE /api/products/:id`
* `PATCH /api/products/:id/available`
* `POST /api/products/:id/claim`

#### External API (OpenFoodFacts)
* `GET /api/food/:barcode`
* `POST /api/products/from-barcode`

###  Technologies Used

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Prisma ORM**
* **Axios**
* **OpenFoodFacts API**