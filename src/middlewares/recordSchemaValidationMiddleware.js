import recordSchema from "../schemas/recordSchema.js"


export function validateRecord(req, res, next) {
    const record = { ...req.body, amount: Number(req.body.amount) };
    const { error } = recordSchema.validate(record, { abortEarly: false });
    
    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    next();
}
