document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');

    // Real-time validation event listeners
    document.getElementById('fullName').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('password').addEventListener('input', validatePassword);

    form.addEventListener('submit', handleSubmit);
});

// Validation functions remain the same as previous version
// (Keep the same JavaScript code from previous answer)
