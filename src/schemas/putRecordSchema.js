import joi from "joi";


const putRecordSchema = joi.object(
    {
        amount: joi.number().greater(0).strict().required(),
        description: joi.string().min(1).required()
    }
);

export default putRecordSchema;
