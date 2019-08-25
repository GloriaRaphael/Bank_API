var helper = {};

helper.parsejsonObject = str => {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (error) {
    return {};
  }
};

module.exports = helper;
