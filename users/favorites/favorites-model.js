const db = require('../../data/dbConfig');

module.exports = {
    // add,
    // remove,
    viewAll
}

// async function add(name, region){

// }

// async function remove(name, region){
// // call viewAll after removing
// }

function viewAll(user_id, region){
    return db('favorites')
        .where({ user_id, region })
}