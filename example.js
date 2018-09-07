app.get("/data.json", function(req, res){

    getToken()
    .then(token => {
        return Promise.all([
            getTweets(token, "theonion"),
            getTweets(token, "bbc"),
            getTweets(token, "nytimes"),
        ])
    }).then(tweets => {

        const theonion = tweets[0]
        const bbc = tweets[1]
        const nytimes = tweets[2]

        let mergedArrayOfTweets == theonion.concat(bbc, nytimes)

        mergedArrayOfTweets.sort(function(a, b){
            return new Date(b.created_at) - new Date(a.created_at);
        })

        console.log("tweets: ", mergedArrayOfTweets);

        res.json({
            tweets: filterTweets(tweets)
        })

    }).catch(()=>{
        res.sendStatus(500)
    }
})
