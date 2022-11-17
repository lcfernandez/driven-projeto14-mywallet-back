import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

import
    {
        sessionsCollection,
        userSchema,
        usersCollection
    }
    from "../app.js";

export async function postSignIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.sendStatus(401);
        }

        const passwordCorrect = bcrypt.compareSync(password, user.password);

        if (!passwordCorrect) {
            return res.sendStatus(401);
        }

        const session = await sessionsCollection.findOne({ userId: user._id });
  
        if (session) {
            return res.status(409).send({ message: "Usuário já logado." });
        }

        const token = uuidV4();

        await sessionsCollection.insertOne(
            {
                userId: user._id,
                token
            }
        );

        res.send({ token });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

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
        const userExists = await usersCollection.findOne({ email: user.email });

        if (userExists) {
            return res.status(409).send({ message: "E-mail já cadastrado." });
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
