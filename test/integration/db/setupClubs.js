const fs = require('fs');

module.exports = async (db) => {
  const sqlFile = fs.readFileSync(`${__dirname}/clubs.sql`, 'utf8');
  await db.raw(sqlFile);
  // Soft delete by userId
  await db('cd_usersdojos').insert({
    id: 'a5d60790-17c4-4a86-a023-d1558b06f118',
    user_id: '535b4145-4f83-4953-b755-b38cc7d69294',
    dojo_id: 'ddeb47d9-1a58-42da-ad64-ef51ea115c23',
    deleted: 0,
  });
  // Hard delete by userId
  await db('cd_usersdojos').insert({
    id: '990fd4b4-db17-4dcc-936a-adb003cc60d9',
    user_id: '90d17d7a-0333-42c7-95ee-0e9db52f9d96',
    dojo_id: 'ddeb47d9-1a58-42da-ad64-ef51ea115c23',
    deleted: 0,
  });
  // Soft delete by membership Id
  await db('cd_usersdojos').insert({
    id: '73dc40e7-1b36-4bd6-b76f-87f666234968',
    user_id: '535b4145-4f83-4953-b755-b38cc7d69294',
    dojo_id: 'ddeb47d9-1a58-42da-ad64-ef51ea115c23',
    deleted: 0,
  });

  // Hard delete by membership Id
  await db('cd_usersdojos').insert({
    id: '355e73fd-568a-45fa-89f4-49f0eee36185',
    user_id: '535b4145-4f83-4953-b755-b38cc7d69294',
    dojo_id: 'ddeb47d9-1a58-42da-ad64-ef51ea115c23',
    deleted: 0,
  });
  // Modifying membership
  await db('cd_usersdojos').insert({
    id: '463e716d-e2c6-42f6-9809-dc6236f0e480',
    user_id: '90a1bf7a-b840-490f-825f-c98a881f2f55',
    dojo_id: 'a3ed8f42-36f6-4ff6-aac2-8d52a788d3c2',
    deleted: 0,
    userPermissions: [],
    userTypes: ['parent-guardian'],
  });
};
