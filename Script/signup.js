
window.addEventListener('load', () => {
     // Access the form element...
//   const form = document.getElementById( "myForm" );
    // form.addEventListener( "submit", function ( event ) {
    document.getElementById('signup_form').onsubmit = async (obj) => {
        obj.preventDefault();

        let name = document.getElementById("name1").value
        let password = document.getElementById("pw").value
        let email = document.getElementById("email").value
        let phone = document.getElementById("phone").value
        let gander;
        if (document.getElementById("male").checked) {
            gander = document.getElementById("male").value
        } else if (document.getElementById("female").checked) {
            gander = document.getElementById("female").value
        }

        data = {
            Name: name,
            Password: password,
            Email: email,
            Phone: phone,
            Gander: gander
        }

        let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/addNewAcount", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: formData.values()
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
})
