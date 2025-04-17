import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
    userCollection: "users",
    courseCollection: "course",
    blogsCollection:"blogs",
}

function dbConnect(collectionName) {
    const uri = "mongodb+srv://eduGenie:5REQJAfwDQR3gadV@cluster0.fnfrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.DB_USER).collection(collectionName)
};
export default dbConnect;