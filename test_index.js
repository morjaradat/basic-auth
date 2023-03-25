const base64 = require("base-64");
const bcrypt = require("bcrypt");

const name = "mohammad";
const password = "asdzxc2";

const encoded = base64.encode(`${name}:${password}`);

console.log(encoded);

const decode = base64.decode(encoded);

console.log(decode);

let password3 = "123";

async function encrypt(text) {
  console.log("password3 >>>>>> ", password3);
  let hashed = await bcrypt.hash(password3, 5);
  console.log("hashed >>>>>> ", hashed);

  let p1 = "$2b$05$2bGxslwTabgvOoLDh8e0NugKj8YBbmoCDBOh9m4Q7/tWHGlL/VwiS";

  let p2 = "$2b$04$oeS0p2bGOWd1hNjsL82O0ux/6USChrk6ELnSwK5reUd0xtduiO8NS";

  let isValid1 = await bcrypt.compare(text, p1);
  console.log("isValid1 >>>>>", isValid1);
  let isValid2 = await bcrypt.compare(text, p2);
  console.log("isValid2 >>>>>", isValid2);
}
encrypt(password3);
