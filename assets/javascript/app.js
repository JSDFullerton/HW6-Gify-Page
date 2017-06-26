
// 1. INITIAL ARRAY OF ANIMALS
	var animals = ["tiger", "lion", "panther"];
	// var apiResults = "";


// 2. CREATE BUTTONS
	function createButtons() {

		// DELETING EXISTING BUTTONS
		$("#animal-buttons").empty();


		// GENERATE BUTTONS FOR EXISTING ARRAY
		for (var i = 0; i < animals.length; i++) {
			
			var button = $("<button>");
				button.addClass("animal-button button btn btn-default");
				button.attr("data-animal", animals[i]);
				button.attr("data-state", "still");
				button.attr("type", "button");
				button.text(animals[i]);

			$("#animal-buttons").append(button);

		}// for loop close		
	}// createButtons function close



// 4. USER CREATES NEW BUTTON
	$("#add-animal").on("click", function(event) {

		event.preventDefault();

		var newAnimal = $("#animal-input").val().trim();
		animals.push(newAnimal);

		createButtons();
	});



// 2. AJAX CALL FOR GIF ON CLICK
	$(document).on("click", ".animal-button", function() {


		var animal = $(this).attr("data-animal");
		
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    	$.ajax({
    		url: queryURL,
    		method: "GET"
    	})
    		
    	.done(function(response) {
    		console.log(queryURL);
    		console.log(response);

    		var apiResults = response.data;

    		for (var i = 0; i < apiResults.length; i++) {


    			// CREATE DIV TO HOLD ANIMAL GIFS	
    				var animalDiv = $("<div>");

    			// STORING & DISPLAYING GIF RATING
    				var rating = $("<p class='rating'>").text("Rating: " + apiResults[i].rating);

    			// STORING & DISPLAYING ANIMAL GIF
    				var animalImage = $("<img class='img-circle'>");	
    				animalImage.addClass("gif col-md-4");
    				animalImage.attr("src", apiResults[i].images.original_still.url);
    				animalImage.attr("data-animated", apiResults[i].images.fixed_height.url);
    				
    				
    				animalDiv.append(rating);
    				animalDiv.append(animalImage);

    			// SHOW ANIMAL DIV ON HTML
    			$("#animals-view").prepend(animalDiv);
	
    		}// for loop close

    	});// done func close

    });// on click func close


// 5. PAUSING GIFS
	$(document).on("click", ".gif", function() {

		var state = $(this).attr("data-state");
		var still = $(this).attr("src");
		var live = $(this).attr("data-animated")
		
		console.log(live);
		console.log(still);
		debugger;

		if (state === "still") {
			// $(this).attr("src", apiResults[i].images.fixed_height.url);
			$(this).attr("src", live);
			$(this).attr("data-state", "live");
		}

		else {
			// $(this).attr("src", $(this).attr(apiResults[i].images.original_still.url));
			$(this).attr("src", still);
			$(this).attr("data-state", "still");
		}
	
	});// on click close





// 6. CALLING FUNCTIONS
	createButtons();	












