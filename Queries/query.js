const { default: axios } = require("axios");

axios.get("http://localhost:6000/GetProducts").then((res) => {
  console.table(JSON.parse(res.data[0].Variants));
});
