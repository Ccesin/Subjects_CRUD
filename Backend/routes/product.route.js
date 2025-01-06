import express from 'express';

import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = express.Router(); 

router.get("/", getProducts);           // PRODUCTS GET ALL
router.post("/", createProduct);        // PRODUCTS CREATE
router.put("/:id", updateProduct);      // PRODUCTS UPDATE
router.delete("/:id", deleteProduct);   // PRODUCTS DELETE


export default router;