import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import cookieParser from "cookie-parser";
import compress from "compression"; //compress response bodies for all requests
import cors from "cors"; //to enable cross-origin resource sharing (CORS)
import helmet from "helmet"; //secure Express apps bysetting various HTTP headers

//routes:
import authRouter from "./routes/authRouter.js";

//Middlewares:
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

//routes:
app.use("/api/auth", authRouter);

//error middlewares:
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
