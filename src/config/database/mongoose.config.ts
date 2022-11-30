import { NodeEnviorment } from "src/common/enums/global.enum";

export function getMongoURL(){
    const {NODE_ENV, MONGO_DATABSE, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME} = process.env;
    const connection = NODE_ENV == NodeEnviorment.DEV ? 
    `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABSE}` :
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PASSWORD}/${MONGO_DATABSE}`;
    return connection;
}
