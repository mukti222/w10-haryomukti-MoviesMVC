const express = require("express");
const path = require("path"); // Import modul 'path'
const app = express();
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

// Set up middleware
app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views")); // Gunakan 'path' untuk menggabungkan direktori

// Use the userRoutes for handling routes
app.use("/user", userRoutes);

app.use("/uploads",express.static(path.join(__dirname, 'uploads')));
app.use("/movies", movieRoutes);

// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});