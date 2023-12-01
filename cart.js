

var cartItems = [];

document.addEventListener("DOMContentLoaded", function () {
  var cartCounter = document.querySelector(".counter");
  const cartIcon = document.getElementById("cartIcon");
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  var cartMain = document.querySelector(".cart-item-wrapper");

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
    cartDiv.setAttribute("onclick", `forwordTo(${cart.id})`);
    cartDiv.innerHTML += `<div class="cartImage" >
      <img style="width: 100%;" src="${cart.image}" alt="${cart.title}">
    </div>
    <div class="cartDetails">
      <p><b>Title:</b>${cart.title}</p>
      <p><b>Description:</b>${cart.description}</p>
      <p><b>Price:<sup>$</sup></b>${cart.price}</p>
      <button class='removebtn' onclick='removeItem("${cart.id}")'>Remove Item</button>
    </div>`;
    cartMain.appendChild(cartDiv);
  });
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
    cartDiv.setAttribute("onclick", `forwordTo(${cart.id})`);
    cartDiv.innerHTML += `<div class="cartImage" >
      <img style="width: 100%;" src="${cart.image}" alt="${cart.title}">
    </div>
    <div class="cartDetails">
      <p><b>Title:</b>${cart.title}</p>
      <p><b>Description:</b>${cart.description}</p>
      <p><b>Price:<sup>$</sup></b>${cart.price}</p>
      <button class='removebtn' onclick='removeItem("${cart.id}")'>Remove Item</button>
    </div>`;
    cartMain.appendChild(cartDiv);
  });
}

function forwordTo(id) {
  window.location.href = `productspec.html?item=${id}`;
}
