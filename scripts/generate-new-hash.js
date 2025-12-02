const bcrypt = require('bcryptjs');

const password = 'Ala2019a';

bcrypt.hash(password, 10).then(hash => {
  console.log('New Hash:', hash);
  console.log('Length:', hash.length);
});
