var fs = require("fs");
var path = require("path");
var helper = require("./helper");
var lib = {};

lib.baseDir = path.join(__dirname, "./../.data/");

//create Object
var newAccount = {
  id: "id",
  accname: "accname",
  accnumber: "accnumber",
  email: "email",
  phonenumber: "phonenumber",
};
//create a file
lib.create = function(dir, filename, data, callback) {
  fs.open(
    lib.baseDir + dir + filename + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        var stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, err => {
          if (!err) {
            fs.close(fileDescriptor, err => {
              if (!err) {
                callback(false);
              } else {
                callback("Error writing file");
              }
            });
          } else {
            callback("could not create a new file, it may exist already");
          }
        });
      }
    }
  );
};

lib.read = function(dir, filename, callback) {
  fs.readFile(lib.baseDir + dir + "/" + filename + ".json", "utf-8", function(
    err,
    data
  ) {
    if (!err && data) {
      callback(false, helper.parsejsonObject(data));
    } else {
      callback(err, data);
    }
  });
};

lib.update = function(dir, filename, data, callback) {};

lib.delete = function(dir, filename, callback) {};

module.exports = lib;
