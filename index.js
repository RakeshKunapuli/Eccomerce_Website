document.addEventListener("DOMContentLoaded", function () {
  var mainProductWrapper = document.querySelector(".products-main-wrapper");
  var search = document.getElementById("searchBar");
  var counter = document.querySelector(".counter");
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartIcon = document.getElementById('cartIcon')
  var searchIcon = document.getElementById('searchIcon')
  updateCount();

  async function fetchData() {
    try {
      var response = await fetch("Ecommerce.json");
      const data = await response.json();

      var searchTerm = search.value.trim().toLowerCase();

      if (searchTerm.length > 0) {
        let filter = data.products.filter((item) =>
          item.title.toLowerCase().includes(searchTerm)
        );
        displayfilteredData(filter);
      } else {
        displayProductsData(data.products);
      }
    } catch (error) {
      console.error("404 Unable to fetch Data", error);
    }
  }

  function updateCount() {
    var totalCount = cartItems.length;
    counter.innerText = totalCount;
  }

  function handleSearch() {
    updateCount();
    fetchData();
  }


  fetchData();

  // Add an event listener to the search input for handling changes
  search.addEventListener("input", handleSearch);

  function displayfilteredData(data) {
    mainProductWrapper.innerHTML = " ";
    data.forEach((item, i) => {
      mainProductWrapper.innerHTML += `<div class="products" onclick='itemData(${item.id})'>
  <img
    src="${item.thumbnail}"
    alt="${item.title}"
  />
  <div class="products-details">
      <p><b>Title:</b>${item.title}</p>
    <p><b>Brand:</b>${item.brand}</p>
    <p><b>Cost:<sup>$</sup>${item.price}</b></p>
    <p><b>Rating:</b>${item.rating}</p>
  </div>
</div>`;
    });
  }
  
  function displayProductsData(data) {
    mainProductWrapper.innerHTML = " ";
    data.forEach((item, i) => {
      mainProductWrapper.innerHTML += ` <div class="products" onclick='itemData(${item.id})'>
        <img
          src="${item.thumbnail}"
          alt="${item.title}"
        />
        <div class="products-details">
            <p><b>Title:</b>${item.title}</p>
          <p><b>Brand:</b>${item.brand}</p>
          <p><b>Cost:<sup>$</sup>${item.price}</b></p>
          <p><b>Rating:</b>${item.rating}</p>
        </div>
      </div>`;
    });
  }

  cartIcon.addEventListener('click',function(){
    window.location.href ='./cart.html'
  })

});
function itemData(id) {
  window.location.href=`productspec.html?item=${id}`;
}
