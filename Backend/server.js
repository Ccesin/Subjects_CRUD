import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectDB } from './config/db.js';

import materiaRoutes from './routes/materia.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to parse JSON data in the body of the request ( req.body )

app.use("/api/materias", materiaRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/Frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
	});
}

console.log(process.env.MONGO_URL);

app.listen(PORT, ()=> {
    connectDB();
    console.log('Server is running on http://localhost:' + PORT);
});