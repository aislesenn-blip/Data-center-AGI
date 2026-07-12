const fs = require('fs');
const contacts = JSON.parse(fs.readFileSync('src/data/contacts.json'));

const duplicateRecords = [
  {
    "id": 263,
    "name": "AINENY SHAYO",
    "suffix": "FJ01 (MWENYEKITI)",
    "originalName": "AINENY SHAYO FJ01",
    "phones": ["0659761665"],
    "status": "valid",
    "raw": "0659761665"
  },
  {
    "id": 264,
    "name": "PATRICK MATAGILA",
    "suffix": "FJ02 (MAKAMU MWENYEKITI)",
    "originalName": "PATRICK MATAGILA FJ02",
    "phones": ["0754270941"],
    "status": "valid",
    "raw": "0754 270941"
  },
  {
    "id": 265,
    "name": "JUSTUS CHIWI",
    "suffix": "FJ03 (KATIBU)",
    "originalName": "JUSTUS CHIWI FJ03",
    "phones": ["0618112344"],
    "status": "valid",
    "raw": "0618112344"
  },
  {
    "id": 266,
    "name": "SARAFINA SIMON",
    "suffix": "FJ04 (KATIBU MSAIDIZI)",
    "originalName": "SARAFINA SIMON FJ04",
    "phones": ["0741350471"],
    "status": "valid",
    "raw": "0741 350471"
  },
  {
    "id": 267,
    "name": "ESTA GEORGE",
    "suffix": "FJ05 (MTUNZA HAZINA)",
    "originalName": "ESTA GEORGE FJ05",
    "phones": ["0746228773"],
    "status": "valid",
    "raw": "0746228773"
  }
];

contacts.push(...duplicateRecords);
fs.writeFileSync('src/data/contacts.json', JSON.stringify(contacts, null, 2));

const total = contacts.length;
const missing = contacts.filter(c => c.status === 'missing').length;
const valid = contacts.filter(c => c.status === 'valid' || c.status === 'multiple').length;

console.log({ total, valid, missing });
