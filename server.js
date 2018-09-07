const express = require("express");
const app = express();
const { getToken, getTweets } = require("./modules");
const fs = require("fs");

app.use(express.static("./ticker-jQuery"));

app.get("/data.json", (request, response) => {
    getToken(function(err, token) {
        console.log("Hello World");
        if (err) {
            console.log(err);
            return;
        }
        getTweets(token, function(err, tweets) {
            if (err) {
                console.log(err);
                return;
            }

            const filteredTweets = tweets.filter(
                tweet => tweet.entities.urls.length === 1
            );
            //const filteredTexts = filteredTweets
            let filteredTexts = [];
            for (let i = 0; i < filteredTweets.length; i++) {
                let text = filteredTweets[i].text;
                let textWithoutLinks = text.replace(
                    filteredTweets[i].entities.urls[0].url,
                    ""
                );

                const mediaLinks = filteredTweets[i].entities.media;
                if (mediaLinks !== undefined) {
                    for (let t = 0; t < mediaLinks.length; t++) {
                        textWithoutLinks = textWithoutLinks.replace(
                            mediaLinks[t].url,
                            ""
                        );
                    }
                }

                filteredTexts.push({
                    headline: textWithoutLinks,
                    href: filteredTweets[i].entities.urls[0].url
                });
            }
            response.json(filteredTexts);
        });
    });
});
app.listen(8080);
