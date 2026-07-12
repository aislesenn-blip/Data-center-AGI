const fs = require('fs');
const contacts = JSON.parse(fs.readFileSync('src/data/contacts.json'));

const total = contacts.length;
const missing = contacts.filter(c => c.status === 'missing').length;
const valid = contacts.filter(c => c.status === 'valid' || c.status === 'multiple').length;

console.log({ total, valid, missing });
