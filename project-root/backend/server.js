import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import externalRouter from "./routes/external.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", externalRouter);


// ROUTA PRINCIPALĂ PENTRU PRODUSE
app.use("/api/products", productsRouter);

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// PORNIRE SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
