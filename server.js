const express = require("express");
var http = require("http");
const XRegExp = require("xregexp");
const router = express.Router();
const app = express();
var whois = require("whois");

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

let obj = {};
const getData = async (name) => {
  console.log(name);

  whois.lookup(
    name,
    await function (err, data) {
      const words = data.split("\n");
      let a = words[0].split(" ");
      obj["domain"] = a[a.length - 1];
      a = words[4].split(" ");
      obj["updated_date"] = a[a.length - 1].split("T").join(" ").slice(0, 19);
      a = words[5].split(" ");
      obj["creation_date"] = a[a.length - 1].split("T").join(" ").slice(0, 19);
      a = words[6].split(" ");
      obj["expiration_date"] = a[a.length - 1]
        .split("T")
        .join(" ")
        .slice(0, 19);
      a = words[7].split(" ");
      obj["registar"] = String(a[a.length - 2] + a[a.length - 1]);
      a = words[19].split(" ");
      obj["reg_country"] = a[a.length - 1];
      console.log(obj);
    }
  );
};

app.get("/api", async function (req, res) {
  console.log(req.query.id);
  getData(req.query.id);
  setTimeout(() => {
    console.log(obj);
    res.send(obj);
  }, 3000);
});

app.use(express.static("./"));
app.use("/api", router);

app.listen(3000, () => {
  console.log(`server is working on 3000`);
});
