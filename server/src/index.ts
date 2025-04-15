import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { portNumber } from "./config/config";
import { router } from "./routes/routes";

export const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/invoice-app',router);

app.listen(portNumber, () => {
    console.log(`Server started on port number ${portNumber}`);
})


