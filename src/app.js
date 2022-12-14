import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRouter from "./routes/authRouter.js"
import recordRouter from "./routes/recordRouter.js"


// instance of express
const app = express();


// configs
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(recordRouter);
dotenv.config();


// starts the server
app.listen(process.env.SERVER_PORT, () => console.log(`Server running in port: ${process.env.SERVER_PORT}`));
