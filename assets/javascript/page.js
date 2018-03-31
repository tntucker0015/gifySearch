      // Initial array of topics
      var topics = ["trex", "dog", "pig"];
const STATE_STILL = "still";
const STATE_ANIMATE = "animate";
      

      // Function for displaying topic data
      function renderButtons() {
        $("#topics-view").empty();
        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topic");
          a.attr("data-topic", topics[i]);
          a.text(topics[i]);
          $("#topics-view").append(a);      
        }
      }
      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();  
        var topic = $("#topic-input").val().trim();
        $("#topic-input").val("");
        if(!(topics.indexOf(topic) > -1 )) {
        topics.push(topic);
       renderButtons();
        }
        // calling renderButtons which handles the processing of our topics array
        renderButtons();
      });
      renderButtons();        
$(document).on("click", ".topic", function(event) {
  $("#gifs-appear-here").empty();
  var topic = $(this).attr("data-topic");
  console.log(topic);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Z40UNZZ3GxXzS7ZUrHjpSLm7MPkZKeNZ&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var topicImage = $("<img>");
          topicImage.attr("src", results[i].images.fixed_height_still.url);
          topicImage.attr("data-still", results[i].images.fixed_height_still.url);
          topicImage.attr("data-animate", results[i].images.fixed_height.url);
          topicImage.attr("data-state", "still");
          topicImage.attr("class", "gif");
          gifDiv.append(p);
          gifDiv.append(topicImage);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      } 
    
    $(".gif").on("click", function() {
      const element = $(this);
      const state = $(element).attr("data-state");
      console.log(state);
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", STATE_ANIMATE);
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", STATE_STILL);
      }
    });
});
});
