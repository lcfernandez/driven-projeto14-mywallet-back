import { ObjectId } from "mongodb";

import {
    recordsCollection,
    sessionsCollection,
    usersCollection
} from "../database/db.js";

export async function deleteRecord(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const record = await recordsCollection.findOne({ _id: new ObjectId(req.params) });

        if (!record) {
            return res.sendStatus(404);
        }

        if (!record.user.equals(session.user)) {
            return res.sendStatus(401);
        }
       
        await recordsCollection.deleteOne({ _id: record._id });
    
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export async function getRecords(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const records = await recordsCollection.find({ user: session.user }).toArray();
        
        res.send(records);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postRecord(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const user = await usersCollection.findOne({ _id: session.user });
       
        await recordsCollection.insertOne({ ...req.body, user: user._id });
    
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

export async function putRecord(req, res) {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");

    try {
        const session = await sessionsCollection.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const record = await recordsCollection.findOne({ _id: new ObjectId(req.params) });

        if (!record) {
            return res.sendStatus(404);
        }

        if (!record.user.equals(session.user)) {
            return res.sendStatus(401);
        }

        await recordsCollection.updateOne(
            {
                _id: record._id
            },
            {
                $set: req.body
            }
        );
    
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
