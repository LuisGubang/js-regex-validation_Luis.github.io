document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');

    // Real-time validation event listeners
    document.getElementById('fullName').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('password').addEventListener('input', validatePassword);

    form.addEventListener('submit', handleSubmit);
});

function validateName() {
    const input = document.getElementById('fullName');
    const error = document.getElementById('nameError');
    const value = input.value.trim();
    const regex = /^[A-Za-z\s]+$/;

    if (regex.test(value) && value !== '') {
        error.textContent = '';
        input.classList.remove('invalid');
        return true;
    } else {
        error.textContent = 'Name must contain only letters and spaces.';
        input.classList.add('invalid');
        return false;
    }
}

function validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('emailError');
    const value = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(value)) {
        error.textContent = '';
        input.classList.remove('invalid');
        return true;
    } else {
        error.textContent = 'Please enter a valid email address.';
        input.classList.add('invalid');
        return false;
    }
}

function validatePhone() {
    const input = document.getElementById('phone');
    const error = document.getElementById('phoneError');
    const value = input.value.trim();
    const regex = /^\d{10,15}$/;

    if (regex.test(value)) {
        error.textContent = '';
        input.classList.remove('invalid');
        return true;
    } else {
        error.textContent = 'Phone number must be 10-15 digits.';
        input.classList.add('invalid');
        return false;
    }
}

function validatePassword() {
    const input = document.getElementById('password');
    const error = document.getElementById('passwordError');
    const value = input.value.trim();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (regex.test(value)) {
        error.textContent = '';
        input.classList.remove('invalid');
        return true;
    } else {
        error.textContent = 'Password must be at least 8 characters with one uppercase, one lowercase, and one number.';
        input.classList.add('invalid');
        return false;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();

    const successMessage = document.getElementById('successMessage');
    if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
        successMessage.textContent = 'Success! All fields are valid.';
        successMessage.style.color = 'green';
        // form.reset(); // Uncomment to reset form on success
    } else {
        successMessage.textContent = 'Please correct the errors in the form.';
        successMessage.style.color = 'red';
    }
}
document.getElementById("showPassword").addEventListener("change", function() {
    let passwordField = document.getElementById("password");
    if (this.checked) {
        passwordField.type = "text"; // Show password
    } else {
        passwordField.type = "password"; // Hide password
    }
});
