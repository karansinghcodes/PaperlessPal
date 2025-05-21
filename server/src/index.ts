import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { portNumber } from "./config/config";
import { Router } from "express";

export const app: Application = express();
export const router: Router = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.use("/invoice-app", router);

app.listen(portNumber, () => {
  console.log(`Server started on port number ${portNumber}`);
});
