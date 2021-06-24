window.addEventListener('load', () => {
    document.getElementById('verfiy_form').onsubmit = async (obj) => {
        obj.preventDefault();

        let email = document.getElementById('confirmationEmail').value;
        let code = document.getElementById('confirmationCode').value;

        confirmationData = {
            Email: email,
            ConfirmationCode: code
        }
        let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/activateAccount", {
            // credentials: "include"   , 
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: formData.values()
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
})
function showWarningMessage(message) {

    document.getElementById("warningCofirmationMessage").innerHTML = message
}