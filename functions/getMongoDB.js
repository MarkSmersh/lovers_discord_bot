const { mongo } = require('../config.json')
const { MongoClient } = require('mongodb');

class MongoDB {

    constructor() {
        const uri = `mongodb+srv://${mongo.user}:${mongo.password}@${mongo.organisation}.0xznd.mongodb.net/${mongo.cluster}?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client = client
    }

    async connect () {
        await this.client.connect()
        this.db = this.client.db(mongo.database)
        return this.db
    }
}

module.exports = MongoDB