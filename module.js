const https = require('https')
const { consumerKey, consumerSecret } = require('./secrets')

module.exports.getToken = function getToken(callback) {

    // read the twitter documentation to finish writing up options
    // https://developer.twitter.com/en/docs/basics/authentication/overview/application-only
    let options = {
        method: "POST",
        host: 'api.twitter.com',
        path: '/oauth2/token',
        headers: {
            Authorization: "Basic " + new Buffer(consumerKey + ":" + consumerSecret).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    };

    let cb = function(response) {
        let str = '';

        if (response.statusCode != 200) {
            callback(response.statusCode)
            return
        }

        // another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        // the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            var bearerToken = str
            // if things go well, this console log should
            // be a json object that has bearer token in it!
            console.log("Bearer token string: ", bearerToken);

            // let bearerToken = "something"
            callback(null, bearerToken)
        });
    }

    // we defined options & cb up above
    // once defined, we pass them to request method of https
    const req = https.request(options, cb)

    // if we need to send body with req -- do that here
    req.write("grant_type=client_credentials")

    // send HTTPS request
    req.end()
}

module.exports.getTweets = function getTweets(bearerToken, callback) {
    // https request to get tweets
    // the documentation you need is at:
    // https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
}
