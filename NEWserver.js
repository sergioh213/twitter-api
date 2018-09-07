const express = require("express");
const app = express();
const { getToken, getTweets, filterTweets } = require("./work");
const fs = require("fs");

app.use(express.static("./ticker-jQuery"));

app.get("/data.json", function(req, res){

    getToken()
    .then(token => {
        console.log("Token at THEN: ", token);
        return Promise.all([
            getTweets(token, "theonion"),
            getTweets(token, "bbc"),
            getTweets(token, "nytimes")
        ])
    }).then(tweets => {
        console.log("this");
        const theonion = tweets[0]
        const bbc = tweets[1]
        const nytimes = tweets[2]

        let mergedArrayOfTweets = theonion.concat(bbc, nytimes)

        mergedArrayOfTweets.sort(function(a, b){
            return new Date(b.created_at) - new Date(a.created_at);
        })

        console.log("this 2");
        const filteredTweets = mergedArrayOfTweets.filter(
            tweet => tweet.entities.urls.length === 1
        );
        //const filteredTexts = filteredTweets
        let filteredTexts = [];
        console.log("FIRST !!! THIS IS THE FILTERED TEXTS: ", filteredTexts);
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
        console.log("THIS IS THE FILTERED TEXTS: ", filteredTexts);
        res.json(filteredTexts);

    }).catch(()=>{
        res.sendStatus(500)
    })
})

app.listen(8080);

// app.get("/data.json", (request, response) => {
//     getToken(function(err, token) {
//         console.log("Hello World");
//         if (err) {
//             console.log(err);
//             return;
//         }
//         getTweets(token, function(err, tweets) {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//
            // const filteredTweets = tweets.filter(
            //     tweet => tweet.entities.urls.length === 1
            // );
            // //const filteredTexts = filteredTweets
            // let filteredTexts = [];
            // for (let i = 0; i < filteredTweets.length; i++) {
            //     let text = filteredTweets[i].text;
            //     let textWithoutLinks = text.replace(
            //         filteredTweets[i].entities.urls[0].url,
            //         ""
            //     );
            //
            //     const mediaLinks = filteredTweets[i].entities.media;
            //     if (mediaLinks !== undefined) {
            //         for (let t = 0; t < mediaLinks.length; t++) {
            //             textWithoutLinks = textWithoutLinks.replace(
            //                 mediaLinks[t].url,
            //                 ""
            //             );
            //         }
            //     }
            //
            //     filteredTexts.push({
            //         headline: textWithoutLinks,
            //         href: filteredTweets[i].entities.urls[0].url
            //     });
            // }
            // response.json(filteredTexts);
//         });
//     });
// });
