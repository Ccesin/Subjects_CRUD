import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// Method for getting all products
export const getProducts = async (req, res) => { 
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products", error.message);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }

};

// Method for creating a new product
export const createProduct = async (req, res)=> { 
    const product = req.body; // get the product from the request body

    if (!product.name || !product.price || !product.image ) {
        return res.status(400).json({ success:false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error while creating product" });
    }

};

// Method for updating a product by id
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    
    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        console.error("Invalid product id");
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }
    
    const product = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error while updating product"});
    }

};

// Method for deleting a product by id
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if ( !mongoose.Types.ObjectId.isValid(id) ) {
        console.error("Invalid product id");
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }
        
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({success: false, message: "Server Error while deleting product"}); 
    }

};