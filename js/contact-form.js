document.addEventListener("DOMContentLoaded", function () {
  // Get the all required Form elements from DOM
  const contactForm = document.querySelector("#contact-form");
  const inputFields = [
    {
      input: document.getElementById("full-name"),
      error: document.getElementById("full-name-error"),
      codeError: document.getElementById("full-name-code-error"),
      updateFunction: updateFullNameInputBorder,
    },
    {
      input: document.getElementById("email"),
      error: document.getElementById("email-error"),
      codeError: document.getElementById("email-code-error"),
      updateFunction: updateEmailInputBorder,
    },
    {
      input: document.getElementById("subject"),
      error: document.getElementById("subject-error"),
      codeError: document.getElementById("subject-code-error"),
      updateFunction: updateSubjectInputBorder,
    },
    {
      input: document.getElementById("message"),
      error: document.getElementById("message-error"),
      codeError: document.getElementById("message-code-error"),
      updateFunction: updateMessageTextareaBorder,
    },
  ];
  const submitBtn = document.querySelector(".submit-btn");

  // Validation of each Input Fields
  inputFields.forEach((field) => {
    field.input.addEventListener("input", function () {
      const trimmedValue = field.input.value.trim();
      if (trimmedValue === "") {
        field.error.style.display = "none";
        field.codeError.style.display = "none";
        field.input.style.borderColor = "#DEE2E6";
      } else {
        if (field.input.validity.valid) {
          field.input.style.borderColor = "#18d26e";
        } else {
          field.input.style.borderColor = "#ed3c0d";
        }

        validateInput(field.input, field.error);
        if (field.codeError) {
          field.codeError.style.display = "none";
          validateForCode(field.input, field.codeError);
        }

        if (field.updateFunction) {
          field.updateFunction(field.input, field.error);
        }
      }
    });
  });

  function validateInput(input, error) {
    if (input.validity.valid) {
      error.style.display = "none";
      input.style.borderColor = "#18d26e";
    } else {
      error.style.display = "block";
      input.style.borderColor = "#ed3c0d";
    }
  }

  function validateForCode(input, codeError) {
    const forbiddenPatterns = [
      /<script[\s\S]*?<\/script>/i, // Matches <script>...</script> tags
      /<.*?>/g, // Matches any HTML tags
      /\b(document\.|window\.|eval\(|alert\(|prompt\(|console\()/gi, // Matches common JavaScript functions
    ];

    const value = input.value;
    if (forbiddenPatterns.some((pattern) => pattern.test(value))) {
      codeError.style.display = "block";
      return false;
    } else {
      codeError.style.display = "none";
      return true;
    }
  }

  function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();

    const validDomains = ["hotmail", "outlook", "live", "gmail", "yahoo"]; // Add valid top-level domains to the Regex pattern
    const tldPattern = "com|net|org"; // Add more TLDs as needed
    const domainRegex = new RegExp(
      `@(?:${validDomains.join("|")})\\.(?:${tldPattern})$`,
      "i"
    );

    return domainRegex.test(emailValue);
  }

  function updateFullNameInputBorder(input, error) {
    const value = input.value.trim();
    if (
      value.length >= 8 &&
      value.length <= 32 &&
      /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value) &&
      value.includes(" ")
    ) {
      input.style.borderColor = "#18d26e";
      if (error) {
        error.style.display = "none";
      }
    } else {
      input.style.borderColor = "#ed3c0d";
      if (error) {
        error.style.display = "block";
      }
    }
  }

  function updateEmailInputBorder(input, error) {
    const value = input.value.trim();
    const validDomains = ["hotmail", "outlook", "live", "gmail", "yahoo"];
    const tldPattern = "com|net|org"; // Add more TLDs as needed
    const domainRegex = new RegExp(
      `@(?:${validDomains.join("|")})\\.(?:${tldPattern})$`,
      "i"
    );

    if (value.length >= 14 && value.length <= 64 && domainRegex.test(value)) {
      input.style.borderColor = "#18d26e";
      if (error) {
        error.style.display = "none";
      }
    } else {
      input.style.borderColor = "#ed3c0d";
      if (error) {
        error.style.display = "block";
      }
    }
  }

  function updateSubjectInputBorder(input, error) {
    const value = input.value.trim();
    if (
      value.length >= 14 &&
      value.length <= 128 &&
      /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(value)
    ) {
      input.style.borderColor = "#18d26e";
      if (error) {
        error.style.display = "none";
      }
    } else {
      input.style.borderColor = "#ed3c0d";
      if (error) {
        error.style.display = "block";
      }
    }
  }

  function updateMessageTextareaBorder(textarea, error) {
    const value = textarea.value.trim();
    const charCount = value.length; // Calculate the character count

    if (charCount >= 64 && charCount <= 720) {
      textarea.style.borderColor = "#18d26e";
      if (error) {
        error.style.display = "none";
      }
    } else {
      textarea.style.borderColor = "#ed3c0d";
      if (error) {
        error.style.display = "block";
      }
    }
  }

  // Consuming the required data from EmailJS
  const publicKey = "q_XHLx38kVyq8VYo-";
  const serviceId = "service_9q2ehwu";
  const templateId = "template_l350r57";

  // Initialize the EmailJS with Public Key
  emailjs.init(publicKey);

  // Adding the Event Listener before Submitting the Contact form
  contactForm.addEventListener("submit", function (event) {
    // Process form submission
    event.preventDefault();

    const nameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const charCount = messageInput.value.length;

    // Validate all fields
    let allFieldsValid = true;
    for (const field of inputFields) {
      if (!field.input.validity.valid) {
        allFieldsValid = false;
        validateInput(field.input, field.error);
      }
    }

    // Validate the email field
    if (!validateEmail()) {
      allFieldsValid = false;
      const emailError = document.getElementById("email-error");
      emailError.style.display = "block";
    }

    // Validate the code error for all fields
    let allCodeFieldsValid = true;
    for (const field of inputFields) {
      if (!validateForCode(field.input, field.codeError)) {
        allCodeFieldsValid = false;
      }
    }

    if (
      allFieldsValid &&
      charCount >= 64 &&
      charCount <= 720 &&
      allCodeFieldsValid
    ) {
      // Change the Submit button text
      submitBtn.innerText = "Just a moment...";

      // Get the all input field values
      const inputValues = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value,
      };

      // Send the email using EmailJS
      emailjs.send(serviceId, templateId, inputValues).then(
        () => {
          // Display an modal popup, if the form has submitted successfully
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Form has been submitted successfully!",
            text: "You will receive an answer soon.",
            showConfirmButton: false,
            timer: 3000,
          });
          // Reload the Contact form after submitting
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        },
        (error) => {
          // Display an modal popup, if the form cannot be submitted due to errors
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error occurred and the form submission failed!",
            text: "Please try again later until the problem is resolved.",
            showConfirmButton: false,
            timer: 6000,
          });
          // Catch the error in Console log
          console.log(error);
          // Change the Submit button text
          submitBtn.innerText = "Failed to Send";
          // Reset the border color to invalid color for all input fields
          for (const field of inputFields) {
            field.input.style.borderColor = "#ed3c0d";
          }
          // Reload the Contact form after submitting
          setTimeout(function () {
            window.location.reload();
          }, 8000);
        }
      );
    }
  });
});
