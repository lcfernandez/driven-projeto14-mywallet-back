import { userSchema, usersCollection } from "../app.js";
import bcrypt from "bcrypt";

export async function postSignUp(req, res) {
    const user = req.body;
    const { error } = userSchema.validate(user,
        {
            abortEarly: false
        }
    );

    if (error) {
        return res.status(400).send(
            error.details.map(detail => detail.message)
        );
    }

    try {
        const userExists = await usersCollection.findOne(
            {
                email: user.email
            }
        );

        if (userExists) {
            return res.status(409).send(
                {
                    message: "E-mail já cadastrado."
                }
            );
        }

        const password = bcrypt.hashSync(user.password, 12);

        await usersCollection.insertOne(
            {
                ...user,
                password
            }
        );

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
