import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  markProductAsAvailable,
  claimProduct
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/available", markProductAsAvailable);
router.post("/:id/claim", claimProduct);



export default router;
