var http            = require("http"),
    request         = require("request"),
    createHandler   = require("github-webhook-handler"), // module to do the dirty job
    env             = require("./env.js"),               // environment functions
    extensions      = require("./extensions.js"),        // extended prototypes
    payload         = require("./ghpayload.js");         // github payload helper

var secretKey       = env.get("SECRET_KEY"),        // github secret key
    circleToken     = env.get("CIRCLECI_TOKEN"),    // circle-ci integration token
    circleEndpoint  = "https://circleci.com/api/v1",// circle-ci endpoint
    projectName     = env.get("PROJECT_NAME"),      // project name i.e: user/project 
    branches        = ["master", "staging"],        // available branches for deploy
    port            = parseInt(env.get("PORT"));    // port retrieved from Heroku env

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
        request.post(circleEndpoint + "/project/contentools/platform-build/tree/" + branch + "?circle-token=" + circleToken);

    } else {
        console.log("Nothing to do with the given branch.");
    }

    return "Done.";
});
