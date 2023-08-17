const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/User");
const TaskRoutes = require("./routes/Task");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const data = require("./config/database");
const cookieParser = require("cookie-parser");
data.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/task", TaskRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "your server is up and running ",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
