window.addEventListener('load', () => {
    document.getElementById("booktable").addEventListener('click', showReservationForm)
    document.getElementById("book_form").onsubmit = sendReservation
    document.getElementById("closeReservedPage").addEventListener('click', ClosePage)

})

async function sendReservation(obj) {
    obj.preventDefault();

    let ReservedData = getReservedTextInputs();
    let validReservedpInputs = validateReservedTextFields(ReservedData)
    if (validReservedpInputs) {

        //convert time grom 24 to  12 AM /PM 
        let Time = onTimeChange(document.getElementById("time"))
        ReservedData["Time"] = Time

        sendReservationrequst(ReservedData)
    }
}

function getReservedTextInputs() {
    let Name = document.getElementById("name").value
    let Email = document.getElementById("bookemail").value
    let Phone = document.getElementById("phone-number").value
    let NumberOfPeople = document.getElementById("numPeople").value
    let Date = document.getElementById("date").value
    let Time = document.getElementById("time").value
    let SpecialRequest = document.getElementById("special-request").value


    let reservationData = {
        Name,
        Email,
        Date,
        Time,
        Phone,
        NumberOfPeople,
        SpecialRequest
    }
    return reservationData
}

function validateReservedTextFields(data) {
    let {Name,Email,Date,Time,Phone,NumberOfPeople,SpecialRequest} = data
    console.log(data);
    let warning_message = document.getElementById("successMessage") 
    if (Name.length == 0) {
        warning_message.innerHTML ='THE NAME IS REQUIRED'
    } else if(Email.length == 0) {
        warning_message.innerHTML='THE EMAIL IS REQUIRED'
    } else if (Date.length == 0) {
        warning_message.innerHTML ='THE DATE IS REQUIRED'
    } else if (Time.length == 0) {
        warning_message.innerHTML='THE TIME IS REQUIRED'
    } else if (Phone.length == 0) {
        warning_message.innerHTML='THE PHONE IS REQUIRED'
    }else if (NumberOfPeople.length == 0) {
        warning_message.innerHTML='THE NUMBER OF PEOPLE IS REQUIRED'
    }else if (SpecialRequest.length == 0) {
        warning_message.innerHTML='THE SPECIAL REQUEST IS REQUIRED'
    }else{
        return true
    } 
}

async function sendReservationrequst(reservationData) {
    console.log(reservationData);
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/bookTable", {
        method: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(reservationData)
    })

    if (response.status == 200) {
        var form = document.getElementById("book_form");
        form.reset();
        document.getElementById("successMessage").innerText = "Thank You For Contact With Us.... We Will Contact With You as soon as Possible Time"
        
    } else if (response.status == 400) {
        let result = await response.json();
        document.getElementById("successMessage").innerText = result
    }
}

function onTimeChange(inputEle) {
    var timeSplit = inputEle.value.split(':'),
        hours,
        minutes,
        meridian;
        console.log(timeSplit);
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
    } else if (hours < 12) {
        meridian = 'AM';
        if (hours == 0) {
            hours = 12;
        }
    } else {
        meridian = 'PM';
    }
    const time = `${hours}:${minutes} ${meridian}`
    return time;
}
function showReservationForm() {
    let model = document.getElementById("bookTableModel");
    model.style.display = "block";

}
function ClosePage() {
    let model = document.getElementById("bookTableModel");
    model.style.display = "none";
}