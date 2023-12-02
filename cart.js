

var cartItems = [];

document.addEventListener("DOMContentLoaded", function () {
  var cartCounter = document.querySelector(".counter");
  const cartIcon = document.getElementById("cartIcon");
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  var cartMain = document.querySelector(".cart-item-wrapper");
  var placeOrderDiv = document.querySelector('.placeOrderDiv')

  updateCount();
  cartIcon.addEventListener("click", function () {
    window.location.href = "./cart.html";
  });

  function updateCount() {
    var totalCount = cartItems.length;
    cartCounter.innerText = totalCount;
  }

  cartItems.forEach((cart, i) => {
    var cartDiv = document.createElement("div");
    cartDiv.classList.add(`cartItems`);
    // cartDiv.setAttribute("onclick", `forwordTo(${cart.id})`);
    cartDiv.innerHTML += `<div class="cartImage" >
      <img style="width: 100%;" src="${cart.image}" alt="${cart.title}">
    </div>
    <div class="cartDetails">
      <p><b>Title:</b>${cart.title}</p>
      <p><b>Description:</b>${cart.description}</p>
      <p><b>Price:<sup>$</sup></b>${cart.price}</p>
      <button class='viewItembtn' onclick='forwordTo("${cart.id}")'>View Item</button>
      <button class='removebtn' onclick='removeItem("${cart.id}")'>Remove Item</button>
    </div>`;
    cartMain.appendChild(cartDiv);
  });
  var placeOrder = document.createElement("button");
    placeOrder.classList.add('placeorderbtn');
    placeOrder.innerText='Place Order'

  if(cartItems.length === 0){
    placeOrder.style.display='none'
    cartMain.innerHTML+= '<h1>CART IS EMPTY ADD ITEMS TO PLACE ORDER  </h1>'
}else{
    placeOrder.addEventListener('click',function(){
      // var cartMain = document.querySelector(".cart-item-wrapper");
      var cartDiv = document.querySelectorAll('.cartItems');
      cartDiv.forEach(item => {
        item.style.display='none';
      });
        placeOrderDiv.style.display='block'
        localStorage.setItem("cart", JSON.stringify([]));
        setTimeout(function(){
          window.location.href='./index.html'
        },5000)
        placeOrder.innerText='Order Placed'
    })
    cartMain.appendChild(placeOrder);
}
});





function removeItem(id) {
  var index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCart(); // Render the updated cart
    localStorage.setItem("cart", JSON.stringify(cartItems));
    if(cartItems.length > 0){
        location.assign('./cart.html')
    }else{
        location.assign('./index.html')
    }
  }
}

function renderCart() {
  // Clear the existing content of cartMain
  var cartMain = document.querySelector(".cart-item-wrapper");
  cartMain.innerHTML = "";

  // Render the updated cart items
  cartItems.forEach((cart, i) => {
    var cartDiv = document.createElement("div");
    cartDiv.classList.add(`cartItems`);
    // cartDiv.setAttribute("onclick", `forwordTo(${cart.id})`);
    cartDiv.innerHTML += `<div class="cartImage" >
      <img style="width: 100%;" src="${cart.image}" alt="${cart.title}">
    </div>
    <div class="cartDetails">
      <p><b>Title:</b>${cart.title}</p>
      <p><b>Description:</b>${cart.description}</p>
      <p><b>Price:<sup>$</sup></b>${cart.price}</p>
      <button class='viewItembtn' onclick='forwordTo("${cart.id}")'>View Item</button>
      <button class='removebtn' onclick='removeItem("${cart.id}")'>Remove Item</button>
    </div>`;
    cartMain.appendChild(cartDiv);
   
  });
if(cartItems.length === 0){
    placeOrder.style.display='none'
    cartMain.innerHTML+= '<h1>CART IS EMPTY ADD ITEMS TO PLACE ORDER  </h1>'
}else{
    var placeOrder = document.createElement("button");
    placeOrder.classList.add('placeorderbtn');
    placeOrder.innerText='Place Order'
    placeOrder.addEventListener('click',function(){
      // var cartMain = document.querySelector(".cart-item-wrapper");
      var cartDiv = document.querySelectorAll('.cartItems');
      cartDiv.forEach(item => {
        item.style.display='none';
      });
        placeOrderDiv.style.display='block'
        localStorage.setItem("cart", JSON.stringify([]));
        setTimeout(function(){
          window.location.href='./index.html'
        },5000)
        placeOrder.innerText='Order Placed'
    })
    cartMain.appendChild(placeOrder);
}
}

function forwordTo(id) {
  window.location.href = `productspec.html?item=${id}`;
}


