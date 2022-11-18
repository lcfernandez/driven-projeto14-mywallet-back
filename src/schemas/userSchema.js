import joi from "joi";


const userSchema = joi.object(
    {
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required()
    }
);

export default userSchema;
