

window.addEventListener('load',()=>{
    document.getElementById("sendcode_form").onsubmit =sendMail
    document.getElementById("newPass_form").onsubmit =newPass
})
async function sendMail(obj) {
    obj.preventDefault();
    let email = document.getElementById("email").value
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/forgetPassword", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({Email:email})
        });
        document.getElementById("sendcode-div").style.display ="none"
        if (response.status === 200) {
            console.log("sendMail Success");
            document.getElementById("newPass-div").style.display ="block"
        } else {
            alert("Some Things wrong")
        }
}
async function newPass(obj) {
    obj.preventDefault();
    
    let email = document.getElementById("email_newPass_form").value
    let code =document.getElementById("confirmationCode").value
    let password =document.getElementById("newPassword").value
    let verifyPassword =document.getElementById("verfiyNewPass").value

    if(password === verifyPassword){
        const newPassData= {
            Email:email,
            ConfirmationCode:code,
            Password:password
        }
        console.log(newPassData);
        let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/newPassword", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(newPassData)
        });
        document.getElementById("sendcode-div").style.display ="none"
        if (response.status === 200) {
            window.location.replace('./login.html')
        } else if (response.status === 404) {
            setTimeout(function () { window.location.replace('./register.html') }, 2000);
        } 
    }else{
        document.getElementById("warningNewPass").innerText = "Password Not matched"
    }
}