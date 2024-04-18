// fetch user name from database and display it on user interface

baseUrl = "http://localhost:8080/bookingApp/";

function getFetch(endpoint, updateFunc) {
  const url = `${baseUrl}${endpoint}`;

  fetch(url, {
    method: "GET",
  })
    //handle the response, includes check for errors
    .then(handleResponse)
    .then((data) => {
      // uses the received  data to update the user interface {this includes functions that update the Accuracy  and Precision  along with table values}
      updateFunc(data);
    })
    .catch((err) => {
      console.error("Problem with fetch operation, ", err);
    });
}

// perform POST request
function postFetchMe(endpoint, data, sendFunc) {
  const url = `${baseUrl}${endpoint}`;

  //Initialize configuration for the fetch request
  let config = {
    method: "POST",
    headers: {},
    body: data,
  };

  fetch(url, config)
    //check and process the server response
    .then(handleResponse)
    .then((data) => {
      // this includes functions that deal with sending to server
      sendFunc(data);
    })

    .catch((err) => {
      //Display a specific error message to user interface
      showError(err);
      console.error("Problem with fetch operation, ", err);
    });
}

/* Fetch timeslots from appointment endpoint for doctor 1 and update calendar when 'book appointment' button is clicked*/

const appt_btn = document.querySelector(".Book_Appointment_btn");
const calendar = document.querySelector("#calendar");
var timeslot_array = [];

/* timeslot array will look like this 

  {
          title: "Doctor 1",
          start: "2024-04-17T08:00",
          end: "2024-04-17T12:00",
        },
        {
          title: "Doctor 1",
          start: "2024-04-17T13:00",
          end: "2024-04-17T14:30",
        },
        {
          title: "Doctor 1",
          start: "2024-04-17T17:00",
          end: "2024-04-17T18:00",
        },

*/

/* For simplicity we are only fetching avaliable timeslots of doctor 1 which is stored on backend */
function fetchTimeSlots() {
  let endpoint = "/doctor1/timeslots";
  getFetch(endpoint, (data) => {
    timeslot_array = data;

    //update calendar
    calendar.fullCalendar({
      height: "111px",
      header: {
        left: "month, agendaWeek, agendaDay, list",
        center: "title",
        right: "today prev next",
      },

      // events property updates the timeslot of fetched doctor appointments to the calendar
      events: timeslot_array,

      eventClick: function (calEvent, jsEvent, view) {
        alert("Event: " + calEvent.title);
        jsEvent.preventDefault();
        return false;
      },
    });
  });
}
