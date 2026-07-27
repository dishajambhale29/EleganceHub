// Show / Hide Password
const togglePassword = document.querySelector(".toggle-password");
const passwordInput = document.getElementById("loginPassword");

// togglePassword.addEventListener("click", () => {
    
//     if (passwordInput.type === "password") {
//         passwordInput.type = "text";
//         togglePassword.classList.remove("fa-eye");
//         togglePassword.classList.add("fa-eye-slash");
//     } else {
//         passwordInput.type = "password";
//         togglePassword.classList.remove("fa-eye-slash");
//         togglePassword.classList.add("fa-eye");
//     }
// });

// Login Form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Login Successful!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
});