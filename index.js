const http = require("http");
const fs = require("fs");
const { parse } = require("url");
const { promisify } = require("util");
const queryString = require("querystring");
const theData = require("./lib/data");

const port = 3000;
const host = "127.0.0.1";

//creating server
const httpServer = http.createServer((req, res) => {
  theData.create(
    "users",
    "data",
    {
      id: "id",
      accname: "accname",
      accnumber: "accnumber",
      email: "email",
      phonenumber: "phonenumber",
    },
    function(err) {
      console.log("File Creation", err);
    }
  );
  res.writeHead(200, "Content-Type", "text/plain");

  var parsedurl = parse(req.url, true);
  var pathname = parsedurl.pathname;
  var trimedpath = pathname.replace(/^\/+|\/+$/g, "");
  var queryString = parsedurl.query;
  var headers = req.headers;
  var method = req.method.toLowerCase();

  var decoder = new stringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(datachunk) {
    buffer += decoder.write(datachunk);
  });
});

req.on("end", function() {
  decoder.end();

  var data = {
    trimedPath: trimedPath,
    query: queryString,
    method: method,
    headers: headers,
    payload: helper.parsejsonObject(buffer),
  };

  console.log("trimed path", trimedPath);
  var chosenhandler =
    typeof router[trimedPath] !== "undefined"
      ? router[trimedPath]
      : handler.notFound;

  chosenhandler(data, function(statuscode, payload) {
    var payloadString = JSON.stringify(payload);
    statuscode = typeof statuscode == "number" ? statuscode : 200;
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statuscode);
    res.end(payloadString);
    console.log("end response" + " trimed path " + statuscode, payload);
  });
});

var handler = {};

handler.ping = (data, callback) => {
  callback(200, { success: true });
};

handler.notFound = (data, callback) => {
  callback(404, { success: false, message: "Not found" });
};

var router = {
  ping: handler.ping,
};

httpServer.listen(port, host, () => {
  console.log(`Server running on port: ${port} host: ${host}`);
});
