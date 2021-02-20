 window.addEventListener("load", function () {

     Order = [{
         Name: "Steak",
         Describe: "Steak Beefy's by Sir Ian Botham",
         Salary: 30,
         Image: "calamari_appetizer_delicious.jpg"
            }, {
         Name: "Noodles",
         Describe: "Veg Hakka Noodles",
         Salary: 10,
         Image: "food-gallery-steak.jpg"
            }, {
         Name: "Sandwich",
         Describe: "Corn Paneer Sandwich",
         Salary: 40,
         Image: "IMGP3166.jpg"
            }, {
         Name: "Pasta",
         Describe: "Red Sauce Pasta",
         Salary: 80,
         Image: "unnamed3.jpg"
            }, {
         Name: "Pasta",
         Describe: "White Sauce Pasta",
         Salary: 90,
         Image: "unnamed1.jpg"
            }, {
         Name: "Steak",
         Describe: "Bun and Grain Shack",
         Salary: 100,
         Image: "unnamed2.jpg"
            }, {
         Name: "Steak",
         Describe: "Steak Beefy's ",
         Salary: 130,
         Image: "b4.jpg"
            }, {
         Name: "Steak",
         Describe: "Red Sauce Pasta",
         Salary: 300,
         Image: "images5.jpeg"
            }, {
         Name: "Steak",
         Describe: "Red Sauce Pasta",
         Salary: 340,
         Image: "unnamed2.jpg"
            }];
     
     // called method to create product templets
     addItem();
     // add event Listener to all button GETORDER
     var getOrderButtons = document.getElementsByClassName("viewbutton");
     ActionGetOrderButton(getOrderButtons);
     // to close page from          X
     var closebutton = document.getElementById("close");
     ClosePage(closebutton);
     // to show map to choise location to deliver order
     var LocButton = document.getElementById("SendOrderPageChoiseLoc");
     /*GetUserLocation(LocButton);*/
     // to Buy order Button
     var buyButton = document.getElementById("SendOrderPage_buy");
     /*BuyOrder_SendMail(buyButton);*/
 });
 function addItem() {
     for (var x = 0; x < Order.length; x++) {
         console.log("Decribe = " + Order[x].Describe + " Image = " + Order[x].Image);
         var GalleryDesign = document.createElement("div");
         GalleryDesign.classList.add("Gallery_Design");
         GalleryDesign.style.backgroundImage = "url(Images/" + Order[x].Image + ")";

         var GalleryButton = document.createElement("div");
         GalleryButton.classList.add("Gallery_Button");
         var Add_Button = document.createElement("button");
         Add_Button.classList.add("viewbutton");
         Add_Button.textContent = "GET ORDER";
         Add_Button.setAttribute("value", "button" + (x));

         var OrderDescribe = document.createElement("span");
         OrderDescribe.classList.add("Gallery_Describe");
         OrderDescribe.textContent = Order[x].Describe;


         GalleryButton.appendChild(Add_Button);
         GalleryDesign.appendChild(GalleryButton);
         GalleryDesign.appendChild(OrderDescribe);

         var AllView = document.getElementById("ViewAll");
         AllView.appendChild(GalleryDesign);
     }
     /*console.log(AllView);*/
 }
function ActionGetOrderButton(OrderButtonsArray) {
     for (var x = 0; x < OrderButtonsArray.length; x++) {
         OrderButtonsArray[x].addEventListener("click", function (obj) {
             console.log(obj.target.value);
             // this to show popup windwo
             model = document.getElementById("SendOrdermodel");
             model.style.display = "block";
             var buttonId = obj.target.value.charAt(obj.target.value.length - 1);
             console.log("ID " + buttonId);
             console.log(" Image" + Order[buttonId].Image);
             console.log(" Salary" + Order[buttonId].Salary);
             console.log(" Desc" + Order[buttonId].Describe);
             
             var img = Order[buttonId].Image;
             var sala = Order[buttonId].Salary;
             var Desc = Order[buttonId].Describe;

             document.getElementById("OrderImage").style.backgroundImage = "";
             document.getElementById("Ordersalary").innerText = "";
             document.getElementById("OrderDesc").innerText = "";

             document.getElementById("OrderImage").style.backgroundImage = "url(Images/"+img+")";
             document.getElementById("Ordersalary").innerText = "Salary " + sala + "$";
             document.getElementById("OrderDesc").innerText = "Description " + Desc;

         });
     }
 }
 function ClosePage(clobutto) {
     console.log("clobutto" + clobutto);
     clobutto.addEventListener("click", function (obj) {
         model.style.display = "none";
     });
 }
