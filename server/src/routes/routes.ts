import express from "express";
import { signUp } from "../controller/authentication/signUp";
import { signIn } from "../controller/authentication/signIn";
import { verifyCode } from "../controller/authentication/verifyCode";
import { createClient } from "../controller/client/add/createClient";
import { middleware } from "../middleware/auth.middleware";
import { createInvoice } from "../controller/invoice/create/createInvoice";
import { getClients } from "../controller/client/get/getClients";



export const router = express.Router();

//authentication
router.post("/sign-up",signUp);
router.post("/sign-in",signIn);
router.post("/verify-code",verifyCode);

//client
router.post(
  "/create-client",
  middleware as express.RequestHandler,
  createClient
);
router.get("/get-clients",middleware as express.RequestHandler,getClients);

//invoice
router.post(
  "/create-invoice",
  middleware as express.RequestHandler,
  createInvoice
);
