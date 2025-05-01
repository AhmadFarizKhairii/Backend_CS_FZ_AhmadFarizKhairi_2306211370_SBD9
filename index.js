const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express(); // Ensure app is initialized before use
const port = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: "https://os.netlabdte.com", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/store", require("./src/routes/store.route"));
app.use("/user", require("./src/routes/user.route"));
app.use("/item", require("./src/routes/item.route"));
app.use("/transaction", require("./src/routes/transaction.route"));

// Root route
app.get("/", (req, res) => {
  res.send("CORS Configured!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
