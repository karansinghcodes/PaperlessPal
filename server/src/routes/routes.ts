import { Router } from "express";
import express from "express";
import { signUp } from "../controller/signUp";
import { verifyCode } from "../controller/verifyCode";
import { signIn } from "../controller/signIn";


export const router: Router = express.Router();

//signup,login and verify
router.post("/sign-up", signUp);
router.post('/sign-in',signIn);
router.post("/verify-code", verifyCode);
