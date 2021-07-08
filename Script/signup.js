
window.addEventListener('load', () => {
    document.getElementById('signup_form').onsubmit = (obj) => {
        obj.preventDefault();

        let signupData = getSignupTextInputs();
        let validSignupInputs = validateSignupTextFields(signupData)
        if (validSignupInputs) {
            sendrequst(signupData)
        }
    }
})

function getSignupTextInputs() {
    let Name = document.getElementById("name1").value
        let Password = document.getElementById("pw").value
        let Email = document.getElementById("email").value
        let Phone = document.getElementById("phone").value
        let Gander;
        if (document.getElementById("male").checked) {
            Gander = document.getElementById("male").value
        } else if (document.getElementById("female").checked) {
            Gander = document.getElementById("female").value
        }
        const data = {
            Name,
            Password,
            Email,
            Phone,
            Gander
        }
        return data
}

function validateSignupTextFields(data) {
    let {Name,Password,Email,Phone,Gander} = data
    console.log(data);
    let warning_message = document.getElementById('warning_message');
    if (Name.length == 0) {
        warning_message.innerHTML ='THE NAME IS REQUIRED'
    } else if(Password.length == 0) {
        warning_message.innerHTML='THE PASSWORD IS REQUIRED'
    } else if (Email.length == 0) {
        warning_message.innerHTML ='THE EMAIL IS REQUIRED'
    } else if (Phone.length == 0) {
        warning_message.innerHTML='THE PHONE IS REQUIRED'
    } else if (Gander.length == 0) {
        warning_message.innerHTML='THE GANDER IS REQUIRED'
    }else{
        return true
    } 
}

async function sendrequst(data) {
    //http://localhost:7000/
    // https://alhendawy-restaurant.herokuapp.com/
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/addNewAcount", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let result = await response.json();
    console.log(result);
    if (result.isExsit == false) {
        document.getElementById('warning_message').innerHTML = " This Account Already Exist" ;
        document.getElementById('warning_message').style.display = "block";
    } else if (result.isExsit == true) {
        window.location.replace('./VerifyAccount.html')
    }else if (response.status === 400) {
        document.getElementById('warning_message').innerHTML = result;
        document.getElementById('warning_message').style.display = "block"; 
    }
}
