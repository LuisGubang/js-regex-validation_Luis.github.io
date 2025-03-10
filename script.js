document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const successMessage = document.getElementById("successMessage");

    function validateInput(input, regex, errorMsg, errorElement) {
        if (!regex.test(input.value.trim())) {
            errorElement.innerText = errorMsg;
            input.style.border = "2px solid red";
            return false;
        } else {
            errorElement.innerText = "";
            input.style.border = "2px solid green";
            return true;
        }
    }

    fullName.addEventListener("input", () => validateInput(fullName, /^[A-Za-z\s]+$/, "Only letters and spaces allowed", document.getElementById("nameError")));
    email.addEventListener("input", () => validateInput(email, /^\S+@\S+\.\S+$/, "Enter a valid email", document.getElementById("emailError")));
    phone.addEventListener("input", () => validateInput(phone, /^\d{10,15}$/, "Enter a valid phone number (10-15 digits)", document.getElementById("phoneError")));
    password.addEventListener("input", () => validateInput(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "At least 8 characters, one uppercase, one lowercase, and one number", document.getElementById("passwordError")));

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        let isNameValid = validateInput(fullName, /^[A-Za-z\s]+$/, "Only letters and spaces allowed", document.getElementById("nameError"));
        let isEmailValid = validateInput(email, /^\S+@\S+\.\S+$/, "Enter a valid email", document.getElementById("emailError"));
        let isPhoneValid = validateInput(phone, /^\d{10,15}$/, "Enter a valid phone number (10-15 digits)", document.getElementById("phoneError"));
        let isPasswordValid = validateInput(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "At least 8 characters, one uppercase, one lowercase, and one number", document.getElementById("passwordError"));

        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
            successMessage.innerText = "Form submitted successfully!";
            successMessage.style.color = "green";
        } else {
            successMessage.innerText = "";
        }
    });
});
