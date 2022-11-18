import { Router } from "express";

import {
    deleteRecord,
    getRecord,
    getRecords,
    postRecord,
    putRecord
} from "../controllers/recordController.js";

import { validateAuth } from "../middlewares/authValidationMiddleware.js";
import { validateRecordPut } from "../middlewares/recordPutSchemaValidationMiddleware.js";
import { validateRecord } from "../middlewares/recordSchemaValidationMiddleware.js";


const router = Router();

router.use(validateAuth);

router.delete("/record/:id", deleteRecord);
router.get("/record", getRecords);
router.get("/record/:id", getRecord);
router.post("/record", validateRecord, postRecord);
router.put("/record/:id", validateRecordPut, putRecord);

export default router;
