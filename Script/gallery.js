import { AddOrder, getCookie } from './GlobalFunc.js'
const tokenID = getCookie("RTU");
var products = getProduct(tokenID);
window.addEventListener("load", async function () {
    products = await products
    // called method to create product templets
    addItem(products);

    // add event Listener to all button GETORDER
    ActionGetOrderButton(products);

    // to close page Add to cart from          X
    ClosePage();

    // to show map to choise location to deliver order
    // var LocButton = document.getElementById("SendOrderPageChoiseLoc");
    // GetUserLocation(LocButton);

});

async function getProduct(token) {
    let response = await fetch("https://alhendawy-restaurant.herokuapp.com/ElhendawyRestaurant/menu", {
        method: "GET",
        headers: {
            'token': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    if (response.status == 401) {
        window.location.replace('./login.html')

    } else {
        const products = await response.json();
        return products;
    }

}

function addItem(products) {
    for (var x = 0; x < products.length; x++) {
        /*console.log("Decribe = " + Order[x].Describe + " Image = " + Order[x].Image);*/
        var GalleryDesign = document.createElement("div");
        GalleryDesign.classList.add('Gallery_Design', 'row', 'col-xl-2', 'col-lg-2', 'col-md-3', 'col-sm-4', 'col-8');
        //  GalleryDesign.style.backgroundImage = "url(Images/" + Order[x].Image + ")";
        // GalleryDesign.src = "Images/" + Order[x].Image

        GalleryDesign.style.backgroundImage = "url(data:image/png;base64," + products[x].Image + ")";

        var GalleryButton = document.createElement("div");
        GalleryButton.classList.add("Gallery_Button");
        var Add_Button = document.createElement("button");
        Add_Button.classList.add("viewbutton");
        Add_Button.textContent = "GET ORDER";
        Add_Button.setAttribute("value", "button" + (x));

        var OrderDescribe = document.createElement("span");
        OrderDescribe.classList.add("Gallery_Describe");
        OrderDescribe.textContent = products[x].Describe;


        GalleryButton.appendChild(Add_Button);
        GalleryDesign.appendChild(GalleryButton);
        GalleryDesign.appendChild(OrderDescribe);

        var AllView = document.getElementById("ViewAll");
        AllView.appendChild(GalleryDesign);
    }
    /*console.log(AllView);*/
}

function ActionGetOrderButton(products) {
    var OrderButtonsArray = document.getElementsByClassName("viewbutton");
    for (let x = 0; x < OrderButtonsArray.length; x++) {
        OrderButtonsArray[x].addEventListener("click", function (obj) {
            // this to show popup windwo
            let model = document.getElementById("SendOrdermodel");
            model.style.display = "block";
            let buttonId = obj.target.value.charAt(obj.target.value.length - 1);

            //  console.log(" Image" + products[buttonId].Image);
            //  console.log(" Price" + products[buttonId].Price);
            //  console.log(" Desc" + products[buttonId].Describe);
            var Name = products[buttonId].ProductName
            var img = products[buttonId].Image;
            var pric = products[buttonId].Price;
            var Desc = products[buttonId].Describe;
            var productName = products[buttonId].ProductName;



            // document.getElementById("OrderImage").style.backgroundImage = "";
            // document.getElementById("OrderPrice").innerText = "";
            // document.getElementById("OrderDesc").innerText = "";
            // document.getElementById("OrderCount").innerText = "";
            document.getElementById("OrderName").innerText = Name
            document.getElementById("OrderImage").style.backgroundImage = "url(data:image/png;base64," + img + ")";
            document.getElementById("OrderPrice").innerText = pric + "$";
            document.getElementById("OrderDesc").innerText = Desc;
            document.getElementById("OrderCount").textContent = "1"

            counter(Number(pric))

            // to add order to cart
            AddOrder(productName, pric)

        });
    }
}

function counter(price) {
    let CountValue = document.getElementById("OrderCount").textContent;
    document.getElementById("increment").onclick = () => {
        if (CountValue > 0 && CountValue < 9) {
            CountValue++
        } else if (CountValue == 9) {
            CountValue = 1
            document.getElementById("OrderCount").textContent = "1"
        }
        calcPrice(CountValue, price)
    }
    document.getElementById("decrement").onclick = () => {
        if (CountValue > 1 && CountValue <= 9) {
            CountValue--
        } else if (CountValue == 1) {
            CountValue = 9
            document.getElementById("OrderCount").textContent = "9"
        }
        calcPrice(CountValue, price)
    }
}
function calcPrice(CountValue, Price) {
    document.getElementById("OrderCount").innerText = CountValue
    var res = Number(CountValue) * Price
    document.getElementById("OrderPrice").innerText = res + "$";
}

function ClosePage() {
    //     console.log("clobutto" + clobutto);
    var clobutto = document.getElementById("close");
    clobutto.addEventListener("click", function (obj) {
        let model = document.getElementById("SendOrdermodel");
        model.style.display = "none";
    });
}
