var http            = require("http"),
    createHandler   = require("github-webhook-handler"),
    env             = require("./env.js"),
    extensions      = require("./extensions.js"),
    helpers         = require("./helpers.js");

var secretKey       = env.get("SECRET_KEY"),
    port            = parseInt(env.get("PORT")),
    branches        = ["master", "staging"];

var handler = createHandler({ path: "/deploy", "secret": secretKey});

http.createServer(function(req, res){
    handler(req, res, function(err) {
        res.statusCode = 404;
        res.end("Not found!");
    });
}).listen(port);



// Webhook Handlers

handler.on("error", function(err) {
    console.error("Error: " + err);
});

handler.on("push", function(evt) {
    var branch = null;
    if(evt && evt.payload && evt.payload.ref) {
        branch = helpers.push.getBranch(evt.payload);
    } else {
        throw new Error("Received invalid payload!");
    }
    
    console.log("Received push on branch " + branch);

    if(branches.contains(branch)) {
        console.log("Triggering '"+branch+"' build...");

    } else {
        console.log("Nothing to do with the given branch.");
    }

    return "Done!";
});
