var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// //Grabs the twitter key variable in js file
var myTwitterKeys = require("./keys.js");


var action = process.argv[2];

// //Gets all of twitterKeys from the keys file
var keyList = myTwitterKeys.twitterKeys;

    for (var key in keyList){
        var client = new Twitter({
            consumer_key:'YkqGz1EGYZPW2DWiQcg7fWNfx',
            consumer_secret:'7HpD8Oh3EXiZ3wQLHaQCxtwfj2Ohtv8Bl0DoR3Lfi7uWaT6LH9',
            access_token_key:'891422639461470214-HnBU5PbIKhewoGG7nPjgf9iC3vgceKv',
            access_token_secret:'4KXWcStVnfnnK2OCFszntKmMhauYhjOUlsoVV2erMoHtx'
        });
// console.log(key+":  " + keyList[key])
    }


var spotify = new Spotify({
    id: 'ec633d8ec4124d7a82be53903161c157',
    secret: '551d2db612ad4c98b3ec9efcd0696342',
    });

switch (action) {
  case "my-tweets":
    twitterLog();
    break;

  case "spotify-this-song":
    spotifyLog();
    break;

  case "movie-this":
    movieLog();
    break;

  case "lotto":
    lotto();
    break;
}


function twitterLog(){
    var params = {screen_name: 'nodeitup', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (i=0; i<tweets.length; i++){
            console.log("Tweet: " + tweets[i].text);
            console.log("Created On: " + tweets[i].created_at);
            }
        } else {
            console.log(error);
        }
    });

}

function spotifyLog (){
    var song = '';
    song = process.argv[3];
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
        var songInfo = data.tracks.items[0]
        var songResult = console.log("Artist: "+ songInfo.artists[0].name)
                         console.log("Song Name: " + songInfo.name)
                         console.log("Preview Url: " + songInfo.preview_url)
                         console.log("Album Name: " + songInfo.album.name)                
        console.log(songResult);
        } 
    });
}

function movieLog(){
    var movieName = process.argv[3]
// TODO Grab the request package...
// @link https://www.npmjs.com/package/request

// Run the request function..
// The request function takes in a URL then returns three arguments:
// 1. It provides an error if one exists.
// 2. It provides a response (usually that the request was successful)
// 3. It provides the actual body text from the website <---- what actually matters.
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request was successful...
        if (!error && response.statusCode === 200) {

    // Then log the body from the site!
            console.log("Title: " + JSON.parse(body).Title)
            console.log("Released Date: " + JSON.parse(body).Released);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country)
            console.log("Language: " + JSON.parse(body).Language)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors)
        }
    });
}