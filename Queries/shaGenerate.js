const jsSHA = require("jssha");
const sha = new jsSHA('SHA-512', "TEXT");

hashString =
  "gtKFFx" +
  "|" +
  "txn12ww" +
  "|" +
  "200.0" +
  "|" +
  "productinfo" +
  "|" +
  "firstname" +
  "|" +
  "jeetvani171@gmail.com" +
  "|" +
  "||||||||||" +
  "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW";
  sha.update(hashString);
  const hash = sha.getHash("HEX");
  console.log(hash);