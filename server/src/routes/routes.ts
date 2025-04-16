import { Router } from "express";
import express from "express";
import { signUp } from "../controller/authentication/signUp";
import { verifyCode } from "../controller/authentication/verifyCode";
import { signIn } from "../controller/authentication/signIn";


export const router: Router = express.Router();

//signup,login and verify
router.post("/sign-up", signUp);
router.post('/sign-in',signIn);
router.post("/verify-code", verifyCode);
