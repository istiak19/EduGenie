import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
    userCollection: "users",
    courseCollection: "course",
    chapterCollection: "chapters",
    blogsCollection: "blogs",
    messageCollection: "messages",
    quizCollection: "quiz",
    resultCollections: "results"
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    const uri = process.env.MONGODB_URL;
    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

const dbConnect = async () => {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_USER);
        return db;
    } catch (error) {
        throw new Error("Database connection failed.");
    }
};

export default dbConnect;