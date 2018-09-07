const express = require("express")
const app = express()
const ca = require("chalk-animation")
const { getToken } = require("./module")

app.use(express.static("./ticker-jQuery"))

// server.js
app.get("/data.json", (req, res) => {
    getToken(function(err, token) {
        if (err) {
            console.log(err);
            return
        }
        getTweets(token, function(err, tweets) {
            res.json(filterTweets(tweets))
        })
    })
})

app.listen(8080, ()=> ca.rainbow("I'm listenning on 8080"))
