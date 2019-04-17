require('dotenv').config()
var axios = require("axios");
var inquirer = require('inquirer');
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function beginning() {
inquirer.prompt ([
    {
        type: "list",
        name: "options",
        message: "Select what you would like to search: ",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says", "quit"]
    }
])
.then(function(answers) {
   
    if(answers.choices = "concert-this") {
        concertThis();
    } else if (answers.choices = "spotify-this-song") {
        spotifyThis();
    } else if (answers.choices = "movie-this") {
        movieThis();
    } else {
        console.log("WTF")
    };
    
})
}
//concert-this function
function concertThis() {
    inquirer.prompt ([
            {
                type: "input",
                name: "concertThis",
                message: "What artist would you like to search? "
            }
        ])
.then(function(response){
 axios.get("https://rest.bandsintown.com/artists/" + response.concertThis + "/events?app_id=codingbootcamp")
 
          .then(function(response) {
            console.log("------------------------");
            console.log("Venue Name: " + response.data[1].venue.name);
            console.log("Vanue Location :" + response.data[1].venue.city);
            console.log("Date of Event: " + response.data[1].datetime);
            console.log("------------------------");
            beginning();
 });
 })}

function spotifyThis(response){
    inquirer.prompt ([
        {
            type: "input",
            name: "spotifyThis",
            message: "What song would you like to search? "
        }
    ])
.then(function(response){
    spotify.search({ 
        type: 'track', 
        query: response.spotifyThis })
        
        .then(function(response) {
            console.log("------------------------");
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Song Title: " + response.tracks.items[0].name);
            console.log("Preview Link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("------------------------");
        });
})};

function movieThis(){
    inquirer.prompt ([
        {
            type: "input",
            name: "movieThis",
            message: "What movie would you like to search? "
        }
    ])
.then(function(response){    
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + response.movieThis)

    .then(function(response){
        console.log("------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Production Country: " + response.data.Country);
        console.log("Movie Language: " + response.data.Language);
        console.log("Actors: " + response.data.Actors);
        console.log("Plot: " + response.data.Plot);
        console.log("------------------------");
    })
})};
beginning();
