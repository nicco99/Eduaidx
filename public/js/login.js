const form = document.querySelector("form");
const errorAlert = document.querySelector("#error_alert");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  const spinner = document.querySelector("#form-spinner");
  spinner.innerHTML = `<div class="spinner-border text-dark" role="status">
                         <span class="visually-hidden">Loading...</span>
                        </div>`;
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log(username, password);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      console.log(data.error);
      errorAlert.innerHTML = `<div id="error_alert" class="alert alert-warning text-primary text-center" role="alert">
         ${data.error}
        </div>`;
      spinner.innerHTML = "";
      setTimeout(()=>{
        errorAlert.innerHTML = ""
      },2000)
    }

    if (data.user) {
      errorAlert.innerHTML = `<div class="alert text-center alert-primary" role="alert">
         Login Successful
        </div>`;
      location.assign("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
});

function handleInputChange() {
  errorAlert.innerHTML = "";
}

form.addEventListener("input", handleInputChange);

document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader");
  var content = document.getElementById("content");

  // Ensure the content is displayed after a small delay to show the transition
  setTimeout(function () {
    preloader.classList.add("hidden");
    content.style.display = "block";
  }, 500); // Adjust the delay as needed
});
