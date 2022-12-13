var correctCards = 0;
$(init);

function init() {
  // Hide the success message
  $("#successMessage").hide();

  $("#successMessage").css({
    left: "580px",
    top: "250px",
    width: 0,
    height: 0,
  });

  // Reset the game
  correctCards = 0;
  $("#cardPile").html("");
  $("#cardSlots").html("");

  // Create the pile of shuffled cards
  var numbers = [
    { pic: "images/portfolio/clock.jpg", value: 1 },
    { pic: "images/portfolio/cosmic-sneakers.jpg", value: 2 },
    { pic: "images/portfolio/eve.jpg", value: 3 },
    { pic: "images/portfolio/fields.jpg", value: 4 },
    { pic: "images/portfolio/judah.jpg", value: 5 },
    { pic: "images/portfolio/milk-splash.jpg", value: 6 },
    { pic: "images/portfolio/sneaker-splash.jpg", value: 7 },
    { pic: "images/portfolio/vector-flower.jpg", value: 8 },
    { pic: "images/portfolio/tribe.jpeg", value: 9 },
    { pic: "images/portfolio/earth.jpeg", value: 10 },
  ];
  numbers.sort(function () {
    return Math.random() - 0.5;
  });

  for (var i = 0; i < 10; i++) {
    console.log(numbers[i]);
    $(`<img src=${numbers[i].pic} alt="Image-${i} class="boxImage"/>`)
      .data("number", numbers[i].value)
      .attr("id", "card" + numbers[i].value)
      .appendTo("#cardPile")
      .draggable({
        containment: "#content",
        stack: "#cardPile img",
        cursor: "move",
        revert: true,
      });
  }

  // Create the card slots
  var words = [
    { name: "Clock", value: 1 },
    { name: "Cosmic sneakers", value: 2 },
    { name: "Eve", value: 3 },
    { name: "Fields", value: 4 },
    { name: "Judah", value: 5 },
    { name: "Milk splash", value: 6 },
    { name: "Sneaker splash", value: 7 },
    { name: "Vector Flower", value: 8 },
    { name: "Tribe", value: 9 },
    { name: "Earth", value: 10 },
  ];
  for (var i = 1; i <= 10; i++) {
    $("<div>" + words[i - 1].name + "</div>")
      .data("number", words[i - 1].value)
      .appendTo("#cardSlots")
      .droppable({
        accept: "#cardPile img",
        hoverClass: "hovered",
        drop: handleCardDrop,
      });
  }
}

function handleCardDrop(event, ui) {
  console.log("here");

  //Grab the slot number and card number
  var slotNumber = $(this).data("number");
  var cardNumber = ui.draggable.data("number");

  //If the cards was dropped to the correct slot,
  //change the card colour, position it directly
  //on top of the slot and prevent it being dragged again
  if (slotNumber === cardNumber) {
    ui.draggable.addClass("correct");
    ui.draggable.draggable("disable");
    $(this).droppable("disable");
    ui.draggable.position({
      of: $(this),
      my: "left top",
      at: "left top",
    });
    //This prevents the card from being
    //pulled back to its initial position
    //once it has been dropped
    ui.draggable.draggable("option", "revert", false);
    correctCards++; //increment keep track correct cards
  }

  //If all the cards have been placed correctly then
  //display a message and reset the cards for
  //another go
  if (correctCards === 10) {
    $("#successMessage").show();
    $("#successMessage").animate({
      left: "50%",
      top: "50%",
      width: "400px",
      height: "100px",
      opacity: 1,
    });
  }
}
