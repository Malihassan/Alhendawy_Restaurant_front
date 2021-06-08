
function setCoockie(token, cookisName) {
  // document.cookie = `RTU=${result.tokenID};maxAge: 1800`;
  document.cookie = `${cookisName}=${token};max-Age= 1800;`;
}

// returns the cookie with the given name,
// or undefined if not found

 function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}



var cart = JSON.parse(localStorage.getItem('UserCart'));
if (cart == null) {
  cart = [] ;
} 
 function AddOrder(name,price) {
  document.getElementById("OrderCount").innerHTML = "";
  console.log("= = = = >>" + name);
  let AddToCartButton = document.getElementById("SendOrderPage_buy");
  
  AddToCartButton.onclick = () => {
    let CountValue = document.getElementById("OrderCount").value;
    let Order ={
      ProductName :name ,
      Price :price ,
      Count : CountValue
    }
    console.log(Order);
    const index = cart.findIndex((obj) =>{
      return obj.ProductName === Order.ProductName
    })
    var x = pushInCart(Order,index,CountValue)


  }
}
function pushInCart(Order ,index,CountValue) {
  if (index == -1) {
    cart.push(Order) ;
  } else {
    const conf =confirm (`you want to update count of ${name} from ${cart[index].Count} to ${CountValue}`  ) ;
    if (conf == true) {
      cart[index].Count = CountValue
    } 
  }
  localStorage.setItem("UserCart", JSON.stringify(cart))

  let model = document.getElementById("SendOrdermodel");
  model.style.display = "none";
  return cart ;
}



export{setCoockie,getCookie,AddOrder}