const offers = [
    {
        Name: "Vegetarian Meal",
        Describe: "order two dishes and get one for free .",
        Price: 30,
        Image: "GRT-meal-prep-chicken-bean-732x549-thumb.jpg"
    }, {
        Name: "Noodles Dish",
        Describe: "order three dishes and get one for free.",
        Price: 40,
        Image: "i4.jpeg"
    }, {
        Name: "Sandwich Chicken",
        Describe: "order two Sandwich pay only.",
        Price: 50,
        Image: "i3.jpg"
    }, {
        Name: "Potato Dish",
        Describe: "order two dishes and get one for free.",
        Price: 60,
        Image: "i2.png"
    }
]
window.addEventListener('load', () => {
    addOffer();
    document.getElementById("booktable").addEventListener('click', showReservationForm)
    document.getElementById("book_form").onsubmit = sendReservation
    ClosePage()
})

function addOffer() {
    for (let index = 0; index < offers.length; index++) {
        var offerCart = document.createElement('div')
        offerCart.classList.add('cart', 'col-xl-3', 'col-lg-3', 'col-md-5')

        var offerImage = document.createElement('img')
        offerImage.classList.add('col')
        offerImage.src = 'Images/' + offers[index].Image

        var offerName = document.createElement('h5')
        offerName.classList.add('Offer_Name', 'col')
        offerName.textContent = offers[index].Name

        var offerPric = document.createElement('h6')
        offerPric.classList.add('Offer_Price', 'col')
        offerPric.textContent = offers[index].Price +" $"

        var offerDes = document.createElement('p')
        offerDes.classList.add('Offery_Describe', 'col')
        offerDes.textContent = offers[index].Describe

        offerCart.appendChild(offerImage)
        offerCart.appendChild(offerName)
        offerCart.appendChild(offerPric)
        offerCart.appendChild(offerDes)

        var parentdiv = document.getElementById('offercarts')
        parentdiv.appendChild(offerCart);

    }
}

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
    // console.log(data);
    let response =await fetch("http://localhost:7000/ElhendawyRestaurant/bookTable",{
        method :"Post" ,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(reservationData)
    })
    
    if (response.status == 200) {
        document.getElementById("successMessage").innerText = "Thank You ..."
        var form = document.getElementById("book_form");
        form.reset();        
    }else if (response.status == 400) {
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
    //     console.log("clobutto" + clobutto);
    var clobutto = document.getElementById("closeReservedPage");
    clobutto.addEventListener("click", function (obj) {
        let model = document.getElementById("bookTableModel");
        model.style.display = "none";
    });
}