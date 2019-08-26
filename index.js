const http = require("http");
const url = require("url");
const parse = require("querystring");
const promisify = require("util").promisify;
const fs = require("fs");
const open = promisify(fs.open);
const close = promisify(fs.close);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const theData = require("./lib/data");

const port = 3000;
const host = "127.0.0.1";

//creating server
const httpServer = http.createServer((req, res) => {
  if (req.method === "POST") {
    Post(req, res);
  }
  if (req.method === "GET") {
    Get(req, res);
  }
});

httpServer.listen(port, host, () => {
  console.log(`Server running on port: ${port} host: ${host}`);
});

function Post(req, res) {
  var body = "";
  req.on("data", function(datachunk) {
    body += datachunk.toString();
  });

  req.on("end", () => {
    readFile(`./data/${req.url}/data.json`, "utf-8")
      .then(data => {
        stringData = JSON.parse(body);
        data = JSON.parse(data);
        data.users.push(stringData);
        return writeFile(
          `./data/${req.url}/data.json`,
          JSON.stringify(data, null, "\t")
        );
      })
      .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(`Posted!`);
      });
  });
}

function Get(req, res) {
  if (req.url != "/users") {
    pathArr = req.url.split("/");
    path = pathArr[1];
    id = pathArr[2];
    readFile(`./data/${path}/data.json`, "utf-8").then(data => {
      data = JSON.parse(data);
      data.users.forEach(item => {
        if (item.id == id) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(item));
        }
      });
    });
  } else {
    readFile(`./data/${req.url}/data.json`, "utf-8").then(data => {
      data = JSON.parse(data);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    });
  }
}
