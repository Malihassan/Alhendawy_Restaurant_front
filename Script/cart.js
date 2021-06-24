import { getCookie } from './GlobalFunc.js'
//itemquantity=0;
Location = "";
var User = localStorage.getItem('UserCart')
const tokenID =getCookie("RTU")
let check = checkAuth(tokenID) 

window.addEventListener('load', function () {
    //LOGOUT in Nav par
    var logout = document.getElementById("logout");
    logout.onclick = ()=>{
        document.cookie = 'RTU=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    var val = JSON.parse(localStorage.getItem('UserCart'));
    if (val != null) {
        retrivedatafromdatastorage();
        updateCartTotal();
    }
    document.getElementById("userLocation").onclick = () => {
        GetUserLocation()
    }

})

async function checkAuth(token) {
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/checkAuth", {
        method: "GET",
        headers: {
            'token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    if (response.status == 401) {
        window.location.replace('./login.html')
    }
    
}

async function purchaseClicked() {

    // alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

    var cart = JSON.parse(localStorage.getItem('UserCart'))
    if (cart === null || cart.length === 0) {
        alert("YOU NOT HAVE ANYTHING IN YOUR CART")
    } else {

        var loc = JSON.parse(localStorage.getItem("ULoc"))
        loc ? loc : loc = { Coordinates: [] }
        let Order = {
            Location: loc,
            Cart: cart
        }
        const tokenID = getCookie("RTU")
        const response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/sendOrder", {
            method: "POST",
            headers: {
                'token': tokenID,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        });
        let result = await response.json();
        console.log(result);
        
        if (response.status == 401) {

            location.replace('./login.html')
        } else if (response.status == 400) {

            let message = document.getElementById("mes1")
            message.innerHTML = result;   

        } else if (response.status == 200) {
            console.log("Created Success");
            localStorage.removeItem("UserCart");
            localStorage.removeItem("ULoc");
            
            let message1 = document.getElementById("mes1");
            message1.innerHTML ="We Will Calling You At 3 Minutes"
            let message2 = document.getElementById("mes2");
            message2.innerHTML ="Thank You ..."
        }
    }
}


function removeCartItem(event) {
    var buttonClicked = event.target
    var title = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText
    buttonClicked.parentElement.parentElement.remove()
    console.log(title);
    removefromstorage(title);
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if ((input.value < 10) && (input.value > 0)) {
        console.log(input.value);
        var shopItem = input.parentElement.parentElement

        var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('cart-price')[0].innerText

        saveiteminstorage(title, price, input.value);
        updateCartTotal()
    } else if (input.value == 10) {
        input.value = 9
    } else if (input.value == 0) {
        input.value = 1
    }
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    //itemquantity=1;
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart if you want to increase the quantity use the number input below')
            return
        }

    }
    var cartRowContents = `
        <div class="cart-item cart-column">
           
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    saveiteminstorage(title, price, 1)
}

function retrivedatafromdatastorage() {

    var val = JSON.parse(User)
    var cartItems = document.getElementsByClassName('cart-items')[0]
    for (let index = 0; index < val.length; index++) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var title = val[index].ProductName
        var price = val[index].Price
        var quant = val[index].Count

        var cartRowContents = `
        <div class="cart-item cart-column">
            
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quant}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    }

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var quantity;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]

        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))

        // console.log(priceElement);
        // console.log(quantityElement);
        // console.log(price);

        quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    //alert(quantity)
    // localStorage.setItem("mahmoud", title+" "+price+" "+imageSrc+" "+ quantity)

}

function saveiteminstorage(title, price1, quantity) {
    if (User == null) {
        localStorage.setItem("UserCart", '[]');
        alert('YOU  NOT HAVE A CART ')
    }
    if (User != null) {
        //alert('not null')
        var cart = JSON.parse(User)
        const index = cart.findIndex((obj) => {
            return obj.ProductName === title
        })
        if (index !== -1) {
            cart[index].Count = quantity
            localStorage.setItem("UserCart", JSON.stringify(cart))
        }
    }
}

function removefromstorage(title) {
    var cart = JSON.parse(localStorage.getItem('UserCart'));
    const removeIndex = cart.findIndex((obj) => {
        return obj.ProductName === title
    })
    cart.splice(removeIndex, 1);
    localStorage.setItem("UserCart", JSON.stringify(cart));
}

async function GetUserLocation() {
    let model = document.getElementById("mapPage");
    model.style.display = "block";



    //1- check availability of geolocation inside user browser (navigator)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getposition, errorhandeler)
    } else {
        alert("YOUR BROWSER NOT SUPPORT GEOLOCATION")
    }

    /*this DONE button */
    var CancelMap = document.getElementById("CancelMapPage");
    CancelMap.addEventListener("click", function () {
        model.style.display = "none";
        // console.log(Location);
        localStorage.setItem('ULoc', JSON.stringify(Location))

    });

}

function getposition(position) {
    // latitude , longitude , timestamp
    //console.log(arguments[0]);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    initMap(lat, lng);

}

function errorhandeler(error) {
    alert("error");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            mymap.innerText = "you refused Request !... ";
            break;
        case error.POSITION_UNAVAILABLE:
            mymap.innerText = "POSITION_UNAVAILABLE";
            break;
        case error.TIMEOUT:
            mymap.innerText = "TIMEOUT";
            break;
        case error.UNKOWN_ERROR:
            mymap.innerText = "UNKOWN_ERROR";
            break;
        default:
    }
}

function initMap(la, ln) {
    const myLatLng = {
        lat: la,
        lng: ln
    };
    console.log(myLatLng);
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: myLatLng,
    });
    var marker;

    google.maps.event.addListener(map, 'click', function (event) {
        if (marker) {
            marker.setPosition(event.latLng);
        } else {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });
        }
        let UserLocation = event.latLng.toJSON()
        console.log(UserLocation.lat);
        Location = {
            Coordinates: [UserLocation.lat, UserLocation.lng]
        }
        // console.log(Location);
    });
}

