// Contact form logic
document.addEventListener("DOMContentLoaded", () => {
  // Get the all required form elements from DOM
  const contactForm = document.querySelector("#contact-form");
  const submitBtn = document.querySelector(".submit-btn");
  const fields = [
    {
      input: document.getElementById("full-name"),
      error: document.getElementById("full-name-error"),
      codeError: document.getElementById("full-name-code-error"),
      validator: validateFullName,
      touched: false
    },
    {
      input: document.getElementById("email"),
      error: document.getElementById("email-error"),
      codeError: document.getElementById("email-code-error"),
      validator: validateEmailField,
      touched: false
    },
    {
      input: document.getElementById("subject"),
      error: document.getElementById("subject-error"),
      codeError: document.getElementById("subject-code-error"),
      validator: validateSubject,
      touched: false
    },
    {
      input: document.getElementById("message"),
      error: document.getElementById("message-error"),
      codeError: document.getElementById("message-code-error"),
      validator: validateMessage,
      touched: false
    },
  ];

  // Attach input and blur listeners to handle validation for each field
  fields.forEach((field) => {
    const { input, error, codeError, validator } = field;

    // Listen for user input to validate and style the field in real time
    input.addEventListener("input", () => {
      // Mark the field as interacted with to enable validation feedback
      field.touched = true;

      // Get the current input and its trimmed version for validation checks
      const currentValue = input.value;
      const trimmedValue = currentValue.trim();

      // If input is completely empty, apply invalid style or clear state if untouched
      if (currentValue === "") {
        (field.touched ? styleField(input, error, false) : clearFieldState(input, error, codeError));
        return;
      }

      // If input only contains whitespace, mark it invalid and skip further validation
      if (trimmedValue === "") {
        toggleError(codeError, false);
        styleField(input, error, false);
        return;
      }

      // If input passes script safety check, apply custom validator
      const inputSafe = validateNoScript(input, codeError);
      if (inputSafe) {
        validator(input, error);
      }
    });

    // Handle field validation on losing focus
    input.addEventListener("blur", () => {
      // Reset state and clear validation if field is empty and untouched
      if (input.value === "") {
        field.touched = false;
        clearFieldState(input, error, codeError);
        return;
      }
      // Mark as invalid if the field has been touched and is still empty after trimming
      if (field.touched && input.value.trim() === "") {
        toggleError(codeError, false);
        styleField(input, error, false);
      }
    });

    // Disallow whitespace from being typed into the email input field
    document.getElementById("email").addEventListener("keydown", (event) => {
      // Prevent entering a space character to avoid invalid email formats
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        // Show a modal using SweetAlert if the space key is pressed
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Invalid character entered!",
          text: "Spaces are not allowed in the email address field.",
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  });

    // Styles the input field and displays error message based on validation result
  function styleField(input, error, isValid) {
    // Set the border color to green if valid, otherwise set to red if invalid
    input.style.borderColor = isValid ? "#18D26E" : "#ED3C0D";

    // Show or hide the error message based on validity
    toggleError(error, !isValid);
  }

  // Clears all error states and resets input field style
  function clearFieldState(input, error, codeError) {
    // Hide the standard validation error
    toggleError(error, false);

    // Hide the code/script validation error
    toggleError(codeError, false);

    // Reset the input border color to default
    input.style.borderColor = "";
  }

  // Show or hide an error message element with accessibility updates
  function toggleError(errorElement, shouldShow) {
    // Do nothing if the element is not present
    if (!errorElement) {
      return;
    }

    // Toggle visibility and accessibility state of the error message
    errorElement.style.display = shouldShow ? "block" : "none";
    errorElement.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  }

  // Validates input to prevent basic script/code injection
  function validateNoScript(input, codeError) {
    // Regular expressions to detect potential script tags, HTML tags, or common JS injection patterns
    const forbiddenPatterns = [
      /<script[\s\S]*?<\/script>/i,
      /<.*?>/g,
      /\b(document\.|window\.|eval\(|alert\(|prompt\(|console\(|function\()/gi
    ];

    // Checks if any of the forbidden patterns match the input value
    const injectionAttempt = forbiddenPatterns.some((pattern) => pattern.test(input.value));

    // Shows or hides the code error message based on detection result
    toggleError(codeError, injectionAttempt);

    // Applies error styling if an injection attempt is detected
    if (injectionAttempt) {
      input.style.borderColor = "#ED3C0D";
    }

    return !injectionAttempt;
  }

  // Checks if a string starts or ends with whitespace
  function hasEdgeWhitespace(str) {
    // Returns true if there is leading or trailing whitespace at the beginning or end of the string
    return /^\s+|\s+$/.test(str);
  }

  // Validates a full name field: checks length, characters, spacing, and edge whitespace
  function validateFullName(input, error) {
    // Get the original and trimmed value from the input field
    const currentValue = input.value;
    const trimmedValue = currentValue.trim();

    // Check if the trimmed value is between 8 and 32 characters
    const lengthValid = trimmedValue.length >= 8 && trimmedValue.length <= 32;

    // Check if the value contains only letters (including accented) and spaces
    const characterPatternValid = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(trimmedValue);

    // Final validation: no edge whitespace, valid length, valid characters, and contains at least one space
    const fullNameValid = !hasEdgeWhitespace(currentValue) && lengthValid && characterPatternValid && trimmedValue.includes(" ");

    // Update the input field style and show/hide error based on validation result
    styleField(input, error, fullNameValid);

    return fullNameValid;
  }

  // Validates an email address field: checks for edge whitespace, internal spaces, length, and pattern
  function validateEmailField(input, error) {
    // Get the original and trimmed value from the input field
    const currentValue = input.value;
    const trimmedValue = currentValue.trim();

    // Check if the trimmed value is between 6 and 64 characters
    const lengthValid = trimmedValue.length >= 6 && trimmedValue.length <= 64;

    // Basic email pattern: one '@', domain with a '.', and no surrounding whitespace
    const domainPatternValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmedValue);

    // Final validation: no edge whitespace, valid length, and valid domain format
    const emailValid = !hasEdgeWhitespace(currentValue) && lengthValid && domainPatternValid;

    // Update input field style and show/hide error based on validation result
    styleField(input, error, emailValid);

    return emailValid;
  }

  // Validates the subject field: checks edge whitespace, length, and character pattern
  function validateSubject(input, error) {
    // Get the original and trimmed value from the input field
    const currentValue = input.value;
    const trimmedValue = currentValue.trim();

    // Check if the trimmed value is between 14 and 128 characters
    const lengthValid = trimmedValue.length >= 14 && trimmedValue.length <= 128;

    // Check if the value contains only letters (including accented) and spaces
    const characterPatternValid = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/.test(trimmedValue);

    // Final validation: no edge whitespace, valid length, and valid character pattern
    const subjectValid = !hasEdgeWhitespace(currentValue) && lengthValid && characterPatternValid;

    // Update input field style and show/hide error based on validation result
    styleField(input, error, subjectValid);

    return subjectValid;
  }

  // Validates the message field: checks edge whitespace and length
  function validateMessage(input, error) {
    // Get the original and trimmed value from the input field
    const currentValue = input.value;
    const trimmedValue = currentValue.trim();

    // Check if the trimmed value is between 64 and 720 characters
    const lengthValid = trimmedValue.length >= 64 && trimmedValue.length <= 720;

    // Final validation: no edge whitespace, valid length, and valid character pattern
    const messageValid = !hasEdgeWhitespace(currentValue) && lengthValid;

    // Update input field style and show/hide error based on validation result
    styleField(input, error, messageValid);

    return messageValid;
  }

  // Triggers shake animation on the submit button with a text message
  function shakeButton(text) {
    // Update the submit button text and start animation
    submitBtn.innerText = text;
    submitBtn.style.animation = "shake-element 0.4s infinite";

    // After a short delay, reset button text and stop animation
    setTimeout(() => {
      submitBtn.innerText = "Submit";
      submitBtn.style.animation = "";
    }, 2000);
  }

  // Consuming the required data from EmailJS
  const publicKey = "q_XHLx38kVyq8VYo-";
  const serviceId = "service_9q2ehwu";
  const templateId = "template_l350r57";

  // Initialize the EmailJS with Public Key
  emailjs.init(publicKey);

  // Handle form submission logic with full validation before sending
  contactForm.addEventListener("submit", async(event) => {
    // Prevent default form submission
    event.preventDefault();

    // Flag to track if all fields pass validation
    let allFieldsValid = true;

    // Validate each form field individually
    for (const field of fields) {
      // Get the current input and its trimmed value
      const currentValue = field.input.value;
      const trimmedValue = currentValue.trim();

      // Check if the input is empty or contains leading/trailing whitespace
      if (trimmedValue === "" || hasEdgeWhitespace(currentValue)) {
        styleField(field.input, field.error, false);
        toggleError(field.error, true);
        allFieldsValid = false;
        continue;
      }

      // Perform built-in browser validation, custom field validation, and JavaScript injection check
      const builtInValid = field.input.validity.valid;
      const customValid = builtInValid && field.validator(field.input, field.error);
      const scriptSafe = validateNoScript(field.input, field.codeError);

      // If any validation fails, mark the field as invalid
      if (!builtInValid || !customValid || !scriptSafe) {
        allFieldsValid = false;
      }
    }

    // Stop form submission if any field is invalid and provide feedback
    if (!allFieldsValid) {
      shakeButton("Unable to send!");
      return;
    }

    // Try sending the email using EmailJS service
    try {
      // Provide visual feedback during the sending process
      submitBtn.innerText = "Sending…";
      submitBtn.style.animation = "shake-element 0.4s forwards";
      // Send the form data to the email service
      await emailjs.send(serviceId, templateId, {
        name: document.getElementById("full-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
      });
      // Show a modal using SweetAlert if the email was sent successfully
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Form sent successfully!",
        text: "You will receive an answer soon.",
        showConfirmButton: false,
        timer: 3000
      });
      // Update submit button text to indicate success
      submitBtn.innerText = "Sent successfully";
    } catch (error) {
      console.error("Error while sending the email: ", error);
      // Show a modal using SweetAlert if email sending failed
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Form submission failed!",
        text: "Please try again later.",
        showConfirmButton: false,
        timer: 6000
      });
      // Update submit button text to indicate failure
      submitBtn.innerText = "Sending failed!";
      // Highlight the border color of all input fields as invalid
      fields.forEach(({ input }) => (input.style.borderColor = "#ED3C0D"));
    } finally {
      // Reload the page after a short delay to reset the form
      setTimeout(() => window.location.reload(), 4000);
    }
  });
});
