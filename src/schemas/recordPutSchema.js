import joi from "joi";


const recordPutSchema = joi.object(
    {
        amount: joi.number().greater(0).strict().required(),
        description: joi.string().min(1).required()
    }
);

export default recordPutSchema;
