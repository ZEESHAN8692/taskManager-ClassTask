import express from 'express';
import dotenv from 'dotenv';
import router from './app/routes/routes.js';
import Database from './app/config/Database.js';
import adminRoutes from './app/routes/adminRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

// Database connection
Database();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));  


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(router);
app.use("/admin",adminRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`));
