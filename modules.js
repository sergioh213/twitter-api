const https = require("https");
const { consumerKey, consumerSecret } = require("./secrets");

module.exports.getToken = function getToken(callback) {
    let options = {
        method: "POST",
        host: "api.twitter.com",
        path: "/oauth2/token",
        headers: {
            Authorization:
                "Basic " +
                new Buffer(consumerKey + ":" + consumerSecret).toString(
                    "base64"
                ),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };

    let cb = function(response) {
        var str = "";
        if (response.statusCode != 200) {
            console.log("Torsten", response.statusCode);
        }

        //another chunk of data has been recieved, so append it to `str`
        response.on("data", function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on("end", function() {
            const responseJSON = str;
            const responseObject = JSON.parse(responseJSON);
            const bearerToken = responseObject.access_token;
            console.log("Sergio's: ", bearerToken);
            callback(null, bearerToken);
        });
    };

    const req = https.request(options, cb);

    req.write("grant_type=client_credentials"); //if the request has a body, should be here

    req.end();
};

module.exports.getTweets = function getTweets(bearerToken, callback) {
    console.log("Hello Berlin", bearerToken);
    let options = {
        method: "GET",
        host: "api.twitter.com",
        path:
            "/1.1/statuses/user_timeline.json?screen_name=verge&count=10",
        headers: {
            Authorization: "Bearer " + bearerToken
        },
        json: true
    };

    let cb = function(response) {
        var obj = "";
        if (response.statusCode != 200) {
            console.log(response.statusCode);
        }

        //another chunk of data has been recieved, so append it to `str`
        response.on("data", function(chunk) {
            obj += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on("end", function() {
            var tweets = JSON.parse(obj);
            console.log(JSON.stringify(tweets, null, 4));
            callback(null, tweets);
        });
    };

    const req = https.request(options, cb);
    console.log(req);

    req.end();
};
