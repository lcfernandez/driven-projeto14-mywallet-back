import joi from "joi";


const recordSchema = joi.object(
    {
        amount: joi.number().greater(0).strict().required(),
        description: joi.string().min(1).required(),
        type: joi.string().valid("expense", "income").required()
    }
);

export default recordSchema;
