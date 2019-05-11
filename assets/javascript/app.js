/***********************************************
 * Project: Comic Inventory
 * Team: Guardians of the GitHub
 * Date: 2019-05-09
 ***********************************************/
// Global Variables
var hero = "";
var group = "";
var title = "";
var issueNumber = "";
var publishYear = "";
var youTubeApiKey = "AIzaSyBcitIxopM2jyltwYAVk9qELClFOuHc0D8"
var apiKey = "ff8b709602975b5a96f9be6741475400";
var privateKey = "f7963e274cda4d92a76dd0c475e513e5d9dc7708";

// jQuery
var characterImage = $("#character-image");
var groupImage = $("#group-image");
var issueImage = $("#issue-image");
var youtubeVideo = $("#youtube-video");
var heroInput = $("#hero-name-input");
var groupInput = $("#group-input");
var titleInput = $("#title-name-input")
var issueNumberInput = $("#title-name-input");
var publishYearInput = $("#publish-year-input");

/**
 * On click function to dispaly any media associated with the character/group
 */
function displayCollectionMedia() {
    event.preventDefault();
    characterImage.empty();
    groupImage.empty();
    issueImage.empty();
    youtubeVideo.empty();

    //NOTE: Replace following code with a process to get the required API input fields
    //      form the data base.  The form references are for a temporary test tool
    //////Start Trash code
    hero = heroInput.val().trim();
    heroInput.val("");
    group = groupInput.val().trim();
    groupInput.val("");
    title = titleInput.val().trim();
    titleInput.val("");
    issueNumber = issueNumberInput.val().trim();
    issueNumberInput.val("");
    publishYear = publishYearInput.val().trim();
    publishYearInput.val("");
    getCharacterDetails();
    getYoutubeTrailerForCharacter(hero);
    if (group) {
        getGroupDetails();
    }
    if (title && issueNumber) {
        getComicDetails();
    }
    ///////End Trash Code
}

/**
 * Call marvel API for basic character details
 */
function getCharacterDetails() {
    event.preventDefault();
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name="
        + hero + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + hash;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                console.log(response);
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    displayCharacterImage(tnURL);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
* Call marvel API for basic affiliated group details
*/
function getGroupDetails() {
    event.preventDefault();
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
    var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name="
        + group + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + hash;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                console.log(response);
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    displayGroupImage(tnURL);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
 * Call marvel API for basic comic details
 */
function getComicDetails() {
    event.preventDefault();
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();

    var queryURL = "https://gateway.marvel.com:443/v1/public/comics?title=" + title;
    if (publishYear) {
        queryURL += "&startYear=" + publishYear;
    }
    queryURL += "&issueNumber=" + issueNumber + "&ts=" + ts + "&apikey=" + apiKey + "&hash=" + hash;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                if (response.data.results[0]) {
                    var tnPath = response.data.results[0].thumbnail.path;
                    var tnExtension = response.data.results[0].thumbnail.extension;
                    var tnURL = tnPath + "." + tnExtension;
                    displayComicImage(tnURL);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
 * Render character image from path to thumnail
 * @param url 
 */
function displayCharacterImage(url) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "character image");
    $("#character-image").append(image);
}

/**
 * Render group image from path to thumnail
 * @param url 
*/
function displayGroupImage(url) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "group image");
    $("#group-image").append(image);
}

/**
 * Render comic image from path to thumnail
 * @param url 
*/
function displayComicImage(url) {
    var image = $("<img>");
    image.attr("src", url);
    image.attr("alt", "group image");
    $("#issue-image").append(image);
}

/**
 * Call YouTube API for official trailer for hero
 */
function getYoutubeTrailerForCharacter (hero) {
    event.preventDefault();
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+ hero + "+official+trailer&type=video&videoCaption=closedCaption&key=" + youTubeApiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            if (response) {
                if (response.items[0].id.videoId) {
                    var id = response.items[0].id.videoId;
                    displayYoutubeTrailer(id);
                }
                else {
                    alert("Invalid Input");
                }

            }
        });
}

/**
 * Render official trailer from response using videoId
 * @param id 
*/
function displayYoutubeTrailer(id) {
    var video = "https://www.youtube.com/embed/" + id
    var youtubeFrame = $("<iframe>", { src: video, frameborder: "0", height: "315", width: "560", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"})
    $("#youtube-video").append(youtubeFrame);
}


/** On-Click for Enter Hero */
$(document).on("click", "#row-entry", displayCollectionMedia);