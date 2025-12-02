const bcrypt = require('bcryptjs');

const password = 'Ala2019a';
const hash = '$2b$10$7OE/pZIIZVoTLDpOMD.LOOl9AohYN1U9fn9OKYMO3h8De995LgcHO';

console.log('Testing password:', password);
console.log('Testing hash:', hash);

bcrypt.compare(password, hash).then(res => {
    console.log('Match result:', res); 
    if (res) {
        console.log('✅ Password matches hash!');
    } else {
        console.log('❌ Password does NOT match hash.');
    }
}).catch(err => console.error(err));
