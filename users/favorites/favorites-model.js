const db = require('../../data/dbConfig');

module.exports = {
    add,
    remove,
    viewAll
}

async function add(name, region, user_id){
    return db('favorites')
        .insert({
            name: name,
            region: region,
            user_id: user_id
        })
}

async function remove(id, user_id){
    return db('favorites')
        .where({ id, user_id })
        .del()
}

function viewAll(user_id, region){
    return db('favorites')
        .where({ user_id, region })
}