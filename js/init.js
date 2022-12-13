/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function () {
  /*----------------------------------------------------*/
  /*	Flexslider
/*----------------------------------------------------*/
  $("#intro-slider").flexslider({
    animation: "fade",
    controlNav: false,
  });

  /*----------------------------------------------------*/
  /*	gmaps
------------------------------------------------------*/

  var map;

  // main directions
  map = new GMaps({
    el: "#map",
    lat: 14.553533,
    lng: 121.052124,
    zoom: 14,
    zoomControl: true,
    zoomControlOpt: { style: "SMALL", position: "TOP_LEFT" },
    panControl: false,
    scrollwheel: false,
  });

  // add address markers
  map.addMarker({
    lat: 14.552891,
    lng: 121.051815,
    title: "Eco Tower",
    infoWindow: { content: "<p>You can add your address 1 here</p>" },
  });

  /*----------------------------------------------------*/
  /*	contact form
------------------------------------------------------*/

  $("form#contactForm button.submit").click(function () {
    $("#image-loader").fadeIn();

    var contactName = $("#contactForm #contactName").val();
    var contactEmail = $("#contactForm #contactEmail").val();
    var contactSubject = $("#contactForm #contactSubject").val();
    var contactMessage = $("#contactForm #contactMessage").val();

    var data =
      "contactName=" +
      contactName +
      "&contactEmail=" +
      contactEmail +
      "&contactSubject=" +
      contactSubject +
      "&contactMessage=" +
      contactMessage;

    $.ajax({
      type: "POST",
      url: "inc/sendEmail.php",
      data: data,
      success: function (msg) {
        // Message was sent
        if (msg == "OK") {
          $("#image-loader").fadeOut();
          $("#message-warning").hide();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();
        }
        // There was an error
        else {
          $("#image-loader").fadeOut();
          $("#message-warning").html(msg);
          $("#message-warning").fadeIn();
        }
      },
    });

    return false;
  });
});

$(document).ready(function () {
  $("#contactform").submit((event) => {
    var isValid = true;

    // patterns
    var namePattern = /^[a-z ,.'-]+$/i;
    var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    var subjectPattern = /^[a-z ,.'-]+$/i;
    var messagePattern = /^[a-z ,.'-]+$/i;

    //to get the Input Box Values
    var name = $("#contactName").val().trim();
    var email = $("#contactEmail").val().trim();
    var subject = $("#contactSubject").val().trim();
    var message = $("#contactMessage").val().trim();

    // patterns get the #contactName
    if (name == "") {
      $("#contactName").next().text("This field is required");
      isValid = false;
    } else if (!namePattern.test(name)) {
      $("#contactName").next().text("Please enter a name");
    } else {
      $("#contactName").next().text("");
    }
    // $("#contactName").val(name);

    // patterns get the #ContactEmail
    if (email == "") {
      $("#contactEmail").next().text("This field is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      $("#contactEmail").next().text("Please enter a valid email id.");
      isValid = false;
    } else {
      $("#contactEmail").next().text("");
    }
    // $("#contactEmail").val(email);

    // patterns get the #ContactSubject
    if (subject == "") {
      $("#contactSubject").next().text("This field is required");
      isValid = false;
    } else if (!subjectPattern.test(subject)) {
      $("#contactSubject").next().text("Please enter a valid subject.");
      isValid = false;
    } else {
      $("#contactSubject").next().text("");
    }
    // $("#contactSubject").val(subject);

    // Patterns get the #ContactMessage
    if (message == "") {
      $("#contactMessage").next().text("This field is required");
      isValid = false;
    } else if (!messagePattern.test(subject)) {
      $("#contactMessage").next().text("Please enter a valid subject.");
      isValid = false;
    } else {
      $("#contactMessage").next().text();
    }
    // $("#contactMessage").val(message);

    // prevent the default if not valid
    if (isValid == false) {
      event.preventDefault();
    }
  });
});
