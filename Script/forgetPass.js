

window.addEventListener('load', () => {
    document.getElementById("sendcode_form").onsubmit = sendMail
    document.getElementById("newPass_form").onsubmit = newPass
})
async function sendMail(obj) {
    obj.preventDefault();

    let email = document.getElementById("email").value

    if (email.length == 0) {
        document.getElementById("warningNewPass").innerText = "EMAIL IS REQUIRED"
    }
    //http://localhost:7000/
    //https://alhendawy-restaurant.herokuapp.com/
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/forgetPassword", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ Email: email })
    });
    
    if (response.status === 200) {
        document.getElementById("sendcode-div").style.display = "none"
        console.log("sendMail Success");
        document.getElementById("newPass-div").style.display = "block"
    }else if (response.status === 404) {
        window.location.replace('./register.html')
    } else {
        alert("Some Things wrong")
    }
}

async function newPass(obj) {
    obj.preventDefault();

    let newPassData = getnewPassTextInputs();
    let validnewPassInputs = validatenewPassTextFields(newPassData)
    if (validnewPassInputs) {
        sendrequst(newPassData)
    }
}
function getnewPassTextInputs() {
    let Email = document.getElementById("email_newPass_form").value
    let ConfirmationCode = document.getElementById("confirmationCode").value
    let Password = document.getElementById("newPassword").value
    let verifyPassword = document.getElementById("verfiyNewPass").value

    if (Password === verifyPassword) {
        const newPassData = {
            Email,
            ConfirmationCode,
            Password
        }
        return newPassData
    }else {
        document.getElementById("warningNewPass").innerText = "Password Not matched"
    }
        
}
function validatenewPassTextFields(newPassdata) {

    let warning_newPass = document.getElementById("warningNewPass")
    let {Email,ConfirmationCode,Password} = newPassdata
    if (Email.length == 0) {
        warning_newPass.innerText = 'THE EMAIL IS REQUIRED'
    } else if (ConfirmationCode.length == 0) {
        warning_newPass.innerText = 'THE Confirmation Code IS REQUIRED'
    } else if (Password.length == 0) {
        warning_newPass.innerText = 'THE Password IS REQUIRED'
    } else {
        return true
    }
}
async function sendrequst(newPassData) {
    // https://alhendawy-restaurant.herokuapp.com/
    let response = await fetch(" https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/newPassword", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(newPassData)
    });
    document.getElementById("sendcode-div").style.display = "none"
    if (response.status === 200) {
        window.location.replace('./login.html')
    } else if (response.status === 404) {
        setTimeout(function () { window.location.replace('./register.html') }, 2000);
    }
}