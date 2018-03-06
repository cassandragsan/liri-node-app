require("dotenv").config();


var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

var keys = require("./keys");

//ref
// generates a new spotify key
var spotifyKey  = new Spotify(keys.spotify);

//*******************************************************
// twitter lookup
//*******************************************************

var getTweets = function() {
  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: "techdreamher"
  };

  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    }
  });
};

//*******************************************************
// spotify lookup
//*******************************************************


// get artist name
var artistName = function(artist){
	return artists.name;
};

// get song info
var querySong = function(songName){
if (songName === undefined) {
    songName = "Do For Love";
  }


  spotifyKey.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      	}
      

var single = data.tracks.items;

for (var i = 0; i < single.length; i++) {
	//console.log(single[i].artistName);//artist
	console.log(single[i].name);//track name
	console.log(single[i].preview_url);//preview url
	console.log(single[i].album);//album
	console.log("------ END OF DETAILS FOR " + single[i].artistName + " ------");
	break;
      }
    }
  );
};

var renderResults = function(resultData, functionData) {
  switch (resultData) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      querySong(functionData);
      break;
    default:// no valid value
      console.log("Try to enter another Twitter Handle. Twitter does not recognize the one you entered.");
  }
};



//*******************************************************
// Render data back based on input values in the console
//*******************************************************
var runFeedData = function(input1, input2) {
  renderResults(input1, input2);
};

runFeedData(process.argv[2], process.argv[3]);