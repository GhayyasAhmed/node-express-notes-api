const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");
const { checkForAuthentication, requireAuth } = require("./middlewares/auth");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/error");

const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const noteRoute = require("./routes/note");

const app = express();
const PORT = 3001;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/notes-app").then(() =>
  console.log("Mongodb connected")
);


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/", staticRoute);
app.use("/api/auth", userRoute);
app.use("/api/notes", requireAuth, noteRoute);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
