
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favorites').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        { user_id: 2, name: "summoner1", region: "NA" },
        { user_id: 2, name: "smnr22", region: "EUW" },
        { user_id: 1, name: "s541807333", region: "KR" },
      ]);
    });
};
