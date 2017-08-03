//variable to require fs, request, twitter, node
var fs = require("fs");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

//sets variable to be used for switch call 
var action = process.argv[2];

//Grabs the twitter & spotify keys  in js file
var myTwitterKeys = require("./keys.js");
var mySpotifyKeys = require("./keys.js")

//sets variable for twitter & spotify Keys from the keys file
var twitterKeyList = myTwitterKeys.twitterKeys;
var spotifyKeyList = mySpotifyKeys.spotifyKeys;

var client = new Twitter(twitterKeyList);
var spotify = new Spotify(spotifyKeyList);

//create switch call for node input arguments
switch (action) {
  case "my-tweets":
    twitterLog();
    break;

  case "spotify-this-song":
    var song = '';
    song = process.argv[3];
    if(process.argv[3] === undefined){
        var song = "The Sign Ace of Base"
    }
    spotifyLog(song);
    break;

  case "movie-this":
    var movieName = process.argv[3]
    if(process.argv[3] === undefined){
        var movieName = "Mr. Nobody"
    }
    movieLog();
    break;

  case "do-what-it-says":
    sayLog();
    break;
}

//create function for Twitter argument
function twitterLog(){
    var params = {screen_name: 'nodeitup', count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i=0; i<tweets.length; i++){
            console.log("\nTweet: " + tweets[i].text);
            console.log("Created On: " + tweets[i].created_at+ "\n");
            }
        } else {
            console.log(error);
        }
    });

}

//create function for spotify argument 
function spotifyLog (song){
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
        var songInfo = data.tracks.items[0]
        var songResult = console.log("\nArtist(s): "+ songInfo.artists[0].name)
                         console.log("Song Name: " + songInfo.name)
                         console.log("Preview Url: " + songInfo.preview_url)
                         console.log("Album Name: " + songInfo.album.name +"\n")                
        } 
                    
    });
}

//create function for movie argument 
function movieLog(){
    // use request package to grab data from omd api
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    // If the request was successful and there are no errors 
        if (!error && response.statusCode === 200) {

    // Log the body from the site
            console.log("\nTitle: " + JSON.parse(body).Title)
            console.log("Released Date: " + JSON.parse(body).Released);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country)
            console.log("Language: " + JSON.parse(body).Language)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors + "\n")
        }
    });
}

function sayLog(){
    //run readFile and store the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        } else {
        var dataArr = data.split(",")
        var action = dataArr[0];
        var song = dataArr[1];

        spotifyLog(song);
        }

    })
}
    