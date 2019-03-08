const fs = require('fs');

module.exports = async (db) => {
  const sqlFile = fs.readFileSync(`${__dirname}/leads.sql`, 'utf8');
  await db.raw(sqlFile);
  await db('cd_dojoleads').insert({
    user_id: '009723ce-489b-4fba-8e80-c41d0fb117b7',
    email: 'bob@example.com',
    application: {},
    id: 'cf3ff850-6ab9-4387-bf3b-b7f6323f4ace',
    completed: false,
    created_at: new Date(),
  });
};
