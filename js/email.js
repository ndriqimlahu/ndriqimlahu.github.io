// Get the all required Form elements from DOM
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email-address");
const subjectInput = document.querySelector("#subject-title");
const messageInput = document.querySelector("#message-content");
const submitBtn = document.querySelector(".submit-btn");

// Consuming the required data from EmailJS
const publicKey = "q_XHLx38kVyq8VYo-";
const serviceId = "service_9q2ehwu";
const templateId = "template_l350r57";

// Initialize the EmailJS with Public Key
emailjs.init(publicKey);

// Submitting the Contact Form
contactForm.addEventListener("submit", (event) => {
  // Prevent form default submission
  event.preventDefault();
  // Change the submit button text
  submitBtn.innerText = "Just a moment...";
  // Get the all input field values
  const inputFields = {
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value,
  };
  // Send the email using EmailJS
  emailjs.send(serviceId, templateId, inputFields).then(
    () => {
      // Change the submit button text
      submitBtn.innerText = "Message sent successfully!";
      // Clear out the all input fields
      nameInput.value = "";
      emailInput.value = "";
      subjectInput.value = "";
      messageInput.value = "";
    },
    (error) => {
      // Catch the error in Console log
      console.log(error);
      // Change the submit button text
      submitBtn.innerText = "Something went wrong";
    }
  );
});
