import recordSchema from "../schemas/recordSchema.js"
import putRecordSchema from "../schemas/putRecordSchema.js"


export function validateRecord(req, res, next) {
    const record = req.body;
    const { error } = recordSchema.validate(record, { abortEarly: false });
    
    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}

export function validatePutRecord(req, res, next) {
    const record = req.body;
    const { error } = putRecordSchema.validate(record, { abortEarly: false });
    
    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}
