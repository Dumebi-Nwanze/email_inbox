import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import emailRouter from "./routes/email-routes.js";
import userRouter from "./routes/users-routes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = { credentials: true, origin: "http://127.0.0.1:5173" };

app.use(cors(corsOptions));

app.use(json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/email", emailRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
