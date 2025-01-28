// database.js

import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB Connected successfully");
    })
    .catch((err) => {
        console.log("DB Connection Issue");
        console.log(err);
        process.exit(1);
    });

    mongoose.connection.on('connected', () => {
        console.log("Database connected");
    });

    mongoose.connection.on('error', (err) => {
        console.log("Database connection error:");
        console.log(err);
    });
};

export default connectDB;  // Use export default here
