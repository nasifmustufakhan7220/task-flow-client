import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const URI = process.env.MONGODB_URI;

if(!URI){
    throw new Error("Connection failed!");
}

const client = new MongoClient(URI);
const db = client.db("user");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
