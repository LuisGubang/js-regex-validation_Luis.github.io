document.addEventListener("DOMContentLoaded", () => {
    // Dynamic Greeting
    const greeting = document.getElementById("greeting");
    const hours = new Date().getHours();
    let message = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
    greeting.textContent = message;
    
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
        if (!name || !email.includes("@") || !message) {
            alert("Please fill in all fields with a valid email.");
            return;
        }
        alert("Message sent successfully!");
        contactForm.reset();
    });
});
