import { InternalServerErrorException, Logger } from "@nestjs/common";
import { getMongoURL } from "src/config/database/mongoose.config";
import { MongoClient, Db } from "mongodb";

export class ConnectToMongo {
    private db?: Db  = null;
    private instance :number = 0;
    private logger: Logger = new Logger("MongoDB")
    protected async connect(){
        try {
            let client = await new MongoClient("mongodb://localhost:27017/digikala-log").connect();
            let db = client.db();
            return db;
        } catch (error) {
            this.logger.debug(error.message)
            
        }
    }
    async Get() {
        try {
            this.instance++;
            this.logger.log(`Db Connection called ${this.instance} times`)
            if(this.db) {
                this.logger.log(`db connection is already alive`);
                return this.db;
            }
            this.logger.log(`getting new db connection`);
            this.db = await this.connect();
            return this.db;

        } catch (error) {
            this.logger.debug(error.message)
        }
    }
}