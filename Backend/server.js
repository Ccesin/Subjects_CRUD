import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to parse JSON data in the body of the request ( req.body )

app.use("/api/products", productRoutes);

console.log(process.env.MONGO_URL);

app.listen(PORT, ()=> {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});