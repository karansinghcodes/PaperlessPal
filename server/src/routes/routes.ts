import { Router } from "express";
import express from "express";
import { signUp } from "../controller/signUp";
import { verifyCode } from "../controller/verifyCode";

export const router: Router = express.Router();

router.post("/sign-up", signUp);
router.post("/verify-code", verifyCode);
