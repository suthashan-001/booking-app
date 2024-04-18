// Add event listeners to the register form (patient and doctor)

const patientForm = document.querySelector(".patient-form");
const doctorForm = document.querySelector("doctor-form");
const baseUrl = "http://localhost:8080/bookingApp/";

/* instead of using button onClick to send data to backend, I am using the form's built-in event "submit" to send the data to backend */

// handle submiting patient data to backend
patientForm.addEventListener("submit", (e) => {
  // prevents default form submission
  e.preventDefault();
  // FormData object collects all form field inputs
  postData(`${baseUrl}/endpoint`, new FormData(patientForm));
});

//handle submitting doctor data to backend
doctorForm.addEventListener("submit", (e) => {
  // prevents default form submission
  e.preventDefault();
  postData(`${baseUrl}/endpoint`, new FormData(patientForm));
});

// fetch POST to backend
function postData(url, formData) {
  // fetch Api to post data
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Registration successful!");
      // add ui to show user that registration is successful
    })
    .catch((err) => {
      alert("Error during registration");
      console.log("registration error: ", err);
    });
}
