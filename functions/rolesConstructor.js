const fs = require('fs')
const MongoDB = require('../functions/getMongoDB')

async function rolesConstructor (message, identificator, roles, uri, type) {

    const mongo = new MongoDB
    const db = await mongo.connect()
    const data = await db.collection(uri).findOne({})
    delete data['_id']

    var indexOfFilter = ['guildId', 'channelId', 'id']
    var current = data

    if (type === 'button') {
        var keys = identificator
        var identificator = []
        keys.forEach((element) => {
            identificator.push(element[0])
        })
    }

    for (let i = 0; i < indexOfFilter.length; i++) {
        if (!current[message[indexOfFilter[i]]]) {
            current[message[indexOfFilter[i]]] = {}
        }
        current = current[message[indexOfFilter[i]]]
    }

    for (let i = 0; i < identificator.length; i++) {
        current[identificator[i]] = roles[i]
    }
    current['all'] = roles

    db.collection(uri).updateOne({}, {$set: data}, (err) => {
        if (err) throw new error (err)
        mongo.client.close()
    })
}

module.exports = rolesConstructor