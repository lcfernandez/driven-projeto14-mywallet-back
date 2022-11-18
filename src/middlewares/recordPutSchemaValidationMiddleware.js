import recordPutSchema from "../schemas/recordPutSchema.js"


export function validateRecordPut(req, res, next) {
    const record = req.body;
    const { error } = recordPutSchema.validate(record, { abortEarly: false });
    
    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}
