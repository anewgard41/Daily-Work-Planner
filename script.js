
$(document).ready(function () {

  setInterval(clockTick, 1000)


  $(".saveBtn").on("click", function () {

    // After using $, 'this' becomes the button element. This enables DOM traversal to the sibling textArea element with class ".description", and the parent Div that has the "hour-x" id.

    // The value var is the description of the work in the textArea. Variables are declared and set in localStorage. 

    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    localStorage.setItem(time, value);

    // Feedback section of DOM given "show" class for 5 seconds using setTimeout.

    $(".alert").addClass("show");

    setTimeout(function () {

      $(".alert").removeClass("show");

    }, 5000)

  })

})

// Checks the hour every 15 seconds to make sure color coordination is correct.

setInterval(hourChecker, 15000)

// hourChecker applies correct class to each time-block using a for loop (.each). Depends on if the current hour matches or is before/after the time block. Takes the time-block id selector and splits it at the "-", in order to isolate the string with the hour number. 

function hourChecker() {

  var currentHour = dayjs().format("HH");

  $(".time-block").each(function () {
    var blockHour = $(this).attr("id").split("-")[1];
    if (currentHour > blockHour) {
      $(this).addClass("past");
      $(this).removeClass("present")
      $(this).removeClass("future")
    } else if (currentHour == blockHour) {
      $(this).addClass("present");
      $(this).removeClass("future");
      $(this).removeClass("past");
    } else {
      $(this).addClass("future");
      $(this).removeClass("past");
      $(this).removeClass("present");
    }
  })
}

// Grabs the description of the timeblock from local storage. Ensures text stays after refresh. 

$(".time-block").each(function () {
  $(this).children(".description").val(localStorage.getItem($(this).attr("id")))
})

// Initializes hourChecker. Then the interval above checks the hour every 15 seconds.  

hourChecker();

// Clock function. Updates the time on the DOM every second using setInterval above. 

function clockTick() {
  $("#currentDay").text(dayjs());
}
