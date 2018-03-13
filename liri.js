require("dotenv").config();



var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");

var keys = require("./keys");

// ref
// generates a new spotify key
var spotifyKey  = new Spotify(keys.spotify);

// readFile
var fs = require("fs");

//*******************************************************
// movie gang
//*******************************************************
var getMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }
  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var imdbData = JSON.parse(body);
      console.log("Movie Title: " + imdbData.Title);
      console.log("Movie Year: " + imdbData.Year);
      console.log("IMDB Rating: " + imdbData.imdbRating);
      console.log("Rotton Tomatoes Rating: " + imdbData.Ratings[1].Value);
      console.log("Country Produced: " + imdbData.Country);
      console.log("Language: " + imdbData.Language);
      console.log("Movie Plot: " + imdbData.Plot);
      console.log("Actors: " + imdbData.Actors);
    }
  });
};

//*******************************************************
// read file function
//*******************************************************
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      renderResults(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      renderResults(dataArr[0]);
    }
  });
};

//*******************************************************
// tweet lookup
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
        console.log("------")
        
      }
    }
  });
};

//*******************************************************
// spotify lookup
//*******************************************************


// get artist name
var artistName = function(artist){
	return artist.name;
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

  console.log("Artist: " + single[i].artists.map(artistName));
  console.log("Track Title: " + single[i].name);
  console.log("Track Link: " + single[i].preview_url);
  console.log("EP Title: " + single[i].album.name);  

 //  console.log(single[i].artists.map(artistName));//artist
	// //console.log(single[i].track.name);//track name
	// console.log(single[i].spotify_url);//preview url
	// console.log(single[i].album.name);//album
	console.log("------ END OF DETAILS FOR " + single[i].artists.map(artistName) + " ------");
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
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:// no valid value
      console.log("Try to enter another entry.");
  }
};



//*******************************************************
// Render data back based on input values in the console
//*******************************************************
var runReadFile = function(input1, input2) {
  renderResults(input1, input2);
};


var runFeedData = function(input1, input2) {
  renderResults(input1, input2);
};

runFeedData(process.argv[2], process.argv[3]);