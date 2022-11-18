import { Router } from "express";

import { deleteRecord, postRecord } from "../controllers/recordController.js";
import { validateAuth } from "../middlewares/authValidationMiddleware.js";
import { validateRecord } from "../middlewares/recordSchemaValidationMiddleware.js";


const router = Router();

router.use(validateAuth);

router.delete("/record/:id", deleteRecord);
router.post("/record", validateRecord, postRecord);

export default router;
