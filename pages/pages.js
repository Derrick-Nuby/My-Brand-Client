let errorElement = document.getElementById("errorElement");


// document.getElementById("userCreationForm").addEventListener("submit", userCreation);


function userCreation(event) {
    event.preventDefault(); 
    var names = document.getElementById("names").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordval = document.getElementById("passwordval").value;
    
    if(names.trim() === '' || email.trim() === '' || password.trim() === '' || passwordval.trim() === '') {
        showError("Your forgot to fill some fields | All fields are required!");
        return;
    }

    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
        showError("Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.");
            return;
    }

    if(password !== passwordval) {
        showError("Ooops :( Passwords do not match!");
        return;
    }
    
    var users = JSON.parse(localStorage.getItem('users')) || {};
    for (var userId in users) {
        if (users.hasOwnProperty(userId)) {
            var user = users[userId];
            if (user.email === email) {
                showError("A user with that email already exists. | if that is you Please login or reset your password");
                return;
            }
        }
    }

    var userId = Math.floor(10000 + Math.random() * 90000);

    var user = {
        id: userId,
        names: names,
        email: email,
        password: password,
        role: 0
    };

    var users = JSON.parse(localStorage.getItem('users')) || {};
    

    users[userId] = user;

    localStorage.setItem('users', JSON.stringify(users));
    
    // alert("User created successfully with ID: " + userId);
    var errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = "User created successfully with ID: " + userId;    
    errorElement.style.display = "block";
    setTimeout(function() {
        errorElement.style.display = "none";
    }, 5000);

};

function showError(message, duration = 4000) {
    var errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = message;
    errorElement.style.display = "block";
    setTimeout(function() {
        errorElement.style.display = "none";
    }, duration);
}


// login functionalities

// document.getElementById("userLoginForm").addEventListener("submit", userLogin);


// function userLogin() {
//     event.preventDefault();
//     alert("logged in successfully");
// }

function userLogin() {
    event.preventDefault();

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    if(loginEmail.trim() === '' || loginPassword === '') {
        showError("Your forgot to fill some fields | All fields are required!");
        return;
    }

    var users = JSON.parse(localStorage.getItem('users')) || {};

    var user = Object.values(users).find(user => user.email === loginEmail && user.password === loginPassword);

    if (user) {
        alert("Logged in successfully!");

        document.cookie = `loggedInUser=${user.id}; expires=${new Date(Date.now() + 3600 * 1000)}; path=/`;

        window.location.href = "../index.html";
    } 

    else {
        var emailExists = Object.values(users).some(user => user.email === loginEmail);
        
        if (!emailExists) {
            showError("That user does not exist in our database");
            return;
        }
        
        showError("Invalid email or password.");
    }
}

function logout() {
    document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "../index.html";
}


function getLoggedUserInfo() {

    var loggedInUserId = getCookie("loggedInUser");
    var loggedInUser = users[loggedInUserId];
    console.log(loggedInUser);

}