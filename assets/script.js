// Initial arrays of topics
var topics = ["Evil Kitty", "Shocked puppy", "LOL", "Archer", "T rex", "no you didn't"];




// displayTopicInfo function re-renders the HTML to display the appropriate content
function displayTopicInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&rating";
    console.log(queryURL);

    // Creates the ajax call for the specific button
    var request = $.ajax({
        dataType: "json",
        url: queryURL,
        method: "GET"

    });

    // waits until the response is done 
    request.done(function(response) {
        // For loop to ditribute url'sto the page
        for (var i = 0; i < response.data.length; i++) {
            // Thiswas placed so I could operate with one rather then ten gifs for testing purposes
            // for(var i = 0; i < 1; i++){
            // I was using an alert but the font was too small and I couldn't copy and paste from it, the console.log remedied it for me
            console.log(JSON.stringify(response.data[i]));
            // I initaily had these as var imgurlAnimate, but I modified it to try and simplify my calls for still and animate, but it didn't work
            // This is where we place our gif in to a var
            var animate = response.data[i].images.fixed_height.url

            var still = response.data[i].images.fixed_height_still.url;
            // this is the rating beingplaced into a var
            var rating = response.data[i].rating;
            // Here we are arranging the div to be published to the page
            var topicDiv = "<div id='gif'>";
            topicDiv += "<p>Rating: " + rating + "</p>";
            // I broke it onto numerous lines for readability i.e. it was a pain for me to track what I was typing and needed to breakit up
            var imgBit = "<img height=200 width=200 ";
            imgBit += "src=\"" + animate + "\" ";
            imgBit += "/></img>";
            topicDiv += imgBit + "</div>";
            // this is the where the information that we have pulled is attached to the page and the fun commences
            $("#images").prepend(topicDiv);


            // Here lies my failed attempt at animating and stilling the gif.  I had tried numeroous approaches, but could not find the solution in time.
            // images.attr({"still":still, "animate":animate, "state":still});

            // $(images).on("click", function() {
            //     var state = $(this).attr("state");
            //     var source = $(this).attr("src");

            //     if (state === "still") {
            //       $(this).attr("src", $(this).attr("animate"));
            //       $(this).attr("state", "animate");
            //       } else {
            //         $(this).attr("src", $(this).attr("still"));
            //         $(this).attr("state", "still");
            //       }
            // });
        }

    });
}

// Function for displaying topics
function renderButtons() {
    // To avoid repeat buttons
    $("#topics-view").empty();
    // looping through the array
    for (var i = 0; i < topics.length; i++) {
        // generate the buttons for each topic
        // generate start and end tag of button
        var a = $("<button>");
        // adding a class
        a.addClass("topic");
        // adding a data value of the topic at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topics[i]);
        // adding the buttonto the HTML
        $("#topics-view").append(a);
    }
}

$("#add-topic").on("click", function(event) {
    // prevent form from submitting itself
    event.preventDefault();
    // grab text from the input box
    var topic = $("#topic-input").val().trim();
    // then adds it to the array
    topics.push(topic);
    // calls the function to populate with the initial list of topics
    renderButtons();

});

$(document).on("click", ".topic", displayTopicInfo);

renderButtons();
