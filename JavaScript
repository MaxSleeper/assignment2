// Display today's date
function showDate() {
    const today = new Date();
    document.getElementById("today").innerHTML = today.toDateString();
}

// Update slider value
const budgetSlider = document.getElementById("budget");
const budgetDisplay = document.getElementById("budgetDisplay");
budgetDisplay.innerText = budgetSlider.value;
budgetSlider.oninput = function() {
    budgetDisplay.innerText = this.value;
};

// Form validation
function validateForm() {
    let valid = true;

    // Name validation
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    if(firstName === "" || lastName === "") {
        document.getElementById("nameError").innerText = "Please enter your full name";
        valid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    // DOB validation
    const dob = document.getElementById("dob").value;
    if(dob === "" || new Date(dob) > new Date()) {
        document.getElementById("dobError").innerText = "Enter a valid birth date";
        valid = false;
    } else {
        document.getElementById("dobError").innerText = "";
    }

    // Email validation
    const email = document.getElementById("email").value;
    if(!email.includes("@") || !email.includes(".")) {
        document.getElementById("emailError").innerText = "Invalid email format";
        valid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    // Phone validation
    const phone = document.getElementById("phone").value;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if(phone && !phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Enter phone as 123-456-7890";
        valid = false;
    } else {
        document.getElementById("phoneError").innerText = "";
    }

    return valid; // If false, form will not submit
}
