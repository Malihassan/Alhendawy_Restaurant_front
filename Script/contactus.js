window.addEventListener('load' ,()=>{
    document.getElementById("email_form").onsubmit = sendMail 
})


async function sendMail(obj) {
    obj.preventDefault();
    userData = document.querySelectorAll(".mailtext");
    useremail = userData[0].value;
    usersubject = userData[1].value;
    usermessage = userData[2].value;

    const contactData = {
        Email   :useremail,
        Subject :usersubject,
        Message :usermessage 
    }

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
