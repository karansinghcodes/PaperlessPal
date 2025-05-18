import { Router } from "express";
import express from "express";
import { signUp } from "../controller/authentication/signUp";
import { verifyCode } from "../controller/authentication/verifyCode";
import { signIn } from "../controller/authentication/signIn";
import { createInvoice } from "../controller/invoice/create/createInvoice";
import { createClient } from "../controller/client/create/createClient";
import { middleware } from "../middleware/middleware";

export const router: Router = express.Router();

//signup,login and verify
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/verify-code", verifyCode);

//invoice
router.post("/create-invoice", createInvoice);

//client
router.post(
  "/create-client",
  createClient
);
