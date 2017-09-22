//Create an object called artApp
artApp = {};

//api key I got from the rijksmuseum website
artApp.apikey = "H7BslfjI";
//What does thumbsize do?
// artApp.thumbSize = 500;

//When the page runs, artApp.init is called, and it grabs 
//the query from the selected default item, which is Monkey
artApp.init = function(){
  artApp.getPieces("monkey");
  //If the selection is changed, run this
  $("#animal-select").on("change", function(){
    //The value of #animal-select is taken, which is a name of an animal
    var animal = $(this).val();
    //This will grab the title"s text
    var animalName = $(this).find(":selected").text();
    //Updates title
    artApp.updateTitle(animalName);
    //Recalls the API to query new results based on selection
    artApp.getPieces(animal);
  });
  $("#search").on("click", function(){
    //The value of the query is taken
    var yourSearch = $("#input").val();
    var titleName = $("#input").val();
    artApp.updateTitle(titleName);
    artApp.getPieces(yourSearch);
  });
};

artApp.getPieces = function(query){
  $.ajax({
    url: "https://www.rijksmuseum.nl/api/en/collection",
    type: "GET",
    data: {
      //At the top of the page
      key: artApp.apikey,
      //Returns the data in jsonp format
      format: "jsonp",
      //The search, which is either a selection or the user"s search
      q: query,
      //Amount of results
      ps: 100,
    },
    dataType: "jsonp",
    //If it successfully returns(200 status), display the images
    success: function(result){
      $("#artwork").empty();
      artApp.displayPieces(result.artObjects);
    }
  });
};

artApp.displayPieces = function(data){
  //Every art piece that is displayed will be appended with a certain style, and this is the style
  $.each(data, function(i, piece){
    var image = $("<img>").attr("src", piece.webImage.url);
    var title = $("<h2>").text(piece.title);
    var artist = $("<p>").addClass("artist").text(piece.principalOrFirstMaker);
    var artPiece = $("<div>").addClass("piece").append(image, title, artist);
    $("#artwork").append(artPiece);
  });
};

artApp.updateTitle = function(subject){
  $("#page-title").find("span").text(subject);
};


$(function(){
  artApp.init();
});
