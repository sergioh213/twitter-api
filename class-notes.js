const fs = require('fs')

// you can promisify a function (so turn a function into something that
// returns a promise that we can then chain "then" and "catch" to)
// using two methods: (1) the Promise constructor, and (2) util's promisify

///////////////////////////////////////////////////////////////////////////////
/////////////////// PROMISIFYING A FUNCTION USING PROMISIFY ///////////////////
///////////////////////////////////////////////////////////////////////////////

// (2) promisifying a function using promisify
// you can promisify a function that accepts a node-style* callback
// and promisify will automatically promisify that function for you
// * node-style callback = (n, (err, val) => {})
const { promisify } = require('util')
const readdir = promisify(fs.readdir)

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END PROMISIFY ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
///////// PROMISIFYING A FUNCTION USING THE PROMISE CONSTRUCTOR  //////////////
///////////////////////////////////////////////////////////////////////////////

// (1) promisifying using the Promise constructor
// you can promisify a function using the Promise constructor
function readdir(path) {

    return new Promise((resolve, reject) => {

        fs.readdir(path, (err, files) => {
            if (err) {
                // if your function can throw an error,
                // we need to reject that error when promisifying the function
                reject(error);
            } else {
                // resolve means "the async process worked, and I got the result I wanted!"
                resolve(files);
            }
        })
    })
}

readdir(__dirname)

    // the value we RESOLVE will be captured in "then"
    // we NEED then if we want to see and work with the values we resolve!
    .then(filesFromReaddir => {
        console.log("filesFromReaddir: ", filesFromReaddir);
    })

    // the value we REJECT will be captured in "catch"
    .catch(err => {
        console.log("error: ", err);
    })

///////////////////////////////////////////////////////////////////////////////
//////////////////////////// END PROMISE CONSTRUCTOR //////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// PROMISE ALL ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// you can use Promise.all to do multiple things asynchronously, and then
// do something with the results of those async processes
Promise.all([
    readdir(__dirname + "/alksdnaksjdnada"),
    readdir(__dirname)
])

    // will run if all promises resolve
    .then(resultsFromReaddirs => {
        console.log("resultsFromReaddirs ", resultsFromReaddirs);
    })

    // will run if one or more of the promises are rejected
    .catch(err => {
        console.log("promise all rejected!!!", err);
    })

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// END PROMISE ALL //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
