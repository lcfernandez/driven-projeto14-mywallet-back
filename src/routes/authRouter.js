import { Router } from "express";

import {
    postSignIn,
    postSignOut,
    postSignUp
} from "../controllers/userController.js";


const router = Router();

router.post("/sign-in", postSignIn);
router.post("/sign-out", postSignOut);
router.post("/sign-up", postSignUp);

export default router;
