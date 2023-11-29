document.addEventListener("DOMContentLoaded", function () {
  var mainProductWrapper = document.querySelector(".products-main-wrapper");
  var search = document.getElementById("searchBar");
  var counter = document.querySelector('.counter')


  async function fetchData(filteredTerm = "") {
    try {
      var response = await fetch("Ecommerce.json");
      const data = await response.json();
      // console.log(data.products);
      let searchTerm = search.value.toLowerCase();
      if (searchTerm.trim().length > 0) {
        fetchData(searchTerm);
      } else {
        fetchData();
      }
      if (filteredTerm) {
        let filtered = data.products.filter((card) =>
          card.title.toLowerCase().includes(filteredTerm)
        );
        displayfilteredData(filtered);
      } else {
        displayProductsData(data.products);
      }
    } catch (error) {
      console.error("404 Unable to fetch Data", error);
    }
  }
  fetchData();

  var cartItems = JSON.parse(localStorage.getItem('cart')) || []
updateCount()
function updateCount(){
  var totalCount = cartItems.length
  counter.innerText = totalCount
 }

  function displayfilteredData(data) {
    mainProductWrapper.innerHTML = " "
    data.map((item, i) => {
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

  function displayProductsData(data) {
    mainProductWrapper.innerHTML = " "
    data.map((item, i) => {
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
});

function itemData(id) {
  window.open(`productspec.html?item=${id}`, "_blank");
}
