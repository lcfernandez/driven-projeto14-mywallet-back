import {
    recordsCollection,
    sessionsCollection,
    usersCollection
} from "../database/db.js";

export async function postRecord(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const user = await usersCollection.findOne({ _id: session.user });
       
        await recordsCollection.insertOne({...req.body, user: user._id });
    
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
