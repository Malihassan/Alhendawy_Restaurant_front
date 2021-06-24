

window.addEventListener('load', () => {
    document.getElementById("booktable").addEventListener('click', showReservationForm)
    document.getElementById("book_form").onsubmit = sendReservation
    document.getElementById("closeReservedPage").addEventListener('click', ClosePage)

})

async function sendReservation(obj) {
    obj.preventDefault();

    let name = document.getElementById("name").value
    let email = document.getElementById("bookemail").value
    let phonenNumber = document.getElementById("phone-number").value
    let numPeople = document.getElementById("numPeople").value
    let date = document.getElementById("date").value
    let time = document.getElementById("time")
    let specialRequest = document.getElementById("special-request").value

    //convert time grom 24 to  12 AM /PM
    time = onTimeChange(time)

    let reservationData = {
        Name: name,
        Email: email,
        Date: date,
        Time: time,
        Phone: phonenNumber,
        NumberOfPeople: numPeople,
        SpecialRequest: specialRequest
    }
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