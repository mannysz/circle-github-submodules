var exports = {
        push: {}
    };

exports.push.getBranch = function(payload) {
    if(!payload) {
        throw new Error("Invalid payload!");
    } else if(!payload.ref) {
        throw new Error("Payload has no 'ref' attribute!");
    }

    var refParts = ref.split("/");
    var branchIndex = ref.length - 1;
    var branch = refParts[branchIndex];

    if(!branch || branch == "") {
        throw new Error("No branch specified on the given payload reference!");
    }

    return branch;
}

module.exports = exports;
