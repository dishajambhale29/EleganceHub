

const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {
    icon.addEventListener("click", function () {

        const input = this.previousElementSibling;

        if (input.type === "password") {
            input.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }

    });
});


const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Save data in Local Storage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration Successful!");

    // Redirect to Login Page
    window.location.href = "login.html";

});