const fs = require('fs');

module.exports = async (db) => {
  const sqlFile = fs.readFileSync(`${__dirname}/clubs.sql`, 'utf8');
  await db.raw(sqlFile);
  await db('cd_dojos').insert({
    id: '7cc86992-de44-4fad-b49f-cc4615b05ab4',
    name: 'Dojo Test 1',
    stage: 2,
    deleted: 0,
  });
};
