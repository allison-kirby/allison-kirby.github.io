// Sends the contact form to Formspree without leaving the page,
// then shows a thank-you message. Without JavaScript the form still
// works: Formspree shows its own confirmation page instead.
document.querySelectorAll(".contact-form").forEach(function (form) {
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
      status.textContent = "The contact form isn't connected yet. Please reach out on LinkedIn for now.";
      return;
    }

    button.disabled = true;
    status.textContent = "Sending…";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        status.textContent = "Thanks for reaching out! I'll get back to you soon.";
      })
      .catch(function () {
        status.textContent = "Sorry, something went wrong. Please try again, or message me on LinkedIn.";
      })
      .finally(function () {
        button.disabled = false;
      });
  });
});
