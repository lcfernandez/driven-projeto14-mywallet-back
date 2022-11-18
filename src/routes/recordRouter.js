import { Router } from "express";

import {
    deleteRecord,
    postRecord,
    putRecord
} from "../controllers/recordController.js";

import { validateAuth } from "../middlewares/authValidationMiddleware.js";
import { validatePutRecord, validateRecord } from "../middlewares/recordSchemaValidationMiddleware.js";


const router = Router();

router.use(validateAuth);

router.delete("/record/:id", deleteRecord);
router.post("/record", validateRecord, postRecord);
router.put("/record/:id", validatePutRecord, putRecord);

export default router;
