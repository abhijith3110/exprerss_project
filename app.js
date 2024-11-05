import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

const port = process.env.PORT || 5001;

app.use(express.static("uploads"));

app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`App is Running on ${port}`);
});
