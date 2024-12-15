import express from "express";
import dotenv from "dotenv";
import TaskManagementApp from "./app";


dotenv.config();

const app = new TaskManagementApp().start(); // Initialize the app

// Set the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
