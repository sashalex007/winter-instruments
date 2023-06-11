import { MongoClient, ServerApiVersion } from "mongodb";
import { mongodbKey } from "./variables.js";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongodbKey, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const dbService = {

    insert: async (db, coll, document) => {
        try {
            await client.connect();
            const collection = client.db(db).collection(coll);
            await collection.insertOne(document);
        }
        catch (err) {
            throw err
        }
        finally {
            await client.close();
        }
    },

    insertMany: async (db, coll, documents) => {
        try {
            await client.connect();
            const collection = client.db(db).collection(coll);
            await collection.insertMany(documents);
        }
        catch (err) {
            throw err
        }
        finally {
            await client.close();
        }
    },

    replace: async (db, coll, filter, document) => {
        try {
            await client.connect();
            const collection = client.db(db).collection(coll);
            await collection.findOneAndReplace(filter, document);
        }
        catch (err) {
            throw err
        }
        finally {
            await client.close();
        }
    },

    find: async (db, coll, filter) => {
        try {
            await client.connect();
            const collection = client.db(db).collection(coll);
            const result = await collection.find(filter).toArray();
            return result;
        }
        catch (err) {
            throw err
        }
        finally {
            await client.close();
        }
    },

    cleanCollection: async (db, coll) => {
        try {
            await client.connect();
            const collection = client.db(db).collection(coll);
            await collection.deleteMany({});
        }
        catch (err) {
            throw err
        }
        finally {
            await client.close();
        }
    }

}

//dbService.insert('productData', 'categoryList', { list: [1,2,3,4] })
//dbService.replace('productData', 'categoryList', {}, { list: [1,2,3,4,5] })
                      

