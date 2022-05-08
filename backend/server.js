import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//routes:
import authRouter from "./routes/authRouter.js";

//Middlewares:
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

//routes:
app.use("/api/auth", authRouter);

//error middlewares:
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
