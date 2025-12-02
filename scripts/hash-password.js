// Utility script to generate password hash
// Run this once: node scripts/hash-password.js

const bcrypt = require('bcryptjs');

const password = 'Ala2019a';

bcrypt.hash(password, 10).then(hash => {
  console.log('\n=================================');
  console.log('Password Hash Generated!');
  console.log('=================================\n');
  console.log('Add this to your .env.local file:\n');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('\n=================================\n');
});
