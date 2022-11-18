import { MongoClient } from "mongodb";
import dotenv from "dotenv";


// config
dotenv.config();


// database connection
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB connected");
} catch (err) {
    console.log(err);
}


const db = mongoClient.db(process.env.MONGO_DB);
export const recordsCollection = db.collection("records");
export const sessionsCollection = db.collection("sessions");
export const usersCollection = db.collection("users");
