import { setCoockie, getCookie } from "./GlobalFunc.js"

window.addEventListener("load", () => {
    document.getElementById("login-form").onsubmit = (obj) => {
        obj.preventDefault();
       
        let loginData = getLoginTextInputs();
        let validLoginInputs = validateLoginTextFields(loginData)
        if (validLoginInputs) {
            sendrequst(loginData)
        }
    }

})


function getLoginTextInputs() {
    let Email = document.getElementById('email').value;
    let Password = document.getElementById('password').value;
        const data = {
            Email,
            Password
        }

        return data
}

function validateLoginTextFields(data) {
    let warning_login =document.getElementById('warning_login')
    let {Email,Password} = data
    if (Email.length == 0) {
        warning_login.innerHTML = 'THE EMAIL IS REQUIRED'
    } else if (Password.length == 0) {
        warning_login.innerHTML  = 'THE PASSWORD IS REQUIRED'
    } else {
        return true
    }
}

async function sendrequst(loginData) {
    //http://localhost:7000/
    // https://alhendawy-restaurant.herokuapp.com/
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(loginData)
    });
    let result = await response.json();
    if (result.response == " Authentication ") {
        setCoockie(result.tokenID, "RTU")
        window.location.replace('./gallery.html')
    } else if (result.response == " Password Incorrect ") {
        showWarningMessage(" Incorrect Password ")
    } else if (result.response == " this account not active ") {
        showWarningMessage(" This Account Not Activated ")
        setTimeout(function () { window.location.replace('./VerifyAccount.html') }, 2000);
    } else if (result.response == " Email Not Exist ") {
        showWarningMessage(" You need to Signup ")
        setTimeout(function () { window.location.replace('./register.html') }, 2000);
    }
}

function showWarningMessage(message) {
    document.getElementById("warning_login").innerHTML = message
}
