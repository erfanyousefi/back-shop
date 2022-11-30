import { ObjectId } from "mongodb";
import { FilterQuery } from "mongoose";
import { ConnectToMongo } from "./mongo-singletone";

const connectToMongo = new ConnectToMongo();
export async function MongoInsertOne<CreateDTO>(collection: string, data: CreateDTO) {
    const connectToMongo = new ConnectToMongo();
    try {
        let db = await connectToMongo.Get();
        const result = await db.collection("collection").insertOne(data);
        return result;
    } catch (error) {
        console.log(error);
    }
}
export async function MongoInsertMany<CreateDTO>(collection: string, data: CreateDTO[]) {
    try {
        let db = await connectToMongo.Get();
        const result = await db.collection(collection).insertMany(data);
        return result;
    } catch (error) {
        console.log(error);
    }
}
export async function MongoFindOne(collection: string, filter: FilterQuery<any>) {
    try {
        let db = await connectToMongo.Get();
        const result = await db.collection(collection).findOne(filter);
        return result;
    } catch (error) {
        console.log(error);
    }
}
export async function MongoFindMany(collection: string, filter: FilterQuery<any>) {
    try {
        let db = await connectToMongo.Get();
        const result = db.collection(collection).find(filter);
        return result;
    } catch (error) {
        console.log(error);
    }
}
export async function saveErorrInMongo(collection: string, data: any) {
    try {
        const { body, params, query, path, url, ip, headers, cookies, statusCode, statusMessage } = data.requestDetail;
        const requestDetail = {
            body, params, query, path, url, ip, headers, cookies, statusCode, statusMessage
        }
        const doc = {
            _id: new ObjectId(),
            requestDetail,
            errorDetail: data.errorDetail,
            errorLocation: data.errorLocation
        }
        const result = await MongoInsertOne(collection, doc);
        return result
    } catch (error) {
        console.log(error);

    }
}