import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
    userCollection: "users",
    courseCollection: "course",
    blogsCollection: "blogs",
    messageCollection: "messages",
    quizCollection: 'quiz',
    resultCollections: "results"
};

const dbConnect = async () => {
    const uri = process.env.MONGODB_URL;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        const db = client.db(process.env.DB_USER); // Make sure your database name is correct
        return db;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Database connection failed.");
    }
};

export default dbConnect;