window.addEventListener('load', () => {
    document.getElementById('verfiy_form').onsubmit = async (obj) => {
        obj.preventDefault();


        let verifyAccountData = getverifyAccountTextInputs();
        let validverifyAccountInputs = validateverifyAccountTextFields(verifyAccountData)
        if (validverifyAccountInputs) {
            sendrequst(verifyAccountData)
        }

        
    }
})

function getverifyAccountTextInputs() {
    let Email = document.getElementById('confirmationEmail').value;
    let ConfirmationCode = document.getElementById('confirmationCode').value;

    const data = {
        Email,
        ConfirmationCode
    }

        return data
}

function validateverifyAccountTextFields(data) {
    let {Email,ConfirmationCode} = data
    if (Email.length == 0) {
        showWarningMessage('THE EMAIL IS REQUIRED')
    } else if (ConfirmationCode.length == 0) {
        showWarningMessage('THE ConfirmationCode IS REQUIRED')
    } else {
        return true
    }
}

async function sendrequst(confirmationData) {
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/activateAccount", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(confirmationData)
    });
    let result = await response.json();
    if (result.response == " go to home ") {
        window.location.replace('./login.html')
    } else if (result.response == " False Confirmation Code ") {
        showWarningMessage(" Not Correct Confirmation Code  ! ")
    } else if (result.response == " this account is active already ") {
        showWarningMessage(" Account Already Active .. You can Login ")
    } else if (result.response == " Email Not Exist ") {
        showWarningMessage(" Email Not Exist ..You Can Signup")
    }
}

function showWarningMessage(message) {

    document.getElementById("warningCofirmationMessage").innerHTML = message
}