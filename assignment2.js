/*
    Author: Maxwell Sleeper
    File: homework2.js
    Date Created: 2/20/26
    Date Last Edited: 3/20/26
    Version: 2.0
    Description: Validation and review display logic for the patient intake form.
*/

/* Clears the review area when the form reset button is clicked */
function removeReview() {
    document.getElementById("outputformdata").innerHTML = "";
}

/* Runs every time the user types in the User ID field.
   Converts to lowercase and checks for formatting errors. */
function checkUserID(field) {
    field.value = field.value.toLowerCase();
    field.setCustomValidity('');

    var val = field.value;
    var msg = "";

    if (val.length > 0 && val.length < 5) {
        msg = "User ID must be at least 5 characters.";
    } else if (val.length > 0 && /^[0-9]/.test(val)) {
        msg = "User ID must start with a letter.";
    } else if (/[^a-z0-9_\-]/.test(val)) {
        msg = "Letters, numbers, underscores, and hyphens only. No spaces.";
    }

    document.getElementById("userid_text").innerHTML = msg;
}

/* Runs every time the user types in either password field.
   Checks strength rules and that both fields match. */
function checkPasswords() {
    var pw1 = document.getElementById("pw1").value;
    var pw2 = document.getElementById("pw2").value;
    var uid = document.getElementById("userid").value.toLowerCase();
    var fname = document.getElementById("fname").value.toLowerCase();
    var lname = document.getElementById("lname").value.toLowerCase();
    var msg1 = "";
    var msg2 = "";

    if (pw1.length > 0) {
        if (pw1.length < 8) {
            msg1 = "Password must be at least 8 characters.";
        } else if (pw1.length > 30) {
            msg1 = "Password cannot be more than 30 characters.";
        } else if (!/[A-Z]/.test(pw1)) {
            msg1 = "Password needs at least one uppercase letter.";
        } else if (!/[a-z]/.test(pw1)) {
            msg1 = "Password needs at least one lowercase letter.";
        } else if (!/[0-9]/.test(pw1)) {
            msg1 = "Password needs at least one number.";
        } else if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(pw1)) {
            msg1 = "Password needs at least one special character (!@#%^&*...).";
        } else if (pw1.indexOf('"') >= 0) {
            msg1 = "Password cannot contain quotation marks.";
        } else if (uid.length >= 3 && pw1.toLowerCase().indexOf(uid) >= 0) {
            msg1 = "Password cannot contain your User ID.";
        } else if (fname.length >= 3 && pw1.toLowerCase().indexOf(fname) >= 0) {
            msg1 = "Password cannot contain your first name.";
        } else if (lname.length >= 3 && pw1.toLowerCase().indexOf(lname) >= 0) {
            msg1 = "Password cannot contain your last name.";
        }
    }

    if (pw2.length > 0 && pw1 !== pw2) {
        msg2 = "Passwords do not match.";
    } else if (pw2.length > 0 && pw1 === pw2) {
        msg2 = "";
    }

    document.getElementById("pw1_text").innerHTML = msg1;
    document.getElementById("pw2_text").innerHTML = msg2;
}


/* Called when the Review button is clicked.
   Loops through the form and builds a review table below. */
function showReview() {
    var formcontents = document.getElementById("regForm");
    var output = "";
    var i;
    var datatype;

    /* re-run password check before showing review */
    checkPasswords();

    /* make sure passwords are valid before showing review */
    if (document.getElementById("pw1_text").innerHTML != "") {
        document.getElementById("outputformdata").innerHTML = "<p class='errmsg'>Please fix the password error before reviewing.</p>";
        document.getElementById("outputformdata").scrollIntoView();
        return;
    }

    if (document.getElementById("pw1").value !== document.getElementById("pw2").value) {
        document.getElementById("outputformdata").innerHTML = "<p class='errmsg'>Passwords do not match. Please fix before reviewing.</p>";
        document.getElementById("outputformdata").scrollIntoView();
        return;
    }

    /* truncate zip to 5 digits and redisplay */
    var zipField = document.getElementById("zip");
    if (zipField.value.length > 5 && zipField.value.indexOf("-") < 0) {
        zipField.value = zipField.value.substring(0, 5);
    }

    /* build the review table */
    output = "<h2>-- Please Review Your Information --</h2>";
    output = output + "<table class='reviewTable'>";
    output = output + "<tr><th>Field</th><th>Value</th><th>Status</th></tr>";

    for (i = 0; i < formcontents.length; i++) {
        datatype = formcontents.elements[i].type;

        switch (datatype) {

            case "checkbox":
                output = output + "<tr>";
                output = output + "<td>" + formcontents.elements[i].name + "</td>";
                if (formcontents.elements[i].checked) {
                    output = output + "<td>Yes</td><td class='ok'>&#10003;</td>";
                } else {
                    output = output + "<td>No</td><td></td>";
                }
                output = output + "</tr>";
                break;

            case "radio":
                if (formcontents.elements[i].checked) {
                    output = output + "<tr>";
                    output = output + "<td>" + formcontents.elements[i].name + "</td>";
                    output = output + "<td>" + formcontents.elements[i].value + "</td>";
                    output = output + "<td class='ok'>&#10003;</td>";
                    output = output + "</tr>";
                }
                break;

            case "password":
                /* show SSN masked, skip actual passwords */
                if (formcontents.elements[i].name === "ssn") {
                    output = output + "<tr>";
                    output = output + "<td>Social Security #</td>";
                    output = output + "<td>***-**-****</td>";
                    output = output + "<td class='ok'>&#10003;</td>";
                    output = output + "</tr>";
                }
                break;

            case "button": case "submit": case "reset":
                /* skip buttons */
                break;

            case "textarea":
                output = output + "<tr>";
                output = output + "<td>" + formcontents.elements[i].name + "</td>";
                output = output + "<td>" + formcontents.elements[i].value + "</td>";
                output = output + "<td></td>";
                output = output + "</tr>";
                break;

            default:
                if (formcontents.elements[i].value != "") {
                    output = output + "<tr>";
                    output = output + "<td>" + formcontents.elements[i].name + "</td>";
                    output = output + "<td>" + formcontents.elements[i].value + "</td>";
                    output = output + "<td class='ok'>&#10003;</td>";
                    output = output + "</tr>";
                }
        }
    }

    output = output + "</table>";
    output = output + "<br>";
    output = output + "<center><input type='button' value='Go Back and Edit' onclick=\"document.getElementById('outputformdata').innerHTML=''\"></center>";

    document.getElementById("outputformdata").innerHTML = output;
    document.getElementById("outputformdata").scrollIntoView();
}


/* Called when the Submit button is clicked.
   Re-checks passwords before allowing the form to submit. */
function validateForm() {
    /* re-run checks one more time on submit */
    checkPasswords();

    if (document.getElementById("pw1").value !== document.getElementById("pw2").value) {
        alert("Passwords do not match!");
        return false;
    }

    if (document.getElementById("pw1_text").innerHTML != "") {
        alert("Please fix the password error before submitting.");
        return false;
    }

    if (document.getElementById("userid_text").innerHTML != "") {
        alert("Please fix the User ID error before submitting.");
        return false;
    }

    return true;
}
