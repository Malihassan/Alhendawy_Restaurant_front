import {setCoockie,getCookie} from "./GlobalFunc.js"

window.addEventListener("load", () => {
    document.getElementById("login-form").onsubmit = async (obj) => {
        obj.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let loginData = {
            Email: email,
            Password: password
        }
        let response = await fetch("http://localhost:7000/ElhendawyRestaurant/login", {
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
            setCoockie(result.tokenID,"RTU")
            window.location.replace('./gallery.html')
        } else if (result.response == " Password Incorrect ") {
            showWarningMessage(" Password Incorrect ")
        } else if (result.response == " this account not active ") {
            showWarningMessage(" This Account Not Activated ")
            setTimeout(function () { window.location.replace('./VerifyAccount.html') }, 2000);
        } else if (result.response == " Email Not Exist ") {
            showWarningMessage(" You need to Signup ")
            setTimeout(function () { window.location.replace('./register.html') }, 2000);
        }

    }

})

function showWarningMessage(message) {

    document.getElementById("warning_login").innerHTML = message
}
