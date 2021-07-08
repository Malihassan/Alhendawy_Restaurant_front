window.addEventListener('load' ,()=>{
    document.getElementById("email_form").onsubmit = (obj) =>{
        obj.preventDefault();

        let contactUsData = getcontactUsTextInputs();
        let validcontactUsInputs = validatecontactUsTextFields(contactUsData)
        if (validcontactUsInputs) {
            sendrequst(contactUsData)
        }

    } 
})

function getcontactUsTextInputs() {
    userData = document.querySelectorAll(".mailtext");
    Email = userData[0].value;
    Subject = userData[1].value;
    Message = userData[2].value;
    const data = {
        Email   ,
        Subject ,
        Message 
    }
        return data
}

function validatecontactUsTextFields(contactUsdata) {

    let warning_contactUs =document.getElementById('successMessage')
    let {Email,Subject,Message} = contactUsdata
    if (Email.length == 0) {
        warning_contactUs.textContent = 'THE EMAIL IS REQUIRED'
    } else if (Subject.length == 0) {
        warning_contactUs.textContent = 'THE Subject IS REQUIRED'
    } else if (Message.length == 0) {
        warning_contactUs.textContent = 'THE Messge IS REQUIRED'
    } else {
        return true
    }
}


async function sendrequst(contactData) {
    // http://localhost:7000/
    // https://alhendawy-restaurant.herokuapp.com/
    let response =await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/contactUs",{
        method :"Post" ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(contactData)
    })
    if (response.status == 200) {
        document.getElementById("successMessage").textContent = "Thank You For Contact Us ..."
        var form = document.getElementById("email_form");
        form.reset();        
    }
}