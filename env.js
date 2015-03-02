var exports = {};

exports.get = function(envirVariable) {
    if(!envirVariable || envirVariable === "") {
        throw new Error("Invalid or empty variable name!");
    }

    var tmpVar = process.env[envirVariable];

    if(!tmpVar || tmpVar === "") {
        throw new Error("No value defined for environment variable '"+envirVariable+"'");
    }

    return tmpVar;
};

module.exports = exports;
